import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import {  useMutation } from "react-query";
import axios from 'axios';
import { request } from '../utils/axios-utils'
import { useNavigate  } from 'react-router-dom';
import { useLocalStorage } from "../hooks/useLocalStorge";
import  useAuth from '../hooks/useAuth';
// import { useLogout } from "../hooks/useDataFormUser";



type LoginProps = {
    children: ReactNode
}

type LoginUserContext = {
    loginUser: string,
    passwordUser: string,
    setLoginUser: (e: any) => void, 
    handleLoginUser: (e: any) => void,
    setPasswordUser: (e: any) => void,
    showInfoWarming: boolean,
    warningError: string,
    alertLogout: boolean,
    setAlertLogout: (e: any) => void,
}



const LoginContext = createContext({} as LoginUserContext);

export function useLogin() {
    return useContext(LoginContext);
}

export function LoginProvider({children} : LoginProps){


  const [ loginUser, setLoginUser ] = useLocalStorage("login" ,"");
  const [ passwordUser,setPasswordUser ] = useState("");
  const [ showInfoWarming, setShowInfoWarming ] = useState(false);
  const [ warningError, setWarningError ] = useState("")
  const [ alertLogout, setAlertLogout ] = useState(false);
  
  const { setAuth, setRefreshToken } :any = useAuth();

  const toNavigate = useNavigate();

  // const { data: logoutInfo } = useLogout();
  // console.log(logoutInfo)



    const login = async (userLogin: object) => {
      return axios.post('http://localhost:4000/login', userLogin)
    }
  

    const { mutate } = useMutation(login, {
            onSuccess: (data: any) => {   
                console.log(data?.data.accessToken)
                
                setAuth(data.data.accessToken)   
                setRefreshToken(data.data.refreshToken)               

             if(data.data.accessToken == undefined){
                return;
             }
 
             toNavigate("/borrowedBooks");
                
            },
            onError: (error:any) => {  
              console.log(error)   
              setWarningError(error.response.data.warning)
            }
    });
  

    

    const handleLoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const userLogin = {
        loginUser,
        passwordUser
      }

      await mutate(userLogin)
      setShowInfoWarming(true);
  };
  

  useEffect(() => {
      setInterval(() => {
        setShowInfoWarming(false)
      }, 10000);
  },[]);


     return(
        <LoginContext.Provider
          value={{
            handleLoginUser,
            loginUser,
            setLoginUser,
            passwordUser,
            setPasswordUser,
            showInfoWarming,
            warningError,
            alertLogout, 
            setAlertLogout
          }}>
            {children}
        </LoginContext.Provider>
     )
}

export default LoginContext;

