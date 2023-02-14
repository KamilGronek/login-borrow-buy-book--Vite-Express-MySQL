// import React from 'react';
import { createContext, ReactNode, useContext, useState } from "react";
import { useShowBorrowedBook, } from '../hooks/useDataLibraryBooks';
import {useAddBoughtBooks,
        useShowBoughtBooks,
        useDeleteBoughtBook,
        useDeleteBoughtBooks
      } from "../hooks/useDataBoughtBooks"
import { v4 as uuidv4 } from 'uuid';
import { StoreBookCart } from "../components/StoreBookCart";



type StoreBookProviderProps = {
  children: ReactNode
}

type StoreContext = {
  openCart: () => void
  addToBuy: number,
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
  quantityObj: number,
  disabledBtnChangePrice: boolean
}




const StoreBookContext = createContext({} as StoreContext);

export function useBookShop() {
    return useContext(StoreBookContext);
}

export function StoreBookProvider({children} : StoreBookProviderProps){

  const [addToBuy, setAddToBuy] = useState(0);
  const [quantity, setQuantity ] = useState(0);
  const { data } = useShowBorrowedBook();
  const { data: datawBoughtBook } = useShowBoughtBooks()
  const { mutate: AddBoughtBooks } = useAddBoughtBooks();
  const { mutate: deleteBook } = useDeleteBoughtBook();
  const { mutate: deleteBooks } = useDeleteBoughtBooks();

  const [isOpen, setIsOpen] = useState(false);
  const [disabledBtnChangePrice, setDisabledBtnChangePrice] = useState(false)

  const openCart = () => setIsOpen(!isOpen);

 
  
  const  increaseCartQuantity = (bookId: number, bookTitle: string) => {
  
    setAddToBuy(bookId)

    const addBookToBoughtBooks = data?.data.filter((idBook: any) => idBook.id === bookId)
    const indexObject = addBookToBoughtBooks.findIndex(((obj: any) => obj.id == bookId));
    let objectBookToBoughtBooks =  addBookToBoughtBooks[indexObject]   

    const newObjBoughtBooks =  {
      ...objectBookToBoughtBooks,
    }
    console.log(newObjBoughtBooks)

    let indeXuuid = uuidv4()
    newObjBoughtBooks.id = indeXuuid
    
    const nrQuantity = datawBoughtBook?.data.filter((book: any) => book.title === bookTitle)
                                              .map((book: any) => book.id).length
    setQuantity(nrQuantity)
    AddBoughtBooks(newObjBoughtBooks)

    // compareObjectByTitleBook(bookTitle, bookId);

  }

  // const compareObjectByTitleBook = (bookTitle: string, bookId:number) => {

  //   const dataBoughtBook =  datawBoughtBook?.data.filter((e: any) => e.title === bookTitle)
  //   const firstElement = dataBoughtBook.find(((obj: any) => obj.title == bookTitle));

  //   const dataBorrowBook =  data?.data.filter((e: any) => e.title === bookTitle)[0]
                            

  //   if(JSON.stringify(firstElement) === JSON.stringify(dataBorrowBook)){
  //        setDisabledBtnChangePrice(true)
  //   }else{
  //        setDisabledBtnChangePrice(false)
  //   }
  // }

  

  const decreaseCartQuantity = (bookTitle: string) => {
    const deleteFirstBookByTitle =  datawBoughtBook?.data.filter((book: any) => book.title === bookTitle)
                                                          .map((book:any) => book.id)[0]

    const nrQuantity = datawBoughtBook?.data.filter((book: any) => book.title === bookTitle)
                                             .map((book: any) => book.id).length
      setQuantity(nrQuantity)

    if(quantity === 0){
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






let quantityObj = datawBoughtBook?.data.length



console.log(quantity);
     return(
        <StoreBookContext.Provider
          value={{
              openCart,
              addToBuy,
              quantity,
              increaseCartQuantity,
              decreaseCartQuantity,
              removeFromCart,
              getQuantityByBookTitle,
              totalAmount,
              quantityObj,
              disabledBtnChangePrice
          }}>
            {children}
            <StoreBookCart isOpen={isOpen}/>
        </StoreBookContext.Provider>
     )

}