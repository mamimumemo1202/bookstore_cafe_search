# SearchPlacesからの生データを整形する

module Places
    class Normalize

        def self.normalize_nearby_results(results)
            results.map do |p|
                {
                    place_id: p["place_id"],
                    name: p["name"],
                    lat: p.dig("geometry", "location", "lat"),
                    lng: p.dig("geometry", "location", "lng"),
                    vicinity: p["vicinity"],
                    photo_ref: p.dig("photos", 0, "photo_reference")
                }
                
            end
        end

        def self.normalize_details_result(place_id, result)
            {
            place_id: place_id,
            name: place["name"],
            lat: place.dig("geometry", "location", "lat"),
            lng: place.dig("geometry", "location", "lng"),
            # TODO: テスト用に一枚目を取得
            photo_ref: place.dig("photos", 0, "photo_reference"),
            business_status: place["business_status"],
            website:place["website"],
            rating:place["rating"],
            reviews:place.dig("reviews", 0,),
            address:format_address(place["formatted_address"]),
            open_now:place.dig("opening_hours", "open_now"),
            opening_hours:place.dig("opening_hours","weekday_text"),
            }
        end

    private

        def format_address(addr)
            addr = addr.sub(/\s*〒?\d{3}-?\d{4}\s*/, '')
            p addr
            addr = addr.sub(/\A\s*日本[、,\s]*/, '')
            p addr
            addr = addr.squish
        end
    end
end