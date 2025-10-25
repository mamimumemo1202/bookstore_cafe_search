require 'rails_helper'

RSpec.describe 'Places API', type: :request do
  ORIGIN = 'http://localhost:5173'.freeze

  def json_headers
    {
      'CONTENT_TYPE' => 'application/json',
      'ACCEPT' => 'application/json',
      'Origin' => ORIGIN
    }
  end

  describe 'GET /api/v1/places' do
    it '周辺検索の結果を返す（payloadの基本形）' do
      raw_results = { 'results' => [{ 'place_id' => 'pid1' }, { 'place_id' => 'pid2' }] }
      normalized = [
        { place_id: 'pid1', name: 'A', lat: 1.0, lng: 2.0, vicinity: 'addr1', photo_ref: 'ref1' },
        { place_id: 'pid2', name: 'B', lat: 3.0, lng: 4.0, vicinity: 'addr2', photo_ref: 'ref2' }
      ]
      payload = [
        { place_id: 'pid1', name: 'A', address: 'addr1', likes_count: 0, like_id: nil, pair_like_id: nil, lat: 1.0, lng: 2.0, photo_ref: 'ref1' },
        { place_id: 'pid2', name: 'B', address: 'addr2', likes_count: 3, like_id: 123, pair_like_id: nil, lat: 3.0, lng: 4.0, photo_ref: 'ref2' }
      ]

      allow_any_instance_of(GooglePlacesClient).to receive(:search_nearby).and_return(raw_results)
      allow(Places::Normalize).to receive(:normalize_nearby_results).with(raw_results['results']).and_return(normalized)
      allow(Places::BuildPayload).to receive(:call).and_return(payload)

      get '/api/v1/places', params: { lat: 35.0, lng: 139.0, type: 'Bookstore' }, headers: json_headers

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body['places']).to be_a(Array)
      expect(body['places'].size).to eq(2)
      expect(body['places'].first.keys).to include('place_id', 'name', 'address', 'lat', 'lng', 'photo_ref', 'likes_count', 'like_id', 'pair_like_id')
    end

    it 'indexで例外時に500とエラーメッセージを返す' do
        allow(Places::SearchPlaces).to receive(:call).and_raise(StandardError.new('boom'))

        get '/api/v1/places', params: { lat: 35.0, lng: 139.0, type: 'Bookstore' }, headers: json_headers
        expect(response).to have_http_status(:internal_server_error)
    end
  end

  describe 'GET /api/v1/places/:id' do
    it '詳細情報を返す（photosは最大3件）' do
      details = {
        'name' => 'Shop',
        'geometry' => { 'location' => { 'lat' => 1.0, 'lng' => 2.0 } },
        'photos' => [ { 'photo_reference' => 'a' }, { 'photo_reference' => 'b' }, { 'photo_reference' => 'c' } ],
        'business_status' => 'OPERATIONAL'
      }
      allow_any_instance_of(GooglePlacesClient).to receive(:fetch_place_details).and_return(details)

      get '/api/v1/places/PLACE_ID', headers: json_headers

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body['place']).to include('name', 'geometry')
      expect(body['place']['geometry']['location']).to include('lat', 'lng')
      expect(Array(body['place']['photos']).size).to be <= 3
    end
  end

  describe 'GET /api/v1/places/:id/geometry' do
    it 'geometry/location を返す' do
      geometry = { 'geometry' => { 'location' => { 'lat' => 1.23, 'lng' => 4.56 } } }
      allow_any_instance_of(GooglePlacesClient).to receive(:fetch_place_geometry).and_return(geometry)

      get '/api/v1/places/PLACE_ID/geometry', headers: json_headers

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body['geometry']['geometry']['location']).to include('lat', 'lng')
    end
  end

  describe 'GET /api/v1/places/get_details_bulk' do
    it 'place_idsに対応する簡易詳細の配列を返す' do
      bulk = [
        { place_id: 'pid1', name: 'A', address: 'addr1', lat: 1.0, lng: 2.0, photo_ref: 'ref1' },
        { place_id: 'pid2', name: 'B', address: 'addr2', lat: 3.0, lng: 4.0, photo_ref: 'ref2' }
      ]
      allow_any_instance_of(GooglePlacesClient).to receive(:fetch_place_details_bulk).and_return(bulk)

      get '/api/v1/places/get_details_bulk', params: { place_ids: %w[pid1 pid2] }, headers: json_headers

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)
      expect(body['details_bulk']).to be_a(Array)
      expect(body['details_bulk'].size).to eq(2)
      expect(body['details_bulk'].first.keys).to include('place_id', 'name', 'address', 'lat', 'lng', 'photo_ref')
    end

    it 'place_ids未指定なら401を返す' do
      get '/api/v1/places/get_details_bulk', headers: json_headers
      expect(response).to have_http_status(:bad_request)
    end
  end
end

