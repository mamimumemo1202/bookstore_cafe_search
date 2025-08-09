import { createContext, useContext, useEffect, useState } from "react";
import { validateToken } from '../../apis/auth'

const AuthContext = createContext(null);

export function AuthProvider({ children }){
    const [isLoggedIn, setIsLoggedIn] = useState(null)
    const [user, setUser] = useState(null);

    useEffect(()=>{
        const checkAuth = async() =>{
            try {
                const res = await validateToken()
                console.log(res.data)
                setIsLoggedIn(true)
                setUser(res.data.data)
            } catch (error) {
                setIsLoggedIn(false)
                setUser(null)
                
            }
        };

        checkAuth()
    },[])

    return(
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);
