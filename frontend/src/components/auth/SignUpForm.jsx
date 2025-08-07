// TODO: 

import { useState } from "react"
import { signUp } from "../../apis/auth"
import { saveAuthInfo } from "../../apis";
import { useNavigate } from "react-router-dom";

export function SignUpForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async(e) => {
         e.preventDefault() 
        try {
            const res = await signUp({email, password, passwordConfirmation})
            console.log("React側では成功", res.data)
            saveAuthInfo(res)
            navigate('/')
        } catch (error) {
            console.error("React側で失敗", error)
            if(error.response){
                const messages = error.response.data.errors.full_messages
                setErrorMessage(messages.join(' / '))
            } else {
                setErrorMessage("Unexpected error occured")
            }
        }
    }

    return(
        <>
        {errorMessage && 
        <div className="bg-red-200 text-red-800 p-2 rounded mb-2">{errorMessage}</div>}
        <form onSubmit={handleSubmit}>
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
            <input 
            type="password"
            value={passwordConfirmation}
            onChange={(e)=>setPasswordConfirmation(e.target.value)}
            placeholder="パスワード（確認）" />
            <button type="submit">登録</button>
        </form>
        </>
    )
}