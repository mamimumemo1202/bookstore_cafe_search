import { useNavigate } from "react-router-dom"
import { BookOpenIcon, UserIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";


export function Header({setIsSearchModalOpen}){
const navigate = useNavigate();

    return(
        <>
        <div className="fixed top-0 left-0 right-0 h-16 shadow-sm bg-white z-50">
            <div className="flex justify-between w-full items-center h-full ">
            <BookOpenIcon
            className="h-6 w-6 ml-6"
            onClick={()=> navigate('/')}/>
            <div className="flex flex-row items-end gap-3 mr-6"> 
            <div className="">
                {/* TODO: 回避的にOptionalにしているので改善する（URLベース？） */}
            <MagnifyingGlassIcon
            className="h-6 w-6"
            onClick={()=>{setIsSearchModalOpen?.(true)}}/>
            </div>
            <div>
            <UserIcon className="h-6 w-6"
            onClick={()=> navigate('/auth')}/>
            </div>
            </div>
            </div>
        </div>
        </>
    )
}