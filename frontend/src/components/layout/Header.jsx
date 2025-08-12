import { useNavigate } from "react-router-dom"
import { BookOpenIcon, UserIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SearchBar } from "../search/SearchByKeyword";
import { BackButton } from "../common/BackButton";
import { useModal } from "../contexts/ModalContext";



export function Header({ variant }){
    const navigate = useNavigate();
    const { open } = useModal();

    return(
        <>
        {variant === "home" && 
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
            onClick={open}/>
            </div>
            <div>
            <UserIcon className="h-6 w-6"
            onClick={()=> navigate('/mypage')}/>
            </div>
            </div>
            </div>
        </div>}

        {variant === "search" &&
        <div className="fixed top-0 left-0 right-0 h-16 shadow-sm bg-white z-50">
            <div className="flex items-center gap-3">
            <div className="">
                <BackButton/>
            </div>
            <div className="">
                <SearchBar/>
            </div>
            </div>
        </div>
        }
        </>
    )
}