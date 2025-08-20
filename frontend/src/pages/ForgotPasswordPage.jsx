import { requestPasswordReset } from "../apis/auth"
import { useState } from "react";

export function ForgotPasswordPage(){
    const [email, setEmail] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const {notice, setNotice} = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault(); 
        if(!email) return;
        
        setSubmitting(true)
        try {
            await requestPasswordReset({ email })
            setNotice("送信しました。届かない場合はメールアドレスをご確認ください。")
        } catch (error) {
            setNotice("送信しました。届かない場合はメールアドレスをご確認ください。")
        } finally {
            setSubmitting(false)
        }}

    return(
        <>
        <div>リセットするアカウントのメールアドレスを入力してください。</div>
        {notice && 
        <div className="bg-green-200 text-green-800 p-2 rounded mb-2">{notice}</div>}

        <form
        onSubmit={handleSubmit}
        className="flex flex-col">
            <input
            type='email'
            name="email"
            value={email}
            required
            placeholder="メールアドレス"
            onChange={(e) => setEmail(e.target.value)}
            className="my-2 mx-5 p-2 shadow-sm rounded-full"/>

            <button
            type="submit"
            className="my-10 mx-5 p-2 rounded-full bg-green-400"
            disabled={submitting}>送信</button>
        </form>
        </>
    )
}