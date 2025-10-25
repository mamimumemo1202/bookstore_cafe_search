class Api::V1::AutocompleteController < Api::V1::BaseController
    def create
        input = params.require(:input)

        client = GooglePlacesAutocompleteClient.new
        predictions = client.autocomplete(input)

        render json: predictions
    end
end
