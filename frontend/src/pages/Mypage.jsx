import { useState } from 'react';
import { SignOutButton } from '../components/auth/SignOutButton';
import { useAuthContext } from '../components/contexts/AuthContext';
import { AuthPage } from './AuthPage';
import { signOut } from '../apis/auth';
import { clearAuthInfo } from '../apis';
import { useNavigate } from "react-router-dom";
import { BackButton } from '../components/common/BackButton'
import { Avatar } from '../components/common/Avatar';


export function Mypage(){

    const { isLoggedIn, setIsLoggedIn, user, setUser} = useAuthContext();

    const [ errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleSignOut = async() => {
        try {
            await signOut();
        } catch (error) {
            console.error("React側で失敗", error)
            setErrorMessage("エラーが発生しました。もう一度試してください。")
        } finally {
            clearAuthInfo();
            setUser(null);
            setIsLoggedIn(false);
            navigate('/')
        }
    }

    // アイコン、名前、メアド、パスワード変更リンク、いいねリスト、ブックマークリスト
    // TODO: 編集できるようにする
    return(
        <>
        <div className="flex m-4 p-1 w-8 h-8 rounded-full shadow-xl">
        <BackButton/>
        </div>

        <div className='flex flex-col justify-center pt-10  mx-10'>
            {errorMessage && 
            <div className="bg-red-200 text-red-800 p-2 rounded mb-2">{errorMessage}</div>}


            <div className='flex justify-center pb-4'>
                <div className='w-16 h-16'>
                    <Avatar user={ user }/>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-2 text-base pb-4">
            <div className="text-gray-500">ユーザー名</div>
            <div className="text-gray-900">{user?.name || '吾輩は猫である'}</div>

            <div className="text-gray-500">メールアドレス</div>
            <div className="text-gray-900 truncate">{user?.email}</div>
            

            <div className="text-gray-500">プロフィール</div>
            <div className="text-gray-900 break-normal">ここにはプロフィール文が入ります。</div>
            </div>

            <button
            type = "button" 
            className='flex justify-start text-sm text-blue-600 hover:underline'
            onClick={()=>navigate('/mypage/password')}>パスワードを変更する</button>    
            <SignOutButton 
            handleSignOut={handleSignOut}/>
        </div>

        </>
    )
}