
import React, { createContext, useContext, useState } from 'react';
import { useLocalStorage } from "../hooks/useLocalStorge";


export const AuthContext = createContext(
  { 
    auth: "" , setAuth: () => {},
    refreshToken: "" , setRefreshToken: () => {}, 
    accessToken: "", setAccessToken: () => {}
});

export const AuthProvider = ({ children }:any) => {
    const [auth, setAuth] = useLocalStorage("token","")
    const [refreshToken, setRefreshToken] = useState("")
    const [accessToken, setAccessToken] = useState("")

    console.log("auth:", auth)
    console.log("refreshToken:", refreshToken)
    console.log("accessToken:", accessToken)

  return(
     <AuthContext.Provider 
       value={{ 
         auth, 
         setAuth,
         refreshToken,
         setRefreshToken,
         accessToken,
         setAccessToken
       }}>
        {children}
    </AuthContext.Provider>
  )
};

// export const useAuth = () => {
//     return  useContext(AuthContext);
// };