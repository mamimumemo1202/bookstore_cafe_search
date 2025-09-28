class Api::V1::PhotosController < ApplicationController
    GOOGLE_PHOTO_ENDPOINT = 'https://maps.googleapis.com/maps/api/place/photo'

    def show
        photo_ref = params[:photo_ref]
        return render json: { error: 'photo_ref is required' }, status: :bad_request if photo_ref.blank?

        width = 400
        height = 400

        api_key = ENV['GOOGLE_API_KEY']

        url = "#{GOOGLE_PHOTO_ENDPOINT}?#{{
            key: api_key,
            photo_reference: photo_ref,
            maxwidth: width
            }.to_query}"

        expires_in 12.hours, public: true
        redirect_to url, allow_other_host: true 
        
    end

end
