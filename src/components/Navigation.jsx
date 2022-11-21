import React  from 'react'
import "../styles/Navigation.css";
import { NavLink } from "react-router-dom";
// import {useSelector} from "react-redux"

const Navigation = () => {

//  const countBorrowBooks = useSelector((state)=> state.library.countBorrowBooks)
//  const countReturnedBooks = useSelector((state)=> state.library.countReturnedBooks)

  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/">
            Borrowed books 
            {/* <em>({countBorrowBooks})</em> */}
          </NavLink>
        </li>
        <li>
          <NavLink to="/returnedBooks">Returned books 
          {/* <em>({countReturnedBooks})</em> */}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
