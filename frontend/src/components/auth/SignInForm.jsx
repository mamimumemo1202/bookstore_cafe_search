import { useState } from "react";
import { signIn } from "../../apis/auth";
import { saveAuthInfo } from "../../apis/index";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../contexts/AuthContext';
import { validateToken } from '../../apis/auth'



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
            console.error("React側で失敗", error)
            if(error.response){
                const messages = error.response.data.errors.full_messages
                setErrorMessage(messages.join(' / '))
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
        className="flex flex-col p-3"
        onSubmit={handleSubmit}>
            <input 
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="メールアドレス" />
            <input 
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder="パスワード" />
            <button 
            type="submit"
            className="">ログイン</button>
        </form>
        </>
    )
}