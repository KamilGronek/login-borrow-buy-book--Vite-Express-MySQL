import { createContext, ReactNode, useContext, useState } from "react";
import { useFetchLibrary, useDeleteItemSelect, useBorrowBook} from '../hooks/useDataLibraryBooks';
import { DataItem } from "../types/types"

type BorrowOrBuyProviderProps = {
    children: ReactNode
  }

type BorrowOrBuyBookContext = {
    handleChooseTitle: (e: any) => void
    handleBorrowBook: (e: any) => void
    checked: boolean
    setChecked: (e: any) => void,
    actualDate: string,
    setActualDate: (e: any) => void,
    inputValue: string,
    disabledBtn: boolean,
    minDate: string,
    maxDate: number,
    getMaxDate: string,
    data: DataItem
}


const BorrowOrBuyContext = createContext({} as BorrowOrBuyBookContext);

export function useBorrowOrBuyBook() {
    return useContext(BorrowOrBuyContext);
}

export function BorrowOrBuyProvider({children} : BorrowOrBuyProviderProps){


    type MenuDetailsProps = {
        data: object,
        error: object
      }
    
    
      const [checked, setChecked] = useState(false);
      const [actualDate, setActualDate] = useState("");
      const [inputValue, setInputValue] = useState("");
      const [disabledBtn, setDisabledBtn] = useState(true);

    const onSuccess = (data: MenuDetailsProps) => { 
        console.log('Perform side effect after data fetching', data);
      }
    
      const onError = (error: MenuDetailsProps) => {
        console.log('Perform side effect after encountering error', error);
      }
    
      const { isLoading ,data, isError, error, isFetching, refetch } = useFetchLibrary(onSuccess,onError)
    
      const { mutate: deleteItem } = useDeleteItemSelect()
      const { mutate: addBook } = useBorrowBook(); // Create - 201
      
    
     if (isLoading){
      return <h2>Loading...</h2>
     }
    
     if (isError) {
      return <h2>{error.message}</h2>
     }

     let  minDate = new Date().toISOString().slice(0, 10);
     let  maxDate = minDate.slice(0, 4) * 1 + 1;
     let  getMaxDate = maxDate + "-12-31";



    const handleChooseTitle = (e:any) => {
        setInputValue(e.target.value)
  
        console.log(e.target.value)
  
        if(e.target.value == "Borrow / buy a book:"){
          setDisabledBtn(true);
        }else{
          setDisabledBtn(false);
        }
      }

    const addBookTobBorrowedBooks = data?.data.filter((bookTitle: any) => bookTitle.title  === inputValue)
    const id = addBookTobBorrowedBooks.map((bookId: any) => (bookId.id));


    const handleBorrowBook = (e: React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault()
        // console.log(  e.preventDefault())
      
        addBook(addBookTobBorrowedBooks[0])
        deleteItem(id[0])
        refetch();

          if(!inputValue){
            return
          }
          setChecked(false)

          data?.data.forEach((book: any) => {
          if(checked){
              book.important = true 
          }
          else{
            book.important = false 
          }

          if(actualDate){
            book.date = actualDate
          }
          else{
            book.date = minDate
          }
        });
    }

     return(
        <BorrowOrBuyContext.Provider
          value={{
            handleChooseTitle,
            handleBorrowBook,
            checked,
            setChecked,
            actualDate, 
            setActualDate,
            inputValue,
            disabledBtn,
            minDate,
            maxDate,
            getMaxDate,
            data
          }}>
            {children}
        </BorrowOrBuyContext.Provider>
     )

}