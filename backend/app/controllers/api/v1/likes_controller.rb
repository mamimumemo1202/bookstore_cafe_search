class Api::V1::LikesController < ApplicationController
    before_action :authenticate_api_v1_user!
        


    def index

    end

    def create
        case params[:type] # = likeable_type

        when "Cafe"
            target = Cafe.find_or_create_by!(place_id: params[:place_id])

        when "Bookstore"
            target = Bookstore.find_or_create_by!(place_id: params[:place_id])

        when "Pair"
            b = Bookstore.find_or_create_by!(place_id: params[:bookstore_place_id])
            c = Cafe.find_or_create_by!(place_id: params[:cafe_place_id])
            target = Pair.find_or_create_by!(bookstore: b, cafe: c)

        else return render json: {error: "invalid type" }, status: :bad_request
        end


    # (likeable: target)はlikeable_type, likeable_idを期待する
        like = Like.find_or_create_by!(user: current_api_v1_user, likeable: target)
        render json: {likes_count: target.reload.likes_count, like_id: like.id}

        rescue => e
            Rails.logger.error(e.message)
            render json: { error: "Unauthrized" }, status: :unauthorized
    end




    def destroy
        like = current_api_v1_user.likes.find(params[:id])
        target = like.likeable
        like.destroy
        render json: { likes_count: target.reload.likes_count }

    end

    rescue => e
      Rails.logger.error(e.message)
      render json: { error: "Unauthrized" }, status: :unauthrized

    private

end
