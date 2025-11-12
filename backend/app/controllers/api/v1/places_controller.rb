class Api::V1::PlacesController < Api::V1::BaseController
  def index
    payload =
      if params[:pagetoken].present?
        Places::SearchPlaces.call_next_page(
          pagetoken: params[:pagetoken],
          user: current_api_v1_user,
          type: params[:type],
          bookstore_pid: params[:bpid],
        )
      else
        Places::SearchPlaces.call(
          lat: params[:lat],
          lng: params[:lng],
          type: params[:type],
          bookstore_pid: params[:bpid],
          user: current_api_v1_user
        )
      end

    # { places: [...], next_page_token:  } 
    render json: payload 
  end


  # カードをクリックしたときのリッチ情報を返す。カードクリック時に発火。
  def show
      place_id = params[:id]

      client = ::GooglePlacesClient.new
      place_details = client.fetch_place_details(place_id)

      render json: { place: place_details }
    end

    # 検索窓で検索したときにURLのlat, lngを返す
    def geometry
      place_id = params[:id]

      client = ::GooglePlacesClient.new
      geometry = client.fetch_place_geometry(place_id)

      render json: { geometry: geometry }
    end

    # いいねしたそれぞれの場所のname formatted_address photosを取得し、カードに表示
    # フロントのMylistでいいねを一回もしていない時にClientでエラーを発生させないために空を許容
    def get_details_bulk
      place_ids_param = params[:place_ids]
      return render json: { details_bulk: [] } if place_ids_param.blank?

      place_ids = Array(place_ids_param)
      client = ::GooglePlacesClient.new
      details_bulk = client.fetch_place_details_bulk(place_ids)

      render json: { details_bulk: details_bulk }
    end
end
