class Api::V1::PhotosController < Api::BaseController
    GOOGLE_PHOTO_ENDPOINT = "https://maps.googleapis.com/maps/api/place/photo"

    def show
        photo_ref = params.require(:photo_ref)

        width = 400
        height = 400

        api_key = ENV["GOOGLE_API_KEY"]

        url = "#{GOOGLE_PHOTO_ENDPOINT}?#{{
            key: api_key,
            photo_reference: photo_ref,
            maxwidth: width
            }.to_query}"

        expires_in 12.hours, public: true
        redirect_to url, allow_other_host: true
    end
end
