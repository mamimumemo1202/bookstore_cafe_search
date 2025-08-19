import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function ConfirmedPage(){
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
        navigate("/")  
        }, 2000) 

        return () => clearTimeout(timer)
    }, [navigate])

    return (
        <>
        <div>認証が完了しました。</div>
        <div><a href="/auth" className="underline text-blue-300">こちら</a>からログインしてください。</div>
        </>
    )
}