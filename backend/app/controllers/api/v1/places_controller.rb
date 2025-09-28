class Api::V1::PlacesController < ApplicationController

    def index
      lat = params[:lat]
      lng = params[:lng]
      type = params[:type]
      bookstore_pid = params[:bookstore_place_id]

  
      # PlaceAPIから周辺の施設の情報を取得する
      client = GooglePlacesClient.new
      places = client.search_nearby(lat:, lng:, type:)

      return render json: { places: [] } if places.empty?

      

      # PlaceAPIから取得した情報に自身のいいねの情報を加える
      place_ids = places.map { |p| p[:place_id] }
      like_map = current_api_v1_user ? get_like_ids(type, place_ids, current_api_v1_user) : {} 
      pair_like_map =
      if current_api_v1_user && bookstore_pid.present? && type.to_s.downcase == "cafe"
        get_pair_ids(bookstore_pid, place_ids, current_api_v1_user) else {} end
      

      payload = places.map do |p|

      pid = p[:place_id]
      lid = like_map[pid]
      {
        place_id:     p[:place_id],
        name:         p[:name],
        address:      p[:formatted_address],
        likes_count:  0,
        like_id:      lid,
        pair_like_id: pair_like_map[pid],
        lat:          p[:lat],
        lng:          p[:lng],
        photo_ref:    p[:photo_ref]
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

    # cafeのplace_id -> cafe_id -> pair_id(bookstore_id, cafe_id) -> like_id
    def get_pair_ids(bookstore_pid, cafe_pids, user)
      return {} if cafe_pids.blank?

      bookstore = Bookstore.find_by(place_id: bookstore_pid)

      cafe_pid_to_id = Cafe.where(place_id: cafe_pids).pluck(:place_id, :id).to_h
      cafe_ids = cafe_pid_to_id.values

      cafe_id_to_pair_id = Pair.where(bookstore_id: bookstore.id, cafe_id: cafe_ids)
                          .pluck(:cafe_id, :id).to_h
      pair_ids = cafe_id_to_pair_id.values

      pair_id_to_like_id = Like.where(user_id: user.id, likeable_type: "Pair", likeable_id: pair_ids)
                          .pluck(:likeable_id, :id).to_h
      
      cafe_pids.index_with do |pid|
        cafe_id = cafe_pid_to_id[pid]
        pair_id = cafe_id_to_pair_id[cafe_id]
        pair_id_to_like_id[pair_id]
      end
    end
end
