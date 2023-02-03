import React from 'react';
import { createContext, ReactNode, useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query"
import { updateBorrowBook } from "../hooks/useDataBooks"
import { useShowBorrowedBook, 
  useReturnedBook,
  useReturnTheBorrowedBook, 
  // updateBorrowBook,
  // useUpdateBorrowBook,
  // useFetchLibrary
} from '../hooks/useDataBooks';

type LibraryProviderProps = {
  children: ReactNode
}


type LibraryContext = {
  countBorrowBooks: number,
  setCountBorrowBooks: () => number,
  changePrice: number,
  priceValue: string,
  priceAlert: number,
  priceAlertSecond: number,
  editItemsBook: object,
  editPriceBookClick: (bookId: number, book: object) =>void,
  changePriceOfBook: (e:any, id: number, bookPrice: number) => void,
  confirmEditBook: (bookId: number) => void,
  handleReturnedBook: (bookId: number) => void,
  data : DataItem
}

type DataItem = {
  data : DataArray[]
}

type DataArray = {
  id: number,
  cover:Cover,
  price: number,
  title: "",
  author: string,
  releaseDate: number
  pages: string,
  link: string
}

type Cover =  {
  large: string,
  small: string
}

const LibraryRentalContext = createContext({} as LibraryContext);

export function useLibraryRental(){
    return useContext(LibraryRentalContext);
}

export function LibraryRentalProvider({children} : LibraryProviderProps){

    // const [countBorrowBooks, setCountBorrowBooks] = useState(0);
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
    console.log(data)


    const { mutate: returnBook } = useReturnTheBorrowedBook();  // delete
    const { mutate: addReturnedBook } = useReturnedBook(); // Create - 201




    const queryClient = useQueryClient()

    const updateMutation = useMutation(updateBorrowBook, {
        onSuccess: data => {
                queryClient.setQueryData('returnedBooks',data.data.id, (prev: any) =>{
                    return {
                        ...prev,
                        price: data.data.price,
                        body: data.body
                    }
                   
                })
        }
      })


    
    const resetPriceAlert = () => {
      setPriceAlert(0)
      setPriceAlertSecond(0)
  }


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
      // console.log(itemsValues)
  }

  const changePriceOfBook = (e: any, id: number, bookPrice: number) => {

    setPriceValue(e.target.value);
     console.log(e.target.value)
   if(e.target.value >= bookPrice){
       setPriceAlert(id);
   } else {
       resetPriceAlert();
   }

    let newItemsValues = {...editItemsBook, price: parseInt(e.target.value)}
    setEditItemsBook(newItemsValues)

    console.log(newItemsValues)


   // if(e.target.value < mathRandom){
   //     setPriceAlert(id)
   // }else {
   //     resetPriceAlert();
   // }

   // setPriceValue(e.target.value);
}


const confirmEditBook = (bookId) => {
  updateMutation.mutate(editItemsBook)
  console.log(editItemsBook)
    // refetch();
  setChangePrice(!bookId);

}


const handleReturnedBook = (bookId) => { //delete

  returnBook(bookId);
  const addBookTobReturnedBooks = data?.data.filter(idBook => idBook.id === bookId)
  addReturnedBook(addBookTobReturnedBooks[0])
  refetch;
} 


     return(
        <LibraryRentalContext.Provider
          value={{
              // countBorrowBooks,
              // setCountBorrowBooks,
              changePrice,
              editItemsBook,
              editPriceBookClick,
              changePriceOfBook,
              priceValue,
              priceAlert,
              priceAlertSecond,
              confirmEditBook,
              handleReturnedBook,
              data
          }}>
            {children}
        </LibraryRentalContext.Provider>
     )

}