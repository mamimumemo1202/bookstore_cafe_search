require 'httparty'

class GooglePlacesClient
  include HTTParty
  base_uri 'https://maps.googleapis.com/maps/api/place'

#   可用性を高めるためAPIキーをinitializeメソッドに組み込む
  def initialize(api_key = ENV['GOOGLE_API_KEY'])
    @api_key = api_key
  end

  def search_nearby(lat:, lng:, type:, radius: 1000)
    options = {
      query: {
        location: "#{lat},#{lng}",
        radius: radius,
        type: type,
        key: @api_key,
        language: 'ja'
      }
    }
# self = インスタンス自身 .class = そのクラス（=GooglePlacesClient） クラスが持っているGETメソッドを使うために明記
    response = self.class.get('/nearbysearch/json', options)

    unless response.success?
        Rails.logger.error("Google Places API error: #{response.code} #{response.body}")
        raise "Google Places API request failed"
    end

    format_places(response.parsed_response["results"])
  end


  def fetch_place_details(place_id)
    options = {
        query: {
            place_id: place_id,
            key: @api_key,
            fields: 'name,geometry',
            language: 'ja'
        }
    }
    response = self.class.get('/details/json', options)
    
    unless response.success?
        Rails.logger.error("Google Places API error: #{response.code} #{response.body}")
        raise "Google Places API request failed"
    end 

   format_place(place_id, response.parsed_response["result"])
        
  end

  private

  def format_places(places)
    places.map do |place| 
      {
        id: place["place_id"],
        name: place["name"],
        lat: place.dig("geometry", "location", "lat"),
        lng: place.dig("geometry", "location", "lng"),
        vicinity: place["vicinity"] # これは詳細の住所ではない
      }
    end
  end

  def format_place(place_id, place)
    {
      id: place_id,
      name: place["name"],
      lat: place.dig("geometry", "location", "lat"),
      lng: place.dig("geometry", "location", "lng")
    }
  end
end
