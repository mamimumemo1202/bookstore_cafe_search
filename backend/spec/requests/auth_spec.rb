require 'rails_helper'

RSpec.describe 'Auth (DeviseTokenAuth)', type: :request do
  it 'generates confirmation token on sign up' do
    email = "user_signup+#{SecureRandom.hex(6)}@example.com"

    headers = {
      'CONTENT_TYPE' => 'application/json',
      'ACCEPT' => 'application/json',
      'Origin' => 'http://localhost:5173'
    }

    post '/api/v1/auth',
         params: {
           email: email,
           password: 'password123',
           password_confirmation: 'password123',
           confirm_success_url: 'http://localhost:5173/confirmed'
         }.to_json,
         headers: headers

    expect(response).to have_http_status(:ok)

    user = User.find_by(email: email)
    expect(user).to be_present
    expect(user.confirmation_token).to be_present
    expect(user.confirmation_sent_at).to be_present
  end

  it 'ログイン後トークンが正しいかを確認' do
    email = "login_#{SecureRandom.hex(6)}@example.com"
    user = User.create!(email: email, password: 'password123', password_confirmation: 'password123', confirmed_at: Time.current)

    headers = {
      'CONTENT_TYPE' => 'application/json',
      'ACCEPT' => 'application/json',
      'Origin' => 'http://localhost:5173'
    }

    post '/api/v1/auth/sign_in',
         params: {
           email: user.email,
           password: 'password123'
         }.to_json,
         headers: headers

    expect(response).to have_http_status(:ok)

    access_token = response.headers['access-token']
    client = response.headers['client']
    uid = response.headers['uid']

    expect(access_token).to be_present
    expect(client).to be_present
    expect(uid).to eq(user.email)

    get '/api/v1/auth/validate_token', 
      headers: {
        "access-token": access_token,
        "client": client,
        "uid": uid
      }

    expect(response).to have_http_status(:ok)
  end
end
