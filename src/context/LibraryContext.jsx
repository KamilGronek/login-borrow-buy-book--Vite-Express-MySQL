import { useEffect } from "react";
import { createContext, useContext,useState } from "react";

const LibraryRentalContext = createContext();

export function useLibraryRental(){
    return useContext(LibraryRentalContext);
}

export function LibraryRentalProvider({children}){

    const [countBorrowBooks, setCountBorrowBooks] = useState(0);

     const giveBackABook = (book) => {
        console.log(book)
        setReturnedBooks(returnedBooks.push(book))
     }


     return(
        <LibraryRentalContext.Provider
          value={{
            countBorrowBooks,
            setCountBorrowBooks,
            giveBackABook
          }}>
            {children}
        </LibraryRentalContext.Provider>
     )

}