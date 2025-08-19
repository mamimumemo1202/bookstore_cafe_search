import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function ConfirmedPage(){
    const navigate = useNavigate()

    useEffect(() => {
        const timer = setTimeout(() => {
        navigate("/")  
        }, 5000) 

        return () => clearTimeout(timer)
    }, [navigate])

    return (
        <>
        <div>認証が完了しました。</div>
        <div>もし自動で遷移しない場合は<a href="/" className="underline text-blue-300">こちら</a>をクリックしてください。</div>
        </>
    )
}