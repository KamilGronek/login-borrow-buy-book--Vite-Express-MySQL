import { createContext, ReactNode, useContext, useState } from "react";
import { useFetchLibrary, useDeleteItemSelect} from "../hooks/useBooks";
import { useBorrowBook } from "../hooks/useBorrowedBooks";
import { DataItem } from "../types/types"

type MenuBorrowDetailsProviderProps = {
    children: ReactNode
  }

type MenuBorrowBookDetailsContext = {
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
    data: DataItem,
    error: object
    message: string
}


const MenuBorrowDetailsContext = createContext({} as MenuBorrowBookDetailsContext);

export function useMenuBorrowDetails() {
    return useContext(MenuBorrowDetailsContext);
}

export function MenuBorrowDetailsProvider({children} : MenuBorrowDetailsProviderProps){

      const [checked, setChecked] = useState(false);
      const [actualDate, setActualDate] = useState("");
      const [inputValue, setInputValue] = useState("");
      const [disabledBtn, setDisabledBtn] = useState(true);
    
      const { isLoading ,data, isError, error} = useFetchLibrary()
      const { mutate: deleteItem } = useDeleteItemSelect()

      
      const { mutate: addBook } = useBorrowBook(); // Create - 201
      
    
     if (isLoading){
      return <h2>Loading...</h2>
     }
    
     if (isError) {
      return <h2>{error?.message}</h2>
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

      //=================================================================================

    const addBookTobBorrowedBooks = data?.data.filter((bookTitle: any) => bookTitle.title  === inputValue)
    const id = addBookTobBorrowedBooks?.map((bookId: any) => (bookId.id));


    const handleBorrowBook = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        addBook(addBookTobBorrowedBooks[0])
        deleteItem(id[0])

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
        <MenuBorrowDetailsContext.Provider
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
        </MenuBorrowDetailsContext.Provider>
     )

}