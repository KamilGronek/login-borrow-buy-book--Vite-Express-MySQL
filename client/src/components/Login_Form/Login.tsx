import React,{useState} from 'react'
import App from '../../App'
import { NavLink } from "react-router-dom";
import "../../styles/LoginForm.scss"
// import { useloginUser, useshowRegisterUsers} from "../../hooks/useDataFormUser";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from '../../utils/axios-utils';
import axios from 'axios';

export function LoginForm() {

  type LoginProps = {
    error: object
  }

  type UserLogin = {
    LoginUser: string,
}

  const [ loginUser, setLoginUser ] = useState("");
  const [ passwordUser,setPasswordUser ] = useState("")
  const [errorMessage, setErrorMessage] = useState('');

  
  //========================================================================
  const [ token, setToken ] = useState("")

  const login = async (userLogin: UserLogin) => {
      return axios.post('http://localhost:5000/login', userLogin)
  }
 
  const { mutate, error, isLoading, } = useMutation(login, {
          onSuccess: (data: any) => {
              setToken(data.data.accessToken)               
              console.log(data.data.accessToken)
          },
  });
  


   const showRegisterUser =  async () => { 

    if(!token) {
      return;
    }

    const getHeaders = () => {
      return {
        Authorization: `Bearer ${token}`,
      };
    };
  
    try {  
        const response = await request({url:'/register', headers: getHeaders()})
        return response;
    } catch (error) {
        console.log(error);
    }
  }
  
   const { data } =  useQuery('register', showRegisterUser)
         
  console.log(data)


  // const { data: users, isLoading: isUsersLoading } = useQuery('register',
  //   () => axios.get('http://localhost:4000/register', { headers }).then((res) => res.data),
  //   { enabled: !!token }
  // );

  // console.log(users)

  // =========================================================

  const handleLoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    const userLogin = {
      loginUser,
      passwordUser
    }
    mutate(userLogin)
  };


  const handleLogoutUser = () => {
    setToken('');
  };


  return (
    <div>
      {token ? (
        <>
          <h1>Users</h1>
          {isLoading ? (
            <p>Loading...</p>
          ) : ( ""
            // <ul>
            //   {data.map((user:any) => (
            //     <li key={user.id}>{user.name}</li>
            //   ))}
            // </ul>
          )}
          <button onClick={handleLogoutUser}>Logout</button>
        </>
      ) : (
        <>
          <h1>Login</h1>
          {error && <p>Failed to login.</p>}
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
     </>
      )}
    </div>
  )
}

