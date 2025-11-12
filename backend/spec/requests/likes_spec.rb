require 'rails_helper'

# Like API リクエストスペックの外枠（実装しやすい形で雛形を用意）

RSpec.describe 'Likes API', type: :request do
  ORIGIN = 'http://localhost:5173'.freeze
  PASSWORD = 'password123'.freeze

  def json_headers
    {
      'CONTENT_TYPE' => 'application/json',
      'ACCEPT' => 'application/json',
      'Origin' => ORIGIN
    }
  end

  # サインインして認証ヘッダを取得
  def auth_headers_for(user)
    post '/api/v1/auth/sign_in',
         params: { email: user.email, password: PASSWORD }.to_json,
         headers: json_headers

    {
      'CONTENT_TYPE' => 'application/json',
      'ACCEPT' => 'application/json',
      'Origin' => ORIGIN,
      'access-token' => response.headers['access-token'],
      'client' => response.headers['client'],
      'uid' => response.headers['uid']
    }
  end

  let(:user) do
    User.create!(
      email: "like_tester_#{SecureRandom.hex(4)}@example.com",
      password: PASSWORD,
      password_confirmation: PASSWORD,
      confirmed_at: Time.current
    )
  end

  describe 'POST /api/v1/likes' do
    it 'カフェにいいねできる（likes_countがインクリメント）' do
      headers = auth_headers_for(user)
      place_id = "cafe_#{SecureRandom.hex(6)}"

      post '/api/v1/likes',
           params: { place_id: place_id, type: 'Cafe' }.to_json,
           headers: headers

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)

      expect(body['like_id']).to be_present
      expect(body['likes_count']).to eq(1)
    end

    it '本屋にいいねできる（likes_countがインクリメント）' do
      headers = auth_headers_for(user)
      place_id = "book_#{SecureRandom.hex(6)}"

      post '/api/v1/likes',
           params: { place_id: place_id, type: 'Bookstore' }.to_json,
           headers: headers

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)

      expect(body['like_id']).to be_present
      expect(body['likes_count']).to eq(1)
    end

    it '同一ユーザーの二重いいねは作成されない（ユニーク制約）' do
      headers = auth_headers_for(user)
      place_id = "cafe_#{SecureRandom.hex(6)}"

      post '/api/v1/likes', params: { place_id: place_id, type: 'Cafe' }.to_json, headers: headers
      post '/api/v1/likes', params: { place_id: place_id, type: 'Cafe' }.to_json, headers: headers


      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)

      expect(body['like_id']).to be_present
      expect(body['likes_count']).to eq(1)
    end

    it '認証なしのアクセスは401を返す' do
      place_id = "cafe_#{SecureRandom.hex(6)}"

      post '/api/v1/likes',
           params: { place_id: place_id, type: 'Cafe' }.to_json,
           headers: json_headers

      expect(response).to have_http_status(:unauthorized)
    end

    it 'typeが不正なら400を返す（invalid type）' do
      headers = auth_headers_for(user)
      place_id = "x_#{SecureRandom.hex(6)}"

      post '/api/v1/likes',
           params: { place_id: place_id, type: 'InvalidType' }.to_json,
           headers: headers

      expect(response).to have_http_status(:bad_request)
    end
  end

  describe 'DELETE /api/v1/likes/:id' do
    it 'いいね解除できる（likes_countがデクリメント）' do
      headers = auth_headers_for(user)
      place_id = "cafe_#{SecureRandom.hex(6)}"

      post '/api/v1/likes', params: { place_id: place_id, type: 'Cafe' }.to_json, headers: headers
      like_id = JSON.parse(response.body)['like_id']

      delete "/api/v1/likes/#{like_id}", headers: headers

      expect(response).to have_http_status(:ok)
      body = JSON.parse(response.body)

      expect(body['likes_count']).to eq(0)
    end

    it '他ユーザーのlikeは削除できない' do
      owner = User.create!(email: "owner_#{SecureRandom.hex(4)}@example.com", password: PASSWORD, password_confirmation: PASSWORD, confirmed_at: Time.current)
      owner_headers = auth_headers_for(owner)

      place_id = "cafe_#{SecureRandom.hex(6)}"
      post '/api/v1/likes', params: { place_id: place_id, type: 'Cafe' }.to_json, headers: owner_headers
      like_id = JSON.parse(response.body)['like_id']

      others = auth_headers_for(user)
      delete "/api/v1/likes/#{like_id}", headers: others

      expect(response).to have_http_status(:unauthorized)
    end
  end
end
