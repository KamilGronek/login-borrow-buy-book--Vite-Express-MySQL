
import "../../styles/AddBook.scss"
import { useMenuBorrowDetails } from "../../context/MenuBorrowDetailsContext"

export const MenuBorrowDetails =()=> {

  const {  
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
    } = useMenuBorrowDetails()



  const style = {
    opacity: 0.6,
    cursor: "not-allowed",
    pointerEvents: "none"
  }


  const sortFetchedLibrary = data?.data.sort((prevId: any, nextId: any)=>{
    return prevId.id - nextId.id;
  })

  
return(
    <nav className="menu">
        <form onSubmit = {(e:any) =>handleBorrowBook(e)}>
        <select
         value ={inputValue}
         onChange={(e:any) => handleChooseTitle(e)}
         >
          <option>Borrow / buy a book:</option>  
            {sortFetchedLibrary.map((book: any) => (
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
                <button style={disabledBtn ? style : null}>BORROW</button>
            </div>
        </form>
    </nav>
    )
}
