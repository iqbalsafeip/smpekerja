import { useEffect, useState } from "react"

export const useMounted = () => {
    const [mounted, setMounted] = useState<boolean>()
    // effects run only client-side
    // so we can detect when the component is hydrated/mounted
    // @see https://react.dev/reference/react/useEffect
    useEffect(() => {
        if(typeof window !== undefined){
            setMounted(true)
        }
    }, [])
    return mounted
}