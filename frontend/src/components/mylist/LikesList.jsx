export function LikeList({ likedPlaces }) {
    return(
        <>
        <div>
        <div>カフェ</div>
        {likedPlaces?.liked_cafes?.length > 0 ? 
        likedPlaces?.liked_cafes?.map(like => (
            <ul key={like.id}>
                {like.likeable.place_id}
            </ul>
        ))
        :
        <div>いいねしたカフェがありません</div>}
        </div>

        <div>
        <div>本屋</div>
        {likedPlaces?.liked_bookstores?.length > 0 ? 
        likedPlaces?.liked_bookstores?.map(like => (
            <ul key={like.id}>
                {like.likeable.place_id}
            </ul>
        ))
        :
        <div>いいねした本屋がありません</div>}
        </div>
        </>
    )


}