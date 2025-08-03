import { useState } from "react";
import { SignInForm } from "../components/auth/SignInForm";
import { SignUpForm } from "../components/auth/SignUpForm"


export function AuthPage(){
    const[isSignUp, setIsSignUp] = useState(false)
 

    return(
        <>
        <button 
        className=""
        onClick={()=>setIsSignUp(prev => !prev)}>{isSignUp? "ログインする" : "新規登録する"}</button>
        {isSignUp? <SignUpForm/> : <SignInForm/>}
        </>
    )
}