import { useNavigate } from "react-router-dom"
import { BookOpenIcon, UserIcon, MagnifyingGlassIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { SearchBar } from "../search/SearchByKeyword";
import { BackButton } from "../common/BackButton";
import { useModal } from "../contexts/ModalContext";
import { useAuthContext } from "../contexts/AuthContext"



export function Header({ variant }){
    const navigate = useNavigate();
    const { openModal } = useModal();
    const { isLoggedIn } = useAuthContext();
    

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
            <MagnifyingGlassIcon
            className="h-6 w-6"
            onClick={open}/>
            </div>

            <div>
            {isLoggedIn?
            <UserIcon 
            className="h-6 w-6"
            onClick={()=>navigate('/mypage')}/>
            : 
            <button
            className="hover:font-bold hover:underline"
            onClick={()=>navigate('/auth') }>新規登録・ログイン</button>}

            </div>
            </div>
            </div>
        </div>}

        {variant === "search" &&
        <div className="fixed top-0 left-0 right-0 h-16 shadow-sm bg-white z-50">
            <div className="mx-auto max-w-screen-md h-full flex items-center px-2">
                <div className=" w-6 h-6">
                    <BackButton />
                </div>
                <div className="">
                    <SearchBar/>
                </div>
                <button
                onClick={() => openModal()}
                className=" flex text-sm">検索モード<ChevronDownIcon className="w-5 h-5"/>
                </button>
                
            </div>
        </div>
        }
        </>
    )
}