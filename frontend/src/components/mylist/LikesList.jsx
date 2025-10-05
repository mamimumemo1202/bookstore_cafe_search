import { LikeButton } from "../search/LikeButton";
import { LikePairButton } from "../search/LikePairButton"
import { useModal } from "../contexts/ModalContext";
import { SearchModal } from "../search/SearchModal";
import { useState } from "react";
import { PlaceDetailCard } from "../search/PlaceDetailCard";

export function LikeList({ likedPlaces }) {
    const { isOpenModal, closeModal } = useModal();
    const [openId, setOpenId] = useState(null);

    const handleDetailToggle = (id) => {
        setOpenId(openId === id ? null : id)
    }

    return(
        <>

        {isOpenModal && <SearchModal onClose={closeModal}/>}

        <div>
        <div className="py-2">カフェ</div>
        <div className="grid grid-cols-1" >
        {likedPlaces?.liked_cafes?.length > 0 ? 
        likedPlaces?.liked_cafes?.map(like => (
            <ul key={like.id} 
            className="rounded-r-xl shadow-md p-4 mb-1 mr-1 border-l-5 text-primary-800 bg-primary-50 border-l-5 border-primary-300 "
            onClick={()=>{handleDetailToggle(like.id)}}>
                <li className="flex justify-between">
                <div className="text-lg font-semibold cursor-pointer">{like.likeable.name}</div>
                <button>
                    <LikeButton
                    placeId={like.likeable.place_id}
                    type= "Cafe"
                    likeId={like.id}/>
                </button>

                {openId === like.id && 
                <PlaceDetailCard
                placeId={like.likeable.place_id}/>}
                </li>
            </ul>
        ))
        :
        <div>いいねしたカフェがありません</div>}
        </div>
        </div>

        <div>
        <div className="py-2" >本屋</div>
        <div className="grid grid-cols-1" >
        {likedPlaces?.liked_bookstores?.length > 0 ? 
        likedPlaces?.liked_bookstores?.map(like => (
            <ul key={like.id} 
            className="rounded-r-xl shadow-md p-4 mb-1 mr-1 border-l-5 text-primary-800 bg-primary-50 border-l-5 border-primary-300 "
            onClick={()=>{handleDetailToggle(like.id)}}>
                <li className="flex justify-between">
                <div className="text-lg font-semibold cursor-pointer">{like.likeable.name}</div>
                <button>
                    <LikeButton
                    placeId={like.likeable.place_id}
                    type= "Bookstore"
                    likeId={like.id}/>
                </button>

                {openId === like.id && 
                <PlaceDetailCard
                placeId={like.likeable.place_id}/>}
                </li>
            </ul>
        ))
        :
        <div>いいねした本屋がありません</div>}
        </div>
        </div>

        <div>
        <div className="py-2">ペア</div>
        <div className="grid grid-cols-1" >
        {likedPlaces?.liked_pairs?.length > 0 ? 
        likedPlaces?.liked_pairs?.map(like => (
            <ul key={like.id} className="rounded-r-xl shadow-md p-4 mb-1 mr-1 border-l-5 text-primary-800 bg-primary-50 border-l-5 border-primary-300 "
            onClick={()=>{handleDetailToggle(like.id)}}>
                <li className="flex justify-between">
                <div className="text-lg font-semibold cursor-pointer">{like.likeable.id}</div>
                <button>
                    <LikePairButton
                    bookstorePlaceId={like.likeable.bookstore.place_id}
                    cafePlaceId={like.likeable.cafe.place_id}
                    pairLikeId={like.id}/>
                </button>

                {/*TODO: ペアは独自の詳細を表示 */}
                {openId === like.id && 
                "ペアは独自の詳細を表示予定"}
                </li>
            </ul>
        ))
        :
        <div>いいねしたペアがありません</div>}
        </div>
        </div>

        </>
    )


}