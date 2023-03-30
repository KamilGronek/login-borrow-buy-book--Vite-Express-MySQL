import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useRegisterUser} from "../hooks/useDataFormUser";
import {  useMutation } from "react-query";
import axios from 'axios';
import { request } from '../utils/axios-utils'
import { useNavigate  } from 'react-router-dom';
import { useLocalStorage } from "../hooks/useLocalStorge";

type LoginProps = {
    children: ReactNode
}

type LoginUserContext = {
    loginUser: string,
    setLoginUser: (e: any) => void,
}



const LoginContext = createContext({} as LoginUserContext);

export function useLogin() {
    return useContext(LoginContext);
}

export function LoginProvider({children} : LoginProps){

    const [ loginUser, setLoginUser ] = useLocalStorage("login" ,"");
  

     return(
        <LoginContext.Provider
          value={{
            loginUser,
            setLoginUser,
          }}>
            {children}
        </LoginContext.Provider>
     )

}

export default LoginContext;

