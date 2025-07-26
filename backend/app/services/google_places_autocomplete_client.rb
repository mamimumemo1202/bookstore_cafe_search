require 'httparty'

class GooglePlacesAutocompleteClient
  include HTTParty
  base_uri 'https://maps.googleapis.com/maps/api/place'

#   可用性を高めるためAPIキーをinitializeメソッドに組み込む
  def initialize(api_key = ENV['GOOGLE_API_KEY'])
    @api_key = api_key
  end

  def autocomplete(input, language: 'ja')
    options ={
        query:{
            input: input,
            key: @api_key,
            language: language,
        }
    }

    response = self.class.get('/autocomplete/json', options)

     unless response.success?
      Rails.logger.error("Autocomplete API error: #{response.code} #{response.body}")
      raise "Autocomplete API request failed"
    end


    response.parsed_response["predictions"].map do |prediction|
        {
            description: prediction["description"],
            place_id: prediction["place_id"]  
        }
    end
  end
end
