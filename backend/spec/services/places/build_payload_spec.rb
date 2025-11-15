require 'rails_helper'

RSpec.describe Places::BuildPayload do
    let(:places){
      [
        { place_id: 'pid_1', name: 'A', vicinity: 'Addr A', lat: 35.0, lng: 139.0, photo_ref: 'ref_a' },
        { place_id: 'pid_2', name: 'B', vicinity: 'Addr B', lat: 36.0, lng: 140.0, photo_ref: 'ref_b' }
      ]
    }
    let(:like_map){ { 'pid_1' => 123, 'pid_2' => nil } }
    let(:pair_map){ { 'pid_1' => nil,  'pid_2' => 987 } }
    let(:counts_map){ { 'pid_1' => 5,    'pid_2' => 0 } }
    let(:user) do
      User.create!(email: "u_#{SecureRandom.hex(4)}@example.com", password: 'password123', password_confirmation: 'password123', confirmed_at: Time.current)
    end

    before do
      allow(Likes::Lookup).to receive(:call).and_return(like_map)
      allow(Pairs::Lookup).to receive(:call).and_return(pair_map)
      allow(Likes::CountsLookup).to receive(:call).and_return(counts_map)
    end

  describe '.call' do
    it 'likes_count/like_id/pair_like_id をマージして返す(bookstore_pid: nil)' do

      out = described_class.call(
        places: places,
        bookstore_pid: nil,
        user: user,
        type: 'Cafe'
      )

      expect(out).to be_a(Hash)
      expect(out[:places]).to be_a(Array)

      first = out[:places].find { |h| h[:place_id] == 'pid_1' }
      second = out[:places].find { |h| h[:place_id] == 'pid_2' }

      expect(first).to include(
        name: 'A', address: 'Addr A', lat: 35.0, lng: 139.0,
        photo_ref: 'ref_a', likes_count: 5, like_id: 123, pair_like_id: nil, place_id: 'pid_1'
      )
      expect(second).to include(
        name: 'B', address: 'Addr B', lat: 36.0, lng: 140.0,
        photo_ref: 'ref_b', likes_count: 0, like_id: nil, pair_like_id: 987, place_id: 'pid_2'
      )
    end
  end
end
