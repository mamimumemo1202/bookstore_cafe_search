class Api::V1::PlacesController < ApplicationController
    def index
      lat = params[:lat]
      lng = params[:lng]
      type = params[:type] 
  
      client = GooglePlacesClient.new
      places = client.search_nearby(lat: lat, lng: lng, type: type)
  
      render json: { places: places }

        rescue => e
        Rails.logger.error(e.message)
        render json: { error: "Place details fetch failed" }, status: 500
      
    end

    # いまは使ってないけど将来クリックしたときに表示する用に残しておくけど、詳細の住所だけ表示して
    # クリックしたときはGooglemapの遷移するようにしたほうがいい
      def show
        place_id = params[:id]

        client = GooglePlacesClient.new
        place_details = client.fetch_place_details(place_id)

        render json: { place: place_details }

        # エラー処理
      rescue => e
        Rails.logger.error(e.message)
        render json: { error: "Place details fetch failed" }, status: 500
      end
    end
    