import "../../styles/Navigation.scss";
import { NavLink, Outlet } from "react-router-dom";
import { useBorrowedBooks } from "../../context/BorrowedBooksContext";
import { useBookShop } from "../../context/BoughtBooksContext";
// import {useSelector} from "react-redux"
export function Navigation() {


    const { data, returnedBooks }  = useBorrowedBooks()

    const countBorrowedBooks = data?.data.length
    const countReturnedBooks = returnedBooks?.data.length


  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/borrowedBooks">
             Borrowed books 
            <em>({countBorrowedBooks})</em>
          </NavLink>
        </li>
        <li>
          <NavLink to="/returnedBooks">
            Returned books 
          <em>({countReturnedBooks})</em>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};


