import React  from 'react'
import "../styles/Navigation.scss";
import { NavLink } from "react-router-dom";
import { useLibraryRental } from "../context/LibraryContext";
import { useBookShop } from "../context/StoreContext";
// import {useSelector} from "react-redux"

export function Navigation() {


    const { data, returnedBooks }  = useLibraryRental()

    // const countBorrowedBooks = data?.data.length
    // const countReturnedBooks = returnedBooks?.data.length


  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/borrowedBooks">
             Borrowed books 
            {/* <em>({countBorrowedBooks})</em> */}
          </NavLink>
        </li>
        <li>
          <NavLink to="/returnedBooks">
            Returned books 
          {/* <em>({countReturnedBooks})</em> */}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};


