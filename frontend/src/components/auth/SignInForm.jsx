
// TODO: エラーをRailsでハンドリングするようにする

import { useState } from "react";
import { signIn } from "../../apis/auth";
import { saveAuthInfo } from "../../apis/index";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../contexts/AuthContext';
import { validateToken } from '../../apis/auth'
import { EnvelopeIcon } from "@heroicons/react/24/outline";



export function SignInForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn, user, setUser} = useAuthContext();


    const handleSubmit = async(e) => {
        e.preventDefault() 
        try {
            const res = await signIn({email, password})          
            saveAuthInfo(res)

            const tokenRes = await validateToken()
            setUser(tokenRes.data.data)
            setIsLoggedIn(true)
            navigate('/')
        } catch (error) {
            if(error.response){
                const messages = error.response.data.errors
                setErrorMessage(messages)
            } else {
                setErrorMessage('Unexpected error occured')
            }       
        }
    }

    return(
        <>
        {errorMessage && 
        <div className="bg-red-200 text-red-800 p-2 rounded mb-2">{errorMessage}</div>}


        <form 
        className="flex flex-col"
        onSubmit={handleSubmit}>
            <input 
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="メールアドレス"
            className="my-2 mx-5 p-2 shadow-sm rounded-full"/>
            <input 
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder=" パスワード"
            className="my-2 mx-5 p-2 shadow-sm rounded-full"/>
            <button 
            className="mx-5 p-2 text-sm text-blue-500 hover:underline"
            onClick={ () => navigate('/password-reset')}>パスワードを忘れた方はこちら</button>
            <button 
            type="submit"
            className="my-10 mx-5 p-2 rounded-full bg-green-400">ログイン</button>
        </form>
        </>
    )
}