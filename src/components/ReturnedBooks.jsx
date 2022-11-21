import React  from 'react'
import "../styles/SectionBooks.css";
// import {useSelector,useDispatch} from "react-redux"
// import {confirmReturnedBook} from '../redux/actions/libraryActions'

function ReturnedBooks() {
    const dispatch = useDispatch();
    const returnedBooks = useSelector((state) => state.library.returnedBooks)

    const sortReturnedBooks= returnedBooks.sort((prevId,nextId)=>{
        return prevId.id - nextId.id;
    })

    return (
        returnedBooks.length > 0 ?(
                 <section className="gallery"> 
                {sortReturnedBooks.map(book => (
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
                            <button 
                                onClick={()=> dispatch(confirmReturnedBook(book))}
                                className="confirm"> Confirm returned book
                            </button>
                        </div>
                    </div>
                ))}
            </section>
      ):(<p className="gallery-info">All books are returned</p>)
    )
}

export default ReturnedBooks
