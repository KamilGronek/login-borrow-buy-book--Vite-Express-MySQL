// import React from 'react';
import { createContext, ReactNode, useContext, useState } from "react";
import { useShowBorrowedBook, 
  useReturnedBook,
  useReturnTheBorrowedBook, 
  useShowReturnedBooks,
  useUpdateBorrowBook
} from '../hooks/useDataLibraryBooks';
import { DataItem } from "../types/types";


type LibraryProviderProps = {
  children: ReactNode
}


type LibraryContext = {
  getItemQuantity: (id: number) => number,
  setCountBorrowBooks: () => number,
  changePrice: number,
  priceValue: string,
  priceAlert: number,
  priceAlertSecond: number,
  editItemsBook: object,
  editPriceBookClick: (bookId: number, book: object) => void,
  changePriceOfBook: (e: any, id: number, bookPrice: number) => void,
  confirmEditBook: (e: any, bookId: number) => void,
  handleReturnedBook: (bookId: number) => void,
  data : DataItem,
  returnedBooks: DataItem,
  isLoading: boolean,
  isFetching: boolean,
  disabledBtnConfirm: boolean,
  countBorrowedBooks: number,
  countReturnedBooks: number
}



const LibraryRentalContext = createContext({} as LibraryContext);

export function useLibraryRental() {
    return useContext(LibraryRentalContext);
}

export function LibraryRentalProvider({children} : LibraryProviderProps){

    const [changePrice, setChangePrice] = useState(0);
    const [priceValue, setPriceValue] = useState("");
    const [priceAlert, setPriceAlert] = useState(0);
    const [priceAlertSecond, setPriceAlertSecond] = useState(0)
    const [editItemsBook, setEditItemsBook] = useState(
      {
        id: "",
        cover: {
            large: "",
            small: ""
        },
        price: "",
        title: "",
        author: "",
        releaseDate: "",
        pages: "",
        link: "",
        date: "",
        important: "",
        active: "",
        activeReturnedBook: "",
        finishDate: ""
      }
    );

  
    const { isLoading ,data, isError, error, isFetching, refetch } = useShowBorrowedBook();
    



    const { mutate: returnBook } = useReturnTheBorrowedBook();  // delete
    const { mutate: addReturnedBook } = useReturnedBook(); // Create - 201
    const { data: returnedBooks } = useShowReturnedBooks();
    const { mutate : updateBook } = useUpdateBorrowBook()

    
    const resetPriceAlert = () => {
      setPriceAlert(0)
      setPriceAlertSecond(0)
  }

//1.
    const editPriceBookClick = (bookId: number, book: any) => {
      setChangePrice(bookId);
      const itemsValues = 
          {
              id: book.id,
              cover: {
                  large: book.cover.large,
                  small: book.cover.small,
              },
              price: book.price,
              title: book.title,
              author: book.author,
              releaseDate: book.release,
              pages: book.pages,
              link: book.link,
              date: book.date,
              important: book.important,
              active: book.active,
              activeReturnedBook: book.activeReturnedBook,
              finishDate: book.finishDate
            }
            
      setEditItemsBook(itemsValues);

  }

  const [disabledBtnConfirm, setDisabledBtnConfirm] = useState(false);


  const max = 20
  const min = 10
  const mathRandom = Math.random() * (max - min) + min

  console.log(mathRandom)

 2//.
  const changePriceOfBook = (e: any, id: number, bookPrice: number) => {

    setPriceValue(e.target.value);

   if(e.target.value >= bookPrice){
       setPriceAlert(id);
       setDisabledBtnConfirm(true)
   } else {
       resetPriceAlert();
       setDisabledBtnConfirm(false)
   }

  //  if(e.target.value <= mathRandom){
  //     setPriceAlertSecond(id)
  //     setDisabledBtnConfirm(true)
  //  }else {
  //     resetPriceAlert();
  //     setDisabledBtnConfirm(false)
  //  }


  //  setPriceValue(e.target.value); == ?

    let newItemsValues = {...editItemsBook, price: parseInt(e.target.value)}
    setEditItemsBook(newItemsValues)


}

//3. 
const confirmEditBook = (e: any, bookId: any) => {

  updateBook(editItemsBook);
  refetch();
  setChangePrice(!bookId);
}


const handleReturnedBook = (bookId :any) => { //delete

  returnBook(bookId);
  const addBookTobReturnedBooks = data?.data.filter((idBook:any)  => idBook.id === bookId)
  addReturnedBook(addBookTobReturnedBooks[0])
  refetch;
} 

// let countBorrowedBooks = data?.data.length
// let countReturnedBooks = returnedBooks?.data.length

     return(
        <LibraryRentalContext.Provider
          value={{
              changePrice,
              editItemsBook,
              editPriceBookClick,
              changePriceOfBook,
              confirmEditBook,
              priceValue,
              priceAlert,
              priceAlertSecond,
              handleReturnedBook,
              data,
              isFetching,
              returnedBooks,
              isLoading,
              disabledBtnConfirm,
              // countBorrowedBooks,
              // countReturnedBooks
          }}>
            {children}
        </LibraryRentalContext.Provider>
     )

}