class Api::V1::PlacesController < ApplicationController
  def index
    payload = Places::SearchPlaces.call(
      lat: params[:lat],
      lng: params[:lng],
      type: params[:type],
      bookstore_pid: params[:bookstore_place_id],
      user: current_api_v1_user
    )

    render json: {places: payload}

    rescue => e
    Rails.logger.error(e.message)
    render json: { error: "Nearby search failed" }, status: :internal_server_error
    
  end

  def show
      place_id = params[:id]

      client = ::GooglePlacesClient.new
      place_details = client.fetch_place_details(place_id)

      render json: { place: place_details }

    rescue => e
      Rails.logger.error(e.message)
      render json: { error: "Place details fetch failed" }, status: :internal_server_error
    end
end     
