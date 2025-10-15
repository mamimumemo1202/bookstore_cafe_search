class Api::V1::PlacesController < Api::BaseController
  def index
    payload = Places::SearchPlaces.call(
      lat: params[:lat],
      lng: params[:lng],
      type: params[:type],
      bookstore_pid: params[:bpid],
      user: current_api_v1_user
    )

    render json: { places: payload }
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

      return render json: {geometry: geometry}

    end

    def get_details_bulk
      place_ids = Array(params[:place_ids])
      client = ::GooglePlacesClient.new
      details_bulk = client.fetch_place_details_bulk(place_ids)

      render json: { details_bulk: details_bulk }
    end
end
