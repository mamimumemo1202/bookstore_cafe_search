module Likes
    class CountsLookup
        def self.call(type:, place_ids:)
            return {} if place_ids.blank?

            case type.to_s.downcase
            when "cafe"
                 cafes = Cafe.where(place_id: place_ids).pluck(:place_id, :likes_count).to_h
            when "bookstore"
                 bookstores = Bookstore.where(place_id: place_ids).pluck(:place_id, :likes_count).to_h
            else
                {}
            end
        end
    end
end
