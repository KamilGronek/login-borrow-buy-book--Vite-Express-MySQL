import { createContext, ReactNode, useContext, useState } from "react";
import { useShowReturnedBooks, useConfirmReturmedBook,  } from "../hooks/useReturnedBooks"
import { useAddItemSelect  } from "../hooks/useBooks";
import { DataItem } from "../types/types";


type ReturnedBooksProps = {
  children: ReactNode
}


type ReturnedContext = {
    handleConfirmReturnedBook: (e: any) => void,
    data: any
    // sortReturneddBooks: any
}


const ReturnedBooksContext = createContext({} as ReturnedContext);

export function useReturnedBooks() {
    return useContext(ReturnedBooksContext);
}

export function ReturnedBooksProvider({children} : ReturnedBooksProps){

    const {data} = useShowReturnedBooks();
    const {mutate: returnBook} = useConfirmReturmedBook();

    const { mutate: addItem } = useAddItemSelect();

    // const sortReturneddBooks= data?.data.sort((prevId: any,nextId: any)=>{
    //     return prevId.id - nextId.id;
    // })


    const handleConfirmReturnedBook = (bookId: any) => {
        returnBook(bookId)

        const addItemSelect = data?.data.filter((idBook: any) => idBook.id === bookId)
        addItem(addItemSelect[0])
        
    }
 
  

     return(
        <ReturnedBooksContext.Provider
          value={{
            handleConfirmReturnedBook,
            data,
          }}>
            {children}
        </ReturnedBooksContext.Provider>
     )

}