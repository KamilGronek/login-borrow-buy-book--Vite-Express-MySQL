// import React from 'react';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useShowBorrowedBook, 
         useAddBoughtBooks,
         useShowBoughtBooks,
         useDeleteBoughtBook,
         useDeleteBoughtBooks
} from '../hooks/useDataBooks';
import { v4 as uuidv4 } from 'uuid';

type StoreBookProviderProps = {
  children: ReactNode
}

type StoreContext = {
  buyBook: number,
  setAddToBuy: void,
  quantity: number,
  increaseCartQuantity: (bookId: number, bookTitle: string) => void,
  decreaseCartQuantity: (bookTitle: string) => void,
  removeFromCart: (bookId: number, bookTitle: string) => void,
  getQuantityByBookTitle: (bookTitle: string) => number,
  totalAmount: () => number,
  nrQuantity: number,
  getQuantity: (nrQuantity: number) => number,
  bookTitle: string,
  countBoughtBooks: number
}




const StoreBookContext = createContext({} as StoreContext);

export function useBookShop() {
    return useContext(StoreBookContext);
}

export function StoreBooklProvider({children} : StoreBookProviderProps){

    const [buyBook, setAddToBuy] = useState(0);
    const [quantity, setQuantity ] = useState(0);
    // const [countBoughtBooks, setCountBoughtBooks ] 
    const { data } = useShowBorrowedBook();
    const { data: datawBoughtBook } = useShowBoughtBooks()
    const { mutate: AddBoughtBooks } = useAddBoughtBooks();
    const { mutate: deleteBook } = useDeleteBoughtBook();
    const { mutate: deleteBooks } = useDeleteBoughtBooks();

    const [numberInLine, setNumberInLine] = useState(0)




    const  increaseCartQuantity = (bookId: number, bookTitle: string) => {
    
      setAddToBuy(bookId)
 
      const addBookToBoughtBooks = data?.data.filter((idBook: any) => idBook.id === bookId)

      const indexObject = addBookToBoughtBooks.findIndex(((obj: any) => obj.id == bookId));
      let objectBookToBoughtBooks =  addBookToBoughtBooks[indexObject]   

      setNumberInLine(numberInLine+1)

      const newObjBoughtBooks =  {
        ...objectBookToBoughtBooks,
        //  "numberInLine": numberInLine
      }
      console.log(newObjBoughtBooks)

      let indeXuuid = uuidv4()
      newObjBoughtBooks.id = indeXuuid
      
      const nrQuantity = datawBoughtBook?.data.filter((book: any) => book.title === bookTitle)
                                                .map((book: any) => book.id).length
      setQuantity(nrQuantity)

      
      AddBoughtBooks(newObjBoughtBooks)

      // let countBoughtBooks = datawBoughtBook?.data.length

  }

  
  

  const decreaseCartQuantity = (bookTitle: string) => {
    const deleteFirstBookByTitle =  datawBoughtBook?.data.filter((book: any) => book.title === bookTitle)
                                                          .map((book:any) => book.id)[0]

    const nrQuantity = datawBoughtBook?.data.filter((book: any) => book.title === bookTitle)
                                                .map((book: any) => book.id).length
      setQuantity(nrQuantity)

    if(quantity == 0){
      setAddToBuy(!bookId)
    }

      deleteBook(deleteFirstBookByTitle) 
  }




  const removeFromCart = (bookId: number, bookTitle: string) => {
    setAddToBuy(!bookId)

     const showBoughtBooks =  datawBoughtBook?.data.filter((book: any) => book.title === bookTitle);
     const idsToDelete = showBoughtBooks.map((book: any) => book.id)
    
    for( let i = 0; i<idsToDelete.length; i++){
      deleteBooks(idsToDelete[i])
    }
  }




  const getQuantityByBookTitle = (bookTitle: string) => {
    return( 
          datawBoughtBook?.data.filter((e: any) => e.title === bookTitle)
                               .map((e: any) => e.id).length
    );
 }




 const totalAmount = () => {
  return(
        datawBoughtBook?.data.map((book: any) => book.price)
                              .reduce((acc: any, curr: any) => acc + curr).toFixed(2)
  );
}



console.log(quantity);
     return(
        <StoreBookContext.Provider
          value={{
              buyBook,
              quantity,
              increaseCartQuantity,
              decreaseCartQuantity,
              removeFromCart,
              getQuantityByBookTitle,
              totalAmount,
          }}>
            {children}
        </StoreBookContext.Provider>
     )

}