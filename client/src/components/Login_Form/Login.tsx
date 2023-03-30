import React,{useEffect, useState} from 'react'
import { NavLink } from "react-router-dom";
import "../../styles/LoginForm.scss"
import { useLogin } from "../../context/LoginContext"
import { useMutation } from "react-query";
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useNavigate  } from 'react-router-dom';
import { useLogout } from "../../hooks/useDataFormUser";

type UserLogin = {
  LoginUser: string,
}


export function Login() {

  const {loginUser,setLoginUser} = useLogin()
  const [ passwordUser,setPasswordUser ] = useState("");
    

    const [ show, setShow ] = useState(false);
    const [ warningError, setWarningError] = useState("")
    const [ showLogoutInfo , setShowLogoutInfo ] = useState(false) 
    const navigateTo = useNavigate();
    const {  setAuth, setRefreshToken } :any = useAuth();
    const { data: logoutInfo } = useLogout();
    console.log(logoutInfo)

    const login = async (userLogin: UserLogin) => {
      return axios.post('http://localhost:5000/login', userLogin)
    }
  
    const { mutate,isError ,error, isLoading, data, } = useMutation(login, {
            onSuccess: (data: any) => {   
                console.log(data?.data.accessToken)
                
                setAuth(data.data.accessToken)   
                
                setRefreshToken(data.data.refreshToken)               

             if(data.data.accessToken == undefined){
                return;
             }
 
              navigateTo("/borrowedBooks");
                
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

      await  mutate(userLogin)
       setShow(true);
  };
  

  useEffect(() => {
      setInterval(() => {
      setShow(false)
      }, 10000);
  },[]);



  return (
    <form action="/login" method="POST" onSubmit={handleLoginUser}>
      <div className="container">
      <img className="logo_background" src="react-icon.png" alt=""/>
      <h2 className="login-title">React's library & shop/ <span className="loginSpan">Login</span></h2>
        <div className="input-group success">
          <label><b>E-mail</b></label>
          <input type="email" 
            placeholder="Enter E-mail" required
            name="loginUser"
            value ={loginUser}
            onChange = {(e) => setLoginUser(e.target.value)}
          />
        </div>
        <div className="input-group error">
          <label><b>Password</b></label>
          <input type="password" 
            placeholder="Enter Password" required
            name="passwordUser"
            value ={passwordUser}
            onChange = {(e) => setPasswordUser(e.target.value)}
          />
           <>
            {show ? (
              <span style={{color: "red"}}> {warningError} </span>
            ):(
              <hr className="span-login"/>
            ) }
            </>
            {showLogoutInfo ? (
              <span style={{color: "green"}}> {logoutInfo?.data.info} </span>
              ):(
              "")}
          
          <button type="submit">Login</button>

          <label>
          <input type="checkbox" name="remember"/> 
            Remember me
          </label>
        </div>
        <NavLink className="navLink" to="/register">Register</NavLink>
      </div>
     </form>
  )
}

