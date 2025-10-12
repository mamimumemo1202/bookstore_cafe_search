class Like < ApplicationRecord
  belongs_to :user
  belongs_to :likeable, polymorphic: true, counter_cache: true

  validates :user_id, presence: true
  validates :likeable_type, presence: true, inclusion: { in: %w[Bookstore Cafe Pair] }
  validates :likeable_id, presence: true
  validates :user_id, uniqueness: { scope: %i[likeable_type likeable_id] }
end
