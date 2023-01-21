
import React,{useState,useEffect} from 'react'
import "../styles/AddBook.css"
import { useFetchLibrary, useBorrowBook} from '../hooks/useDataBooks';
import { useLibraryRental } from "../context/LibraryContext";


export const  MenuDetails=()=>{

  const { countBorrowBooks,setCountBorrowBooks }  = useLibraryRental()

  const  [checked,setChecked] = useState(false);
  const  [actualDate, setActualDate] = useState("");
  const  [inputValue, setInputValue] = useState("");
 
  const onSuccess = (data) => { 
    console.log('Perform side effect after data fetching', data);
  }

  const onError = (error) => {
    console.log('Perform side effect after encountering error', error);
  }

  const { isLoading ,data, isError, error, isFetching, refetch } = useFetchLibrary(onSuccess,onError)

  const { mutate: addBook } = useBorrowBook(); // Create - 201
  

 if (isLoading){
  return <h2>Loading...</h2>
 }

 if (isError) {
  return <h2>{error.message}</h2>
 }

 const addBookTobBorrowedBooks = data.data.filter(bookTitle => bookTitle.title  === inputValue)


    let  minDate = new Date().toISOString().slice(0, 10);
    let maxDate = minDate.slice(0, 4) * 1 + 1;
    let  getMaxDate = maxDate + "-12-31";

    const handleBorrowBook = () => {
      
      console.log(addBookTobBorrowedBooks[0])
      addBook(addBookTobBorrowedBooks[0]);
        // refetch

        if(!inputValue){
            return
          }
          setChecked(false)

          data?.data.forEach(book =>{
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
        
        setCountBorrowBooks(countBorrowBooks+1)
    }

   

  
return(
    <nav className="menu">
        <form onSubmit= {handleBorrowBook}>
        <select
         value ={inputValue}
         onChange={(e) => setInputValue(e.target.value)}
         >
                 <option>Borrow a book:</option>  
                {data.data.map((book) => (
                <option key={book.id} value={book.title} >
                    {book.title}
                </option>
                ))}
        </select>
        <div>
        <input
            type="checkbox"
            checked={checked}
            onChange ={(e)=>setChecked(e.target.checked)}
        />
        <label>Priority</label>
        </div>
        <br />
        <br />
        <label htmlFor="date"> Time to give back a book: </label>
        <input
            type="date"
            value={actualDate}
            min={minDate}
            max={ getMaxDate }
            onChange ={(e)=>(setActualDate(e.target.value))}
        />
        <br />
        <hr className="menu__hr" />
            <div className="menu__button__centerize">
                <button>BORROW</button>
            </div>
        </form>
    </nav>
    )
}
