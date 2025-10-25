class Pair < ApplicationRecord
  belongs_to :bookstore
  belongs_to :cafe

  has_many :likes, as: :likeable, dependent: :destroy

  validates :bookstore, presence: true
  validates :cafe, presence: true
  validates :bookstore_id, uniqueness: { scope: :cafe_id }
end
