// TODO: 

import { useState } from "react";
import { signUp } from "../../apis/auth";
import { saveAuthInfo } from "../../apis";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../contexts/AuthContext';


export function SignUpForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { isLoggedIn, setIsLoggedIn, user, setUser} = useAuthContext();


    const navigate = useNavigate();

// TODO: 6桁コード認証の実装
    const handleSubmit = async(e) => {
         e.preventDefault() 
        try {
            await signUp({email, password, passwordConfirmation})
            navigate('/')
        } catch (error) {
            console.error(error)
            if(error.response){
                const messages = error.response.data.errors.full_messages
                setErrorMessage(messages.join('\n'))
            } else {
                setErrorMessage("Unexpected error occured")
            }
        }
    }

    return(
        <>
        {errorMessage && 
        <div className="bg-red-200 text-red-800 p-2 rounded mb-2 whitespace-pre-wrap">{errorMessage}</div>}
        
        <form onSubmit={handleSubmit}
        className="flex flex-col">
            <input 
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="メールアドレス"
            className="my-2 mx-5 p-2 shadow-sm rounded-full" />
            <input 
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="パスワード"
            className="my-2 mx-5 p-2 shadow-sm rounded-full" />
            <input 
            type="password"
            value={passwordConfirmation}
            onChange={(e)=>setPasswordConfirmation(e.target.value)}
            placeholder="パスワード（確認）"
            className="my-2 mx-5 p-2 shadow-sm rounded-full" />
            <button 
            type="submit"
            className="my-6 mx-5 p-2 rounded-full bg-primary-600 text-white">登録</button>
        </form>
        </>
    )
}