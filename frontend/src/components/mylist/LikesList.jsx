import { LikeButton } from "../search/LikeButton";
import { useModal } from "../contexts/ModalContext";
import { SearchModal } from "../search/SearchModal";

export function LikeList({ likedPlaces }) {
    const { isOpenModal, closeModal } = useModal();

    return(
        <>

        {isOpenModal && <SearchModal onClose={closeModal}/>}

        <div>
        <div className="py-2">カフェ</div>
        <div className="grid grid-cols-1" >
        {likedPlaces?.liked_cafes?.length > 0 ? 
        likedPlaces?.liked_cafes?.map(like => (
            <ul key={like.id} className="rounded-r-xl shadow-md p-4 mb-1 mr-1 border-l-5 text-primary-800 bg-primary-50 border-l-5 border-primary-300 ">
                <li className="flex justify-between">
                <div className="text-lg font-semibold cursor-pointer">{like.likeable.id}</div>
                <button>
                    <LikeButton
                    placeId={like.likeable.place_id}
                    type= "Cafe"
                    likeId={like.id}/>
                </button>
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
            <ul key={like.id} className="rounded-r-xl shadow-md p-4 mb-1 mr-1 border-l-5 text-primary-800 bg-primary-50 border-l-5 border-primary-300 ">
                <li className="flex justify-between">
                <div className="text-lg font-semibold cursor-pointer">{like.likeable.id}</div>
                <button>
                    <LikeButton
                    placeId={like.likeable.place_id}
                    type= "Bookstore"
                    likeId={like.id}/>
                </button>
                </li>
            </ul>
        ))
        :
        <div>いいねした本屋がありません</div>}
        </div>
        </div>
        </>
    )


}