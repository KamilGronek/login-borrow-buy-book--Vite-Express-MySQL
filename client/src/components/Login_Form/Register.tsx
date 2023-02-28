import React, {useState} from 'react'
import App from '../../App'
import { NavLink } from "react-router-dom";
import "../../styles/LoginForm.css"
import { useRegisterUSer} from "../../hooks/useDataFormUser";

export function Register() {

    const { mutate } = useRegisterUSer();  
   
    const [ registerUser, setRegisterUser] = useState("");
    const [ passwordUser,setPasswordUser ] = useState("")
  

    const handleCreateUser = async (e:any) => {
      e.preventDefault();
      const userRegister = {
        registerUser,
        passwordUser
      }
     await mutate(userRegister)
    };

  return (
     <form action="/register" onSubmit={handleCreateUser}>
      <div className="container-register">
      <img className="logo_background" src="react-icon-02.png" alt=""/>
      <h2 className="login-title">React's library & shop/ <span className="registerSpan">Register</span></h2>
      <div className="input-group success">
        <label><b>Login</b></label>
         <input type="text" 
          placeholder="Enter Login" required
          name="registerUser"
          value ={registerUser}
          onChange = {(e) => setRegisterUser(e.target.value)}
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
          <hr className="span-register"/>
          <button type="submit">Register</button>
          <label>
          <input type="checkbox" name="remember"/> 
            Remember me
          </label>
        </div>
      <NavLink className="navLink-register" to="/login">Login</NavLink>
      </div>
     </form>
  )
}

