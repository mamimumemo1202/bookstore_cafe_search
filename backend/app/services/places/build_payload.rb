module Places
    class BuildPayload

        def self.call(places:, bookstore_pid: nil, user:, type:)
            place_ids = places.map{|p| p[:place_id]}

            like_map = 
            if user.present?
                Likes::Lookup.call(user:, type:, place_ids:)
            else
                place_ids.index_with{nil}
            end
            p like_map

            pair_map =
            if bookstore_pid.present? || user.present? || type.to_s.downcase === "cafe"
                Pairs::Lookup.call(bookstore_pid:, cafe_pids: place_ids, user:)
            else
                place_ids.index_with{nil}
            end

            places.map do |p| {
                place_id:     p[:place_id],
                name:         p[:name],
                address:      p[:vicinity],
                likes_count:  0,
                like_id:      like_map[p['pid']],
                pair_like_id: pair_map[p['pid']],
                lat:          p[:lat],
                lng:          p[:lng],
                photo_ref:    p[:photo_ref],
            }
            end
        end
    end
end