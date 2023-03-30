import { NavLink } from "react-router-dom";
import "../../styles/LoginForm.scss"
import { useRegister } from "../../context/RegisterContext"

export function Register() {

    const {registerUser, passwordUser, setRegisterUser, 
           setPasswordUser, showInfo, handleCreateUser, data } = useRegister()


  return (
     <form action="/register" method="POST" onSubmit={handleCreateUser}>
      <div className="container-register">
      <img className="logo_background" src="react-icon-02.png" alt=""/>
      <h2 className="login-title">React's library & shop/ <span className="registerSpan">Register</span></h2>
      <div className="input-group success">
        <label><b>E-mail</b></label>
         <input type="email" 
          placeholder="Enter E-mail" required
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
          <>
          {showInfo ? (
            <span> {data?.data} </span>
          ):(
            <hr className="span-register"/>
          )
          }
          </>
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

