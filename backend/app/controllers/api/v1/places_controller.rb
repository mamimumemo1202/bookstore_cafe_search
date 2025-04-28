class Api::V1::PlacesController < ApplicationController
    def index
      lat = params[:lat]
      lng = params[:lng]
      keyword = params[:keyword] || 'cafe'
  
      client = GooglePlacesClient.new
      places = client.search_nearby(lat: lat, lng: lng, keyword: keyword)
  
      render json: { places: places }
    end

    def show
      place_id = params[:id]

      client = GooglePlacesClient.new
      place_details = client.fetch_place_details(place_id)

      Rails.logger.info("===== PLACE DETAILS =====")
      Rails.logger.info(place_details.inspect)

      render json: { place: place_details }

      # エラー処理
    rescue => e
      Rails.logger.error(e.message)
      render json: { error: "Place details fetch failed" }, status: 500
    end
  end
  