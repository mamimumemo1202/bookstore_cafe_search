require 'rails_helper'

RSpec.describe Like, type: :model do
  it { should belong_to(:user) }
  it { should belong_to(:likeable) }

  it { should validate_presence_of(:user_id) }
  it { should validate_presence_of(:likeable_type) }
  it { should validate_inclusion_of(:likeable_type).in_array(%w[Bookstore Cafe Pair]) }
  it { should validate_presence_of(:likeable_id) }

  it 'ユーザーと対象で一意' do
    user = User.create!(email: "u_#{SecureRandom.hex(4)}@ex.com", password: 'password123', password_confirmation: 'password123', confirmed_at: Time.current)
    cafe = Cafe.create!(place_id: "cafe_#{SecureRandom.hex(4)}")
    Like.create!(user: user, likeable: cafe)
    dup = Like.new(user: user, likeable: cafe)
    expect(dup).not_to be_valid
    expect(dup.errors[:user_id]).to be_present
  end
end
