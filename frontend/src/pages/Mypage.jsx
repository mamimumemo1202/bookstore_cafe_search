import { useState } from 'react';
import { SignOutButton } from '../components/auth/SignOutButton';
import { useAuthContext } from '../components/contexts/AuthContext';
import { AuthPage } from './AuthPage';
import { signOut } from '../apis/auth';
import { clearAuthInfo } from '../apis';
import { useNavigate } from "react-router-dom";


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

    return(
        <>
        {isLoggedIn? 
        <div className='flex flex-col pt-20 text-3xl'>
            {errorMessage && 
            <div className="bg-red-200 text-red-800 p-2 rounded mb-2">{errorMessage}</div>}

            <div className=''>今のログインユーザ：{user?.email}</div>   
            <SignOutButton 
            handleSignOut={handleSignOut}/>     
        </div>
        : 
        <div className='p-20'>
        <AuthPage/>
        </div>
        }
        </>
    )
}