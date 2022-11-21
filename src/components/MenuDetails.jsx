import React,{useState} from 'react'
// import {useSelector,useDispatch} from "react-redux"
// import {borrowedBook,handleValueInput,handleCheckBox,handleChangeDate} from '../redux/actions/libraryActions'
import "../styles/AddBook.css"
import { useFetchLibrary, useBorrowBook } from '../hooks/useDataBooks';


export default function MenuDetails(){

//    const dispatch = useDispatch();

    // const allBooks = useSelector((state) => state.library.allBooks);
    // console.log(allBooks);
    // const inputValue = useSelector((state => state.inputValue.inputValue))
    // console.log(inputValue)
    // const actualDate =  useSelector(state => state.library.actualDate)

    const  [checked,setChecked] = useState(false);
    const  [actualDate, setActualDate] = useState("");
    const  [inputValue, setInputValue] = useState("");
    // const  [borrowedBooks, setBorrowedBooks] = useState([]);

    let  minDate = new Date().toISOString().slice(0, 10);
    let maxDate = minDate.slice(0, 4) * 1 + 1;
    let  getMaxDate = maxDate + "-12-31";


    const onSuccess = (data) => { 
        console.log('Perform side effect after data fetching', data);
      }
    
      const onError = () => {
        console.log('Perform side effect after encountering error', error);
      }

    const { isLoading, data, error} = useFetchLibrary(onSuccess,onError);

    const { mutate: addBook } = useBorrowBook();

    const addBookTobBorrowedBooks = data?.data.filter(bookTitle => bookTitle.title  === inputValue)
          console.log(addBookTobBorrowedBooks)

    const handleAddHeroClick=(e)=>{
        e.preventDefault()
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
        // borrowedBook(addBookTobBorrowedBooks)
        // setBorrowedBooks(addBookTobBorrowedBooks)
        console.log(addBookTobBorrowedBooks[0])
        addBook(addBookTobBorrowedBooks[0]);
    }

   

  
return(
    <nav className="menu">
        <form onSubmit={handleAddHeroClick} >
        <select
         value ={inputValue}
         onChange={(e) => setInputValue(e.target.value)}
         >
                 <option>Borrow a book:</option>  
                {data?.data.map((book) => (
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
