// 検索バー、サービスの説明、未定
// はてなアイコンでどのようなアプリか説明する

import { useGeolocation } from "../hooks/useGeolocation";
import { useNavigate } from "react-router-dom";




// 現在地から探すボタンの下に本屋、ペア、カフェを置く
export function HomePage() {
    const navigate = useNavigate();
    const{getLocation} = useGeolocation();

    return(
     <>
     <div className="flex items-center justify-center h-screen">
        <div className = "flex flex-col">
        <div className="bg-blue-500 text-white rounded-t-md px-4 py-2 text-center">
                現在地から探す
            </div>
        <div className="flex ">
            <div className="bg-white text-gray-700 border rounded-bl-md px-4 py-2 text-center cursor-pointer hover:bg-gray-100">
                {/* ペアの機能ができたらつくる */}
                ペア（未実装）
            </div>
            <div className="bg-white text-gray-700 border px-4 py-2 text-center cursor-pointer hover:bg-gray-100"
                onClick={ async () =>{ 
                const pos = await getLocation();
                navigate('/searchpage',{
                    state: {
                        lat: pos.lat,
                        lng: pos.lng,
                        type: '本屋'
                    }
                })
                }}>
                本屋
            </div>
            <div className="bg-white text-gray-700 border rounded-br-md px-4 py-2 text-center cursor-pointer hover:bg-gray-100"
            onClick={ async () =>{ 
                const pos = await getLocation();
                navigate('/searchpage',{
                    state: {
                        lat: pos.lat,
                        lng: pos.lng,
                        type: 'カフェ'
                    }
                })
                }}>
                カフェ
            </div>
        </div>
        </div>
     </div>



    
     </>
    )
}