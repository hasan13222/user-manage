import { createContext, useEffect, useState } from "react"
import axios from "axios";


export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);


    useEffect(() => {
        setLoading(true);
        axios({
            method: 'get',
            url: 'https://user-management-server-hazel.vercel.app/isLogin',
            withCredentials: true  
          })
        .then(res => {
            if(res.data?.success === false){
                setUser(null);
                setLoading(false);
            } else {
                setUser(res.data);
                setLoading(false);
            }
        })
    }, [])

    const contextValues = {
        user,
        loading,
        setUser, 
        setLoading
    }
  return (
    <AuthContext.Provider value={contextValues}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider