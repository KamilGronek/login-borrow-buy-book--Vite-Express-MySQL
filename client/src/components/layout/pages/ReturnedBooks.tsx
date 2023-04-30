import React  from 'react'
import "../../../styles/SectionBooks.scss";
import { useShowReturnedBooks, useConfirmReturmedBook,  } from "../../../hooks/useReturnedBooks"
import { useAddItemSelect  } from "../../../hooks/useBooks";
import { Header } from "../Header";
import { MenuBorrowDetails } from "../MenuBorrowDetails";
import { Navigation } from "../Navigation";
import { useReturnedBooks } from "../../../context/ReturnedBooksContext"

 export function ReturnedBooks() {
 
    // const {data} = useShowReturnedBooks();
    // const {mutate: returnBook} = useConfirmReturmedBook();

    // const { mutate: addItem } = useAddItemSelecst();

    // const sortReturneddBooks= data?.data.sort((prevId: any,nextId: any)=>{
    //     return prevId.id - nextId.id;
    // })


    // const handleConfirmReturnedBook = (bookId: any) => {
    //     returnBook(bookId)

    //     const addItemSelect = data?.data.filter((idBook: any) => idBook.id === bookId)
    //     addItem(addItemSelect[0])
        
    // }

    const { handleConfirmReturnedBook, data} = useReturnedBooks() 

    const sortReturneddBooks= data?.data.sort((prevId: any,nextId: any)=>{
        return prevId.id - nextId.id;
    })

    return (
        <>
        <div className="grid">
        <Header/>
         <MenuBorrowDetails/>
        {data?.data.length > 0 ?(
            <section className="gallery"> 
                {sortReturneddBooks.map((book: any) => (
                    <div key={book.id} className="gallery__book">
                    <span className="gallery__bookId">{book.id}</span>
                        <img src ={book.cover.small}  alt="" />
                        <h3>{book.title}</h3>
                        <hr className="gallery__hr" />
                        <h4>
                            <i>
                            <span className="gallery__book-author">By {book.author}</span>
                            </i>
                        </h4>
                        <div className="gallery__book-details">
                            <i>
                                    Release Date: {book.releaseDate}
                                <br />
                                    Pages: {book.pages}
                                <br />
                                <span>
                                    Links: <a href={book.link}>shop</a>
                                </span>
                            </i>
                            <br />
                            <p>
                                <em>(confirm returned book: {book.date})</em>
                            </p>
                            <button onClick={() => handleConfirmReturnedBook(book.id)}
                                className="gallery__confirmReturnedBook"> Confirm returned book
                            </button>
                        </div>
                    </div>
                ))}
            </section>
      ):(<p className="gallery-info">All books are returned</p>)}
       <Navigation/>
       </div>
      </>
    )
}


