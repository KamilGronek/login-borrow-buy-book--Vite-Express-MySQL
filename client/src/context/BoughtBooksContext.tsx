import React, {lazy, Suspense} from 'react';
import { createContext, ReactNode, useContext, useState, useCallback,useMemo } from "react";
import { useShowBorrowedBook, } from '../hooks/useBorrowedBooks';
import {useAddBoughtBooks,
        useShowBoughtBooks,
        useDecreaseBoughtBook,
        useDeleteBoughtBooks
      } from "../hooks/useBoughtBooks"
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from "../hooks/useLocalStorge";

const StoreBookCart = lazy(() => 
  import("../components/layout/pages/StoreBookCart").then(module => {
    return {default: module.StoreBookCart }
  })
)


type BoughtBooksProviderProps = {
  children: ReactNode
}

type StoreContext = {
  openCart: () => void
  addToBuy: number,
  quantity: number,
  increaseCartQuantity: (bookId: number, bookTitle: string) => void,
  decreaseCartQuantity: (bookTitle: string) => void,
  removeFromCart: (bookId: number, bookTitle: string) => void,
  getQuantityByBookTitle: (bookTitle: string) => number,
  totalAmount: () => number,
  quantityObj: number,
  disabledBtnChangePrice: number,
  nrQuantity: number,
  deleteBoughtBook: (bookId: number) => void,
}


const BoughtBooksContext = createContext({} as StoreContext);

export function useBookShop() {
    return useContext(BoughtBooksContext);
}

export function BoughtBooksProvider({children} : BoughtBooksProviderProps){

  const [addToBuy, setAddToBuy] = useState(0);
  const [quantity, setQuantity ] = useState(0);

  // const [count, setCount ] = useLocalStorage("count",0)

  // const memoizedCount = useMemo(() => {
  //   return count;
  // }, [count]);


  // const [newQuantity, newSetQuantity ] = useLocalStorage("quantity","");

  const { data,error } = useShowBorrowedBook();
  const { data: datawBoughtBook } = useShowBoughtBooks()
  const { mutate: AddBoughtBooks } = useAddBoughtBooks();
  const { mutate: decreaseBook } = useDecreaseBoughtBook();
  const { mutate: deleteBooks } = useDeleteBoughtBooks();
  const { mutate: deleteBook } = useDecreaseBoughtBook()

  const [isOpen, setIsOpen] = useState(false);
  const [disabledBtnChangePrice, setDisabledBtnChangePrice] = useState(0)

  const openCart = () => setIsOpen(!isOpen);



  console.log(error)


  // const increaseCartQuantity =  (bookId: number, bookTitle: string) => {

  //   // setCount(count+1)

  //   setAddToBuy(bookId)
  //   const addBookToBoughtBooks = data?.data.filter((idBook: any) => idBook.id === bookId)
  //   const indexObject = addBookToBoughtBooks.findIndex(((obj: any) => obj.id == bookId));
  //   let objectBookToBoughtBooks =  addBookToBoughtBooks[indexObject]   

  //   const newObjBoughtBooks =  {
  //     ...objectBookToBoughtBooks,
  //   }

  //   let indeXuuid = uuidv4()
  //   newObjBoughtBooks.id = indeXuuid
    
  //   const nrQuantity = datawBoughtBook?.data.filter((book: any) => book.title === bookTitle)
  //                                           .map((book: any) => book.id).length
  
  //   setQuantity(nrQuantity)


  //   AddBoughtBooks(newObjBoughtBooks)

  //   compareObjectByTitleBook(bookTitle, bookId);
  
  // }




  const compareObjectByTitleBook = (bookTitle: string, bookId: number) => {

    const titleBoughtBook =  datawBoughtBook?.data.filter((e: any) => e.title === bookTitle)[0].title
    const dataBorrowBook =  data?.data.filter((e: any) => e.title === bookTitle)[0].title
                      
    if(titleBoughtBook == dataBorrowBook ){
         setDisabledBtnChangePrice(bookId)
    }else{
         setDisabledBtnChangePrice(0)
    }
  }

  

  const decreaseCartQuantity = (bookTitle: string) => {

    // setCount(count-1)

      const deleteFirstBookByTitle =  datawBoughtBook?.data.filter((book: any) => book.title === bookTitle)
                                                            .map((book:any) => book.id)[0]
      const nrQuantity = datawBoughtBook?.data.filter((book: any) => book.title === bookTitle)
                                              .map((book: any) => book.id).length
      setQuantity(nrQuantity)

      if(quantity === 0){
        setAddToBuy(!bookId)
      }
        decreaseBook(deleteFirstBookByTitle) 
  }

  //=================================================

  const removeFromCart = (bookId: number, bookTitle: string) => {
    setAddToBuy(!bookId)

     const showBoughtBooks =  datawBoughtBook?.data.filter((book: any) => book.title === bookTitle);
     const idsToDelete = showBoughtBooks.map((book: any) => book.id)
    
    for( let i = 0; i<idsToDelete.length; i++){
      deleteBooks(idsToDelete[i])
    }
  }


  //==================================================

  const getQuantityByBookTitle = (bookTitle: string) => {
    return( 
          datawBoughtBook?.data.filter((e: any) => e.title === bookTitle)
                               .map((e: any) => e.id).length
    );
  }

  const deleteBoughtBook = (bookId: number) => {
    deleteBook(bookId)
    if(quantityObj-1 === 0){
      openCart()
    }
  }   

  const totalAmount = () => {
    return(
        datawBoughtBook?.data.map((book: any) => book.price)
                              .reduce((total: any, item: any) => total + item)
                              .toFixed(2)
    );
  }

let quantityObj = datawBoughtBook?.data.length

console.log(quantity);
     return(
        <BoughtBooksContext.Provider
          value={{
              openCart,
              addToBuy,
              quantity,
              // increaseCartQuantity,
              decreaseCartQuantity,
              removeFromCart,
              getQuantityByBookTitle,
              totalAmount,
              quantityObj,
              disabledBtnChangePrice,
              deleteBoughtBook
          }}>
            {children}

        {isOpen &&
          <Suspense fallback={<h1>Loading...</h1>}>
             <StoreBookCart isOpen={isOpen}/>
          </Suspense>
        }
        </BoughtBooksContext.Provider>
     )
}