require "httparty"

class GooglePlacesClient
  include HTTParty
  base_uri "https://maps.googleapis.com/maps/api/place"
  default_timeout 5

  TYPE_MAP = {
    "Bookstore" => "book_store",
    "Cafe"      => "cafe",
    "Pair"      => "cafe"
  }

  def initialize(api_key = ENV["GOOGLE_API_KEY"])
    @api_key = api_key
  end

  def search_nearby(lat:, lng:, type:, radius: 1000)
    gtype = TYPE_MAP[type]
    json = get_json!("/nearbysearch/json",
      location: "#{lat},#{lng}",
      radius: radius,
      type: gtype,
      language: "ja"
    )
    ensure_google_ok!(json)
    json
  end

  def fetch_place_geometry(place_id)
    json = get_json!("/details/json",
      place_id: place_id,
      fields: "geometry/location",
      language: "ja"
    )
    ensure_google_ok!(json)
    json["result"]
  end

  def fetch_place_details(place_id)
    json = get_json!("/details/json",
      place_id: place_id,
      fields: %w[name geometry photos business_status website rating reviews formatted_address address_components opening_hours].join(","),
      language: "ja"
    )
    ensure_google_ok!(json)
    res = json["result"] || {}
    if res.is_a?(Hash) && res.key?("photos")
      res["photos"] = Array(res["photos"]).first(3)
    end
    res
  end

  def fetch_place_details_bulk(place_ids)
    return [] if place_ids.empty?
    fields = %w[place_id name formatted_address geometry/location photos].join(",")
    place_ids.filter_map do |pid|
      begin
        json = get_json!("/details/json",
          place_id: pid,
          fields: fields,
          language: "ja"
        )
        ensure_google_ok!(json)
        r = json["result"] || {}
        {
          place_id:  r["place_id"] || pid,
          name:      r["name"],
          address:   r["formatted_address"] || r["vicinity"],
          lat:       r.dig("geometry", "location", "lat"),
          lng:       r.dig("geometry", "location", "lng"),
          photo_ref: r.dig("photos", 0, "photo_reference")
        }
      rescue ExternalAPI::Error => e
        Rails.logger.warn("[PlacesBulk] skip pid=#{pid} #{e.class}: #{e.message}")
        next nil
      end
    end
  end

  private

  def get_json!(path, **params)
    resp = self.class.get(path, query: params.merge(key: @api_key))

    json = resp.parsed_response rescue {}

    case resp.code.to_i
    when 200..299 then json
    when 400      then raise ExternalAPI::BadRequest,   json["error_message"]
    when 401,403  then raise ExternalAPI::AuthError,    json["error_message"]
    when 404      then raise ExternalAPI::NotFound,     json["error_message"]
    when 429      then raise ExternalAPI::RateLimited,  json["error_message"]
    when 500..599 then raise ExternalAPI::ServerError, "HTTP #{resp.code}"
    else               raise ExternalAPI::UpstreamError, "HTTP #{resp.code}"
    end
  rescue Net::OpenTimeout, Net::ReadTimeout
    raise ExternalAPI::Timeout
  rescue SocketError, Errno::ECONNREFUSED
    raise ExternalAPI::ServerError, "connection failed"
  rescue HTTParty::Error => e
    raise ExternalAPI::UpstreamError, e.message
  rescue => e
    raise ExternalAPI::UpstreamError, e.message
  end

  def ensure_google_ok!(json)
    case json["status"]
    when "OK", "ZERO_RESULTS" then return
    when "OVER_QUERY_LIMIT"    then raise ExternalAPI::RateLimited, json["error_message"]
    when "REQUEST_DENIED"      then raise ExternalAPI::AuthError,   json["error_message"]
    when "INVALID_REQUEST"     then raise ExternalAPI::BadRequest,  json["error_message"]
    when "NOT_FOUND"           then raise ExternalAPI::NotFound,    json["error_message"]
    else                           raise ExternalAPI::UpstreamError, (json["status"] || "unknown status")
    end
  end
end
