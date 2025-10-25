module Pairs
    class Lookup
        def self.call(bookstore_pid:, cafe_pids:, user:)
            return cafe_pids.index_with { nil } if cafe_pids.blank? || bookstore_pid.blank? || user.blank?

            bookstore = Bookstore.find_by(place_id: bookstore_pid)
            return cafe_pids.index_with { nil } unless bookstore

            cafe_pid_to_id = Cafe.where(place_id: cafe_pids).pluck(:place_id, :id).to_h
            cafe_ids = cafe_pid_to_id.values

            cafe_id_to_pair_id = Pair.where(bookstore_id: bookstore.id, cafe_id: cafe_ids)
                                .pluck(:cafe_id, :id).to_h
            pair_ids = cafe_id_to_pair_id.values

            pair_id_to_like_id = Like.where(user_id: user.id, likeable_type: "Pair", likeable_id: pair_ids)
                                .pluck(:likeable_id, :id).to_h

            cafe_pids.index_with do |pid|
                cafe_id = cafe_pid_to_id[pid]
                pair_id = cafe_id_to_pair_id[cafe_id]
                pair_id_to_like_id[pair_id]
            end
        end
    end
end
