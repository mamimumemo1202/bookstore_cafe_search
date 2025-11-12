import { useState } from "react"
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid"
import { ClipboardIcon } from "@heroicons/react/24/outline"

export function ShareButton(){
    const shareUrl = window.location.href
    const[copySuccess, setCopySuccess] = useState('')

    const copyToClipboard = async() => {
        try {
            await navigator.clipboard.writeText(shareUrl)
            setCopySuccess('success')
        } catch (error) {
            setCopySuccess('fail')
        }
    }

    const icon = copySuccess === 'success'
        ? <CheckCircleIcon className="h-6 w-6 text-success" />
        : <XCircleIcon className="h-6 w-6 text-error" />

    return(
    <>
        <div className="indicator">
        <span className={`indicator-item ${copySuccess? "": "hidden"}`}>
            {icon}
        </span>
        <button
        type="button"
        className="btn"
        onClick={(e) => {e.stopPropagation(); copyToClipboard()}}><ClipboardIcon className="h-6 w-6 text-gray-500"/></button>
        </div>
        
    </>
    )
}
