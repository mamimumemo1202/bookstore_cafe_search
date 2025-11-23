module Places
    class BuildPayload
        def self.call(places:, bookstore_pid: nil, user:, type:, next_page_token: nil)
            place_ids = places.map { |p| p[:place_id] }

            like_map =
            if user.present?
                Likes::Lookup.call(user:, type:, place_ids:)
            else
                place_ids.index_with { nil }
            end

            pair_map =
            if bookstore_pid.present? || user.present? || type.to_s.downcase === "cafe"
                Pairs::Lookup.call(bookstore_pid:, cafe_pids: place_ids, user:)
            else
                place_ids.index_with { nil }
            end

            counts_map =
            Likes::CountsLookup.call(type:, place_ids:)

            payload =
            places.map do |p| {
                place_id:     p[:place_id],
                name:         p[:name],
                address:      p[:vicinity],
                likes_count:  counts_map[p[:place_id]] || 0,
                like_id:      like_map[p[:place_id]],
                pair_like_id: pair_map[p[:place_id]],
                lat:          p[:lat],
                lng:          p[:lng],
                photo_attribution: p[:photo_attribution],
                photo_ref:    p[:photo_ref]
            }
            end

            {places: payload, next_page_token: next_page_token}
        end
    end
end
