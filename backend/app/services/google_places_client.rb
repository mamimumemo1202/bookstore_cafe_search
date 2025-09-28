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
            fields: ['name', 'geometry', 'photo', 'business_status', 'website', 'rating', 'reviews', "formatted_address"],
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
        place_id: place["place_id"],
        name: place["name"],
        lat: place.dig("geometry", "location", "lat"),
        lng: place.dig("geometry", "location", "lng"),
        vicinity: place["vicinity"], # これは詳細の住所ではない
        photo_ref: place.dig("photos", 0, "photo_reference")
      }
    end
  end

  def format_place(place_id, place)
    {
      place_id: place_id,
      name: place["name"],
      lat: place.dig("geometry", "location", "lat"),
      lng: place.dig("geometry", "location", "lng"),
      # TODO: テスト用に一枚目を取得
      photo_ref: place.dig("photos", 0, "photo_reference"),
      business_status: place["business_status"],
      website:place["website"],
      rating:place["rating"],
      reviews:place.dig("reviews", 0,),
      formatted_address:place["formatted_address"]
    }
  end
end
