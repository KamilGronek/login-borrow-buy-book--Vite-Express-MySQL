import React, { createContext, useState } from 'react';
import { useLocalStorage } from "../hooks/useLocalStorge";
import type { SetStateAction } from 'react';


export const AuthContext = createContext(
  { 
    auth: "" , setAuth: (value: SetStateAction<string>) => {},
    refreshToken: "" , setRefreshToken: (value: SetStateAction<string>) => {}, 
    accessToken: "", setAccessToken: (value: SetStateAction<string>) => {},
  }
);

export const AuthProvider = ({ children }:any) => {
  const [auth, setAuth] = useLocalStorage("token","");
  const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");
  const [accessToken, setAccessToken] = useLocalStorage("accessToken", "");

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
        setAccessToken,
      }}>
      {children}
    </AuthContext.Provider>
  )
};