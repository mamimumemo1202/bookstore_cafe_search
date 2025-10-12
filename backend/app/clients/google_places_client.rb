require 'httparty'

class GooglePlacesClient
  include HTTParty
  base_uri 'https://maps.googleapis.com/maps/api/place'

  TYPE_MAP = {
    "Bookstore" => "book_store",
    "Cafe" => "cafe"
  }
#   可用性を高めるためAPIキーをinitializeメソッドに組み込む
  def initialize(api_key = ENV['GOOGLE_API_KEY'])
    @api_key = api_key
  end

  def search_nearby(lat:, lng:, type:, radius: 1000)
    gtype = TYPE_MAP[type]

    options = {
      query: {
        location: "#{lat},#{lng}",
        radius: radius,
        type: gtype,
        key: @api_key,
        language: 'ja'
      }
    }

    response = self.class.get('/nearbysearch/json', options)

    unless response.success?
        Rails.logger.error("Google Places API error: #{response.code} #{response.body}")
        raise "Google Places API request failed"
    end

    response.parsed_response
    
  end

# カードをクリックしたときのリッチ情報を返す。カードクリック時に発火。
  def fetch_place_details(place_id)
    options = {
        query: {
            place_id: place_id,
            key: @api_key,
            fields: ['name', 'geometry', 'photo', 'business_status', 'website', 'rating', 'reviews', "formatted_address", "address_components", "opening_hours"],
            language: 'ja'
          }
    }
    response = self.class.get('/details/json', options)
    
    unless response.success?
        Rails.logger.error("Google Places API error: #{response.code} #{response.body}")
        raise "Google Places API request failed"
    end 
    
    res = response.parsed_response["result"]
  end

  # カードのサムネに名前と住所を表示する情報を返す
      def fetch_place_details_bulk(place_ids)
        
      return [] if place_ids.empty?

      fields = %w[place_id name formatted_address geometry/location photos].join(',')

      place_ids.filter_map do |pid|
        resp = self.class.get('/details/json', {
          query: {
            place_id: pid,
            key:      @api_key,
            fields:   fields,   # ← 文字列で渡す
            language: 'ja'
          }
        })

        unless resp.success?
          Rails.logger.warn("[PlacesBulk] skip pid=#{pid} code=#{resp.code}")
          next nil
        end

        r = resp.parsed_response["result"] || {}
        {
          place_id:  r["place_id"] || pid,
          name:      r["name"],
          address:   r["formatted_address"] || r["vicinity"],
          lat:       r.dig("geometry", "location", "lat"),
          lng:       r.dig("geometry", "location", "lng"),
          photo_ref: r.dig("photos", 0, "photo_reference")
        }
      end
    end
end
