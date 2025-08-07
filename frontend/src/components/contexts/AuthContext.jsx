import { createContext, useContext, useEffect, useState } from "react";
import { validateToken } from '../../apis/auth'

const AuthContext = createContext(null);

export function AuthProvider({ children }){
    const [isLoggedIn, setIsLoggedIn] = useState(null)

    useEffect(()=>{
        const checkAuth = async() =>{
            try {
                await validateToken()
                setIsLoggedIn(true)
            } catch (error) {
                setIsLoggedIn(false)
                
            }
        };

        checkAuth()
    },[])

    return(
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}