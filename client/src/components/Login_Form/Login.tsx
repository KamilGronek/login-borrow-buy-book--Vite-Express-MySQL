import React,{useState} from 'react'
import App from '../../App'
import { NavLink } from "react-router-dom";
import "../../styles/LoginForm.scss"
import { useloginUser} from "../../hooks/useDataFormUser";

export function LoginForm() {

  type LoginProps = {
    error: object
  }

  const [ loginUser, setLoginUser ] = useState("");
  const [ passwordUser,setPasswordUser ] = useState("")
  const [errorMessage, setErrorMessage] = useState('');

 

  const { mutate, error, isLoading } = useloginUser()
  //   {
  //   onError: (error: Error) => {
  //     setErrorMessage(error.message)
  //   }
  //  }
  // );  
   
  
  
  console.log(isLoading)

  // if (isError) {
  //    console.log(error)
  //  }

  const handleLoginUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    const userLogin = {
      loginUser,
      passwordUser
    }
    mutate(userLogin)
  };


  return (
    <form action="/register" onSubmit={handleLoginUser}>
      <div className="container">
      <img className="logo_background" src="react-icon.png" alt=""/>
      <h2 className="login-title">React's library & shop/ <span className="loginSpan">Login</span></h2>
        <div className="input-group success">
          <label><b>Login</b></label>
          <input type="text" 
            placeholder="Enter Login" required
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
           <hr className="span-login"/>
          <button type="submit">Login</button>
          {/* {errorMessage && <div>{errorMessage}</div>} */}
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

