class Pair < ApplicationRecord
  belongs_to :bookstore
  belongs_to :cafe

  has_many :likes, as: :likeable, dependent: :destroy
  
end
