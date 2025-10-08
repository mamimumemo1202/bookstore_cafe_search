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

  
end
