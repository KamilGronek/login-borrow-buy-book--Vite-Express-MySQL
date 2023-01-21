import React,{useState} from 'react'
import Modal from 'react-modal'
import "../styles/SectionBooks.css";
// import { useQuery, useMutation, useQueryClient } from "react-query"

// import {useSelector,useDispatch} from "react-redux"
// import {returnedBook,openModal} from '../redux/actions/libraryActions'
import PictureModal from "./PictureModal"
import { useShowBorrowedBook, 
    useReturnedBook,
    useReturnTheBorrowedBook, 
    // useUpdateBook
    useBorrowBook,
    updateBorrowBook
} from '../hooks/useDataBooks';
import { useLibraryRental } from "../context/LibraryContext";
import { useRef } from 'react';



Modal.setAppElement('#root')



function BorrowedBooks() {
  
    const [changePrice, setChangePrice] = useState(0);
    const [editBook, setEditBook] = useState(
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

    // const [mutate] = useMutation(updateBorrowBook);

      console.log(updateBorrowBook)
    
    const [priceValue, setPriceValue] = useState("")
    
    const [priceAlert, setPriceAlert] = useState(0)
    // const  priceRef = useRef()

    // const { giveBackABook,returnedBooks }  = useLibraryRental();
    // console.log(returnedBooks)

    const { isLoading ,data,isError, error, isFetching, refetch } = useShowBorrowedBook();


    // if (isLoading){
    //     return <h2>Loading...</h2>
    //    }
      
    //    if (isError) {
    //     return <h2>{error.message}</h2>
    //    }

    const resetPriceAlert = () => {
        setPriceAlert(0)
    }


    const { mutate: returnBook } = useReturnTheBorrowedBook();  // delete
    const { mutate: addReturnedBook } = useReturnedBook(); // Create - 201
  

    // const {mutate: updateBook } = useUpdateBook();

     
  

    const handleReturnedBook = (bookId) => { //delete
        returnBook(bookId);
        const addBookTobReturnedBooks = data?.data.filter(idBook => idBook.id === bookId)
        addReturnedBook(addBookTobReturnedBooks[0])
        refetch;
    } 


   

    const handleEditBook = (id) => {
        // console.log(mutate)

        setChangePrice(id);
    }

    const handleChangePrice = (e, id, bookPrice) => {
        if(e.target.value >= bookPrice){
            setPriceAlert(id);
        } else {
            resetPriceAlert();
        }

        setPriceValue(e.target.value);
    }
    

    const style = {
        color: "red",
      };

    

    const sortBorrowedBooks= data?.data.sort((prevId,nextId)=>{
        return prevId.id - nextId.id;
    })

    return (
        <>
        {data?.data.length >0 ? (
        <section className="gallery"> 
        {sortBorrowedBooks.map(book => (
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
                                <br />

                              {changePrice != book.id ? 
                                (<button  title="Negotiate your price !" onClick={() => setChangePrice(book.id)}> 
                                     Price: {book.price} $
                                 </button>
                                 ) : (
                                <>
                                 <input type="number" 
                                    value={priceValue} 
                                    placeholder={book.price} 
                                    onChange={(e) => handleChangePrice(e, book.id, book.price)}
                                    />
                                 <button onClick={() => handleEditBook(book.id)} >Confirm the pice</button>
                                </>
                                )}                             
                               <br/>
                               {priceAlert == book.id  ? 
                               ( <a>You can't set the price higher than the main one</a>): (
                                ""
                               )}
                               
                            </i>
                            <br />
                                <p>
                                  {/* <em style={book.important ? style : null}>(give back to: {book.date})</em> */}
                                </p>
                            <button onClick={() =>handleReturnedBook(book.id)}>Give back a book</button>
                            <br />
                            
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
