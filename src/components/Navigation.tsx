import React  from 'react'
import "../styles/Navigation.css";
import { NavLink } from "react-router-dom";
import { useLibraryRental } from "../context/LibraryContext";
import { useBookShop } from "../context/StoreContext";
// import {useSelector} from "react-redux"

const Navigation = () => {

    const { quantity } = useBookShop()
    const { countBorrowBooks }  = useLibraryRental()

  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/">
             Borrowed books 
            <em>({countBorrowBooks})</em>
          </NavLink>
        </li>
        <li>
          <NavLink to="/returnedBooks">
            Returned books 
          {/* <em>({countReturnedBooks})</em> */}
          </NavLink>
        </li>
        <li>
          <NavLink to="/boughtBooks">
            Bought books 
            {/* <em>({countBoughtBooks})</em> */}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
