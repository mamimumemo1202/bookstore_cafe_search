import { useState } from "react";
import { SignInForm } from "../components/auth/SignInForm";
import { SignUpForm } from "../components/auth/SignUpForm";
import { useAuthContext } from '../components/contexts/AuthContext';



export function AuthPage(){
    const[ isOpenSignUp, setIsOpenSignUp] = useState(false)
    const { isLoggedIn, setIsLoggedIn, user, setUser } = useAuthContext()
 

    return(
        <>
        <button 
        className="p-3 bg-green-500 hover:bg-green-400"
        onClick={()=>setIsOpenSignUp(prev => !prev)}>{isOpenSignUp? "ログインする" : "新規登録する"}</button>
        {isOpenSignUp? <SignUpForm/> : <SignInForm/>}
        </>
    )
}