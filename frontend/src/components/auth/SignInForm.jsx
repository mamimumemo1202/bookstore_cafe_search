import { useState } from "react";
import { signIp } from "../../apis/auth";

export function SignInForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async(e) => {
         e.preventDefault() 
        try {
            const res = signIp({email, password})
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
            <button type="submit">ログイン</button>
        </form>
        </>
    )
}