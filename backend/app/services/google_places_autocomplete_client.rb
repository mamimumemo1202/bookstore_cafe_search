require "httparty"

class GooglePlacesAutocompleteClient
  include HTTParty
  base_uri "https://maps.googleapis.com/maps/api/place"
  default_timeout 5

  def initialize(api_key = ENV["GOOGLE_API_KEY"])
    @api_key = api_key
  end

  def autocomplete(input, language: "ja")
    json = get_json!("/autocomplete/json",
      input: input,
      language: language
    )
    ensure_google_ok!(json)
    Array(json["predictions"]).map { |p|
      { description: p["description"], place_id: p["place_id"] }
    }
  end

  private

  def get_json!(path, **params)
    resp = self.class.get(path, query: params.merge(key: @api_key))

    json = resp.parsed_response rescue {}

    case resp.code.to_i
    when 200..299 then json
    when 400      then raise ExternalAPI::BadRequest,   json["error_message"]
    when 401, 403  then raise ExternalAPI::AuthError,    json["error_message"]
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
    when "OK", "ZERO_RESULTS" then nil
    when "OVER_QUERY_LIMIT"    then raise ExternalAPI::RateLimited, json["error_message"]
    when "REQUEST_DENIED"      then raise ExternalAPI::AuthError,   json["error_message"]
    when "INVALID_REQUEST"     then raise ExternalAPI::BadRequest,  json["error_message"]
    when "NOT_FOUND"           then raise ExternalAPI::NotFound,    json["error_message"]
    else                              raise ExternalAPI::UpstreamError, (json["status"] || "unknown status")
    end
  end
end
