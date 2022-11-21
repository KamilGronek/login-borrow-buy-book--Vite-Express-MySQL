import React,{useState} from 'react'
import Modal from 'react-modal'
import "../styles/SectionBooks.css";
// import {useSelector,useDispatch} from "react-redux"
// import {returnedBook,openModal} from '../redux/actions/libraryActions'
import PictureModal from "./PictureModal"
import { useShowBorrowedBook } from '../hooks/useDataBooks';


Modal.setAppElement('#root')



function BorrowedBooks() {
    const  [borrowedBooks, setBorrowedBooks] = useState([]);

    // const dispatch = useDispatch();
    // const borrowedBooks = useSelector((state) => state.library.borrowedBooks)
    const { isLoading, data, error} = useShowBorrowedBook();

    console.log(data)


    const style = {
        color: "red",
      };

    const sortBorrowedBooks= borrowedBooks.sort((prevId,nextId)=>{
        return prevId.id - nextId.id;
    })

    return (
        <>
        {data?.data.length >0 ? (
        <section className="gallery"> 
        {data?.data.map(book => (
                    <div data-testid="borrowedBook-1" key={book.id} className="gallery__book">
                    <span className="gallery__bookId">{book.id}</span>
                        <img className="gallery__img" src ={book.cover.small}  alt="" 
                        // onClick={() => dispatch(openModal(true,book.id))}
                        />
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
                                  {/* <em style={book.important ? style : null}>(give back to: {book.date})</em> */}
                                </p>
                            {/* <button onClick={()=> dispatch(returnedBook(book))}>Give back a book</button> */}
                        </div>
                    </div>
                ))}
        </section> 
         ):( <p className="gallery-info">No borrowed books </p>)}
           {/* <PictureModal/> */}
         </>
    )
}

export default BorrowedBooks
