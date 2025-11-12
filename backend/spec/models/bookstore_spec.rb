require 'rails_helper'

RSpec.describe Bookstore, type: :model do
  it { should have_many(:likes).dependent(:destroy) }

  it { should validate_presence_of(:place_id) }
  it { should validate_length_of(:place_id).is_at_most(255) }

  it 'place_idが一意' do
    Bookstore.create!(place_id: 'pid_1')
    dup = Bookstore.new(place_id: 'pid_1')

    expect(dup).not_to be_valid
    expect(dup.errors[:place_id]).to be_present
  end
end
