class Bookstore < ApplicationRecord
  has_many :likes, as: :likeable, dependent: :destroy

  validates :place_id, presence: true, uniqueness: true, length: { maximum: 255 }
end
