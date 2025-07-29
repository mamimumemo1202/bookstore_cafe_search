import { useCallback, useState } from "react"

export function useLoading() {

    cosnt [isLoading, setIsLoading] = useState(false);
    const startLoading = useCallback(()=>setIsLoading(true),[])
    const stopLoading = useCallback(()=>setIsLoading(false),[])

    return {isLoading, startLoading, stopLoading}
}