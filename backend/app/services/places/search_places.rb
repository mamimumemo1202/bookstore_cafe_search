module Places
    class SearchPlaces
        def self.call(lat:, lng:, type:, bookstore_pid: nil, user: nil)
            client = ::GooglePlacesClient.new
            raw = client.search_nearby(lat: lat, lng: lng, type: type)
            places = Places::Normalize.normalize_nearby_results(raw["results"])


            Places::BuildPayload.call(
                places: places,
                bookstore_pid: bookstore_pid,
                user: user,
                type: type
            )
        end
    end
end
