import { NavLink } from "react-router-dom";
import "../../../styles/LoginForm.scss"

export const NoMatchPage = () => {
  return (
    <div className="container-noFound">
      <h2>Sorry, page not found.</h2>
      <label>Please login here:</label>
      <br/>
      <NavLink to="/login">
              <button>Login</button>
      </NavLink>
    </div>
  )
}

