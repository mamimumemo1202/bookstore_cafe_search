class Api::V1::AutocompleteController < ApplicationController
    def create
        input = params[:input]

        return render json: { error: "input is required" }, status: :bad_request if input.blank?

        client = GooglePlacesAutocompleteClient.new
        predictions = client.autocomplete(input)

        return render json: predictions
    end
        
end
