require 'rails_helper'

RSpec.describe Pair, type: :model do
  it { should belong_to(:bookstore) }
  it { should belong_to(:cafe) }
  it { should have_many(:likes).dependent(:destroy) }

  it 'bookstore/cafe は必須' do
    expect(Pair.new).not_to be_valid
  end

  it 'bookstore/cafe は一意' do
    b = Bookstore.create!(place_id: "b_#{SecureRandom.hex(4)}")
    c = Cafe.create!(place_id: "c_#{SecureRandom.hex(4)}")
    Pair.create!(bookstore:b, cafe:c)
    dup = Pair.new(bookstore:b, cafe:c)

    expect(dup).not_to be_valid
    expect(dup.errors[:bookstore_id]).to be_present
  end
end