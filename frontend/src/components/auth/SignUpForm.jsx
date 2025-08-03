import { useState } from "react"
import { signUp } from "../../apis/auth"

export function SignUpForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const handleSubmit = async(e) => {
         e.preventDefault() 
        try {
            const res = signUp({email, password, passwordConfirmation})
            console.log("React側では成功", res.data)
        } catch (error) {
            console.error("React側で失敗", error)          
        }
    }

    return(
        <>
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