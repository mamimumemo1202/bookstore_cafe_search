class Api::V1::LikesController < Api::BaseController
    before_action :authenticate_api_v1_user!

    def index
        liked_cafes = Like.where(user_id: current_api_v1_user.id, likeable_type: "Cafe").includes(:likeable).order(created_at: :desc)
        liked_bookstores = Like.where(user_id: current_api_v1_user.id, likeable_type: "Bookstore").includes(:likeable).order(created_at: :desc)
        liked_pairs = Like.where(user_id: current_api_v1_user.id, likeable_type: "Pair").includes(:likeable).order(created_at: :desc)



            cafes = liked_cafes.as_json(include: { likeable: { only: [ :id, :place_id ] } })

            bookstores = liked_bookstores.as_json(include: { likeable: { only: [ :id, :place_id ] } })

            pairs = liked_pairs.as_json(include: {
                                            likeable: {
                                                only: [ :id ],
                                                include: {
                                                    bookstore: { only: [ :id, :place_id ] },
                                                    cafe: { only: [ :id, :place_id ] } } } })

            likes = (cafes + bookstores + pairs).sort_by { |l| l["created_at"] }.reverse

            render json: { liked_places: likes }
    end

    def create
        case params[:type].to_s.downcase # = likeable_type

        when "cafe"
            target = Cafe.find_or_create_by!(place_id: params[:place_id])

        when "bookstore"
            target = Bookstore.find_or_create_by!(place_id: params[:place_id])

        when "pair"
            b = Bookstore.find_or_create_by!(place_id: params[:bookstore_place_id])
            c = Cafe.find_or_create_by!(place_id: params[:cafe_place_id])
            target = Pair.find_or_create_by!(bookstore: b, cafe: c)

        else 
            raise AppErrors::DomainError, "invalid type"
        end


        # (likeable: target)はlikeable_type, likeable_idを期待する
        like = Like.find_or_create_by!(user: current_api_v1_user, likeable: target)
        render json: { likes_count: target.reload.likes_count, like_id: like.id }

    end
    def destroy
        like = current_api_v1_user.likes.find(params[:id])
        target = like.likeable
        like.destroy
        render json: { likes_count: target.reload.likes_count }
    end
end
