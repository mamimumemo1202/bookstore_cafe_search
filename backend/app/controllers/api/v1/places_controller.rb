class Api::V1::PlacesController < ApplicationController

    def index
      lat = params[:lat]
      lng = params[:lng]
      type = params[:type]
  
      # PlaceAPIから周辺の施設の情報を取得する
      client = GooglePlacesClient.new
      places = client.search_nearby(lat:, lng:, type:)

      return render json: { places: [] } if places.empty?

      

      # PlaceAPIから取得した情報に自身のいいねの情報を加える
      place_ids = places.map { |p| p[:place_id] }
      like_map = current_api_v1_user ? get_like_ids(type, place_ids, current_api_v1_user) : {} 
      

      payload = places.map do |p|

      pid = p[:place_id]
      lid = like_map[pid]
      {
        place_id:     p[:place_id],
        name:         p[:name],
        address:      p[:formatted_address],
        likes_count:  0,
        liked:        lid.present?,
        like_id:      lid,
        lat:          p[:lat],
        lng:          p[:lng]
      }
      end
      
      render json: {places: payload}

  

    rescue => e
      Rails.logger.error(e.message)
      render json: { error: "Nearby search failed" }, status: :internal_server_error
      
    end

    def show
      place_id = params[:id]

      client = GooglePlacesClient.new
      place_details = client.fetch_place_details(place_id)

      render json: { place: place_details }

    rescue => e
      Rails.logger.error(e.message)
      render json: { error: "Place details fetch failed" }, status: :internal_server_error
    end

    private

    # Place_idをTYPE_idに変換し、場所_idをlike_idに変換し、Place_idとlike_idを紐づける
    def get_like_ids(type, place_ids, user)
      case type
      when "Cafe"
        
        ids = Cafe.where(place_id: place_ids).pluck(:place_id, :id).to_h

        likes = Like.where(user: user, likeable_type: "Cafe", likeable_id: ids.values).pluck(:likeable_id, :id).to_h

        result = ids.transform_values { |cafe_id| likes[cafe_id] }

      when "Bookstore"
        
        ids = Bookstore.where(place_id: place_ids).pluck(:place_id, :id).to_h

        likes = Like.where(user: user, likeable_type: "Bookstore", likeable_id: ids.values).pluck(:likeable_id, :id).to_h

        result = ids.transform_values { |bookstore_id| likes[bookstore_id] }

      else {}
    end
  end
end
