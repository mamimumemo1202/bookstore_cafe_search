# Places::Normalizeで整形したデータにいいねの情報を加える({place_id => like_id})
module Likes
    class Lookup
        
        def self.call(user:, type:, place_ids:)
            return {} if user.blank? || place_ids.blank?

            model = 
            case type.to_s.downcase
                when "cafe" then Cafe
                when "bookstore" then Bookstore
            else return place_ids.index_with{nil}
            end

            ids = model.where(place_id: place_ids).pluck(:place_id, :id).to_h
            likes = Like.where(user: user, likeable_type: "#{type.to_s}", likeable_id: ids.values).pluck(:likeable_id, :id).to_h

            place_ids.index_with{|pid| likes[ ids[pid] ]}
        end

    end
end


# place_ids = ["pid1", "pid2, pid3"]
# ids = {place_id => cafe/bookstore.id} = {"pid1" => 23 ,"pid2" => 24, "pid3" => 25}
# likes = {cafe/bookstore.id => like.id} = {23 => 1001  ,24 => 1002}
# {place_id => like.id} = {"pid1" => 1001, "pid2" => 1002, "pid3" = nil}
