class Api::V1::LikesController < Api::V1::BaseController
  before_action :authenticate_api_v1_user!

  def index
    liked_cafes = Like.where(user_id: current_api_v1_user.id, likeable_type: "Cafe")
                      .includes(:likeable)
                      .order(created_at: :desc)
    liked_bookstores = Like.where(user_id: current_api_v1_user.id, likeable_type: "Bookstore")
                           .includes(:likeable)
                           .order(created_at: :desc)
    liked_pairs = Like.where(user_id: current_api_v1_user.id, likeable_type: "Pair")
                      .includes(:likeable)
                      .order(created_at: :desc)

    cafes = liked_cafes.as_json(include: { likeable: { only: %i[id place_id] } })
    bookstores = liked_bookstores.as_json(include: { likeable: { only: %i[id place_id] } })
    pairs = liked_pairs.as_json(
      include: {
        likeable: {
          only: [ :id ],
          include: {
            bookstore: { only: %i[id place_id] },
            cafe: { only: %i[id place_id] }
          }
        }
      }
    )

    likes = (cafes + bookstores + pairs).sort_by { |l| l["created_at"] }.reverse

    render json: { liked_places: likes }
  end

  def create
    target = case params[:type].to_s.downcase
    when "cafe"
               Cafe.find_or_create_by!(place_id: params[:place_id])
    when "bookstore"
               Bookstore.find_or_create_by!(place_id: params[:place_id])
    when "pair"
               bookstore = Bookstore.find_or_create_by!(place_id: params[:bookstore_place_id])
               cafe = Cafe.find_or_create_by!(place_id: params[:cafe_place_id])
               Pair.find_or_create_by!(bookstore:, cafe:)
    else
               return render_error("bad_request", "invalid type", :bad_request)
    end

    like = Like.find_or_create_by!(user: current_api_v1_user, likeable: target)
    render json: { likes_count: target.reload.likes_count, like_id: like.id }
  end

    def destroy
        like = current_api_v1_user.likes.find_by(id: params[:id])
        raise AppErrors::Unauthorized, "unauthorized" unless like

        target = like.likeable
        like.destroy
        render json: { likes_count: target.reload.likes_count }
    end
end
