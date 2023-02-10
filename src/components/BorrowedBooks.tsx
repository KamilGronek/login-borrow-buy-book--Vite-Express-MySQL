import React,{useState, useEffect} from 'react'
import "../styles/SectionBooks.css";
import { useLibraryRental } from "../context/LibraryContext";
import BorrowedItem from "./BorrowedItem";


import { useBookShop } from "../context/StoreContext"


// Modal.setAppElement('#root')


function BorrowedBooks() {
  
  const {data, isLoading } =  useLibraryRental()

  const {buyBook, quantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } =  useBookShop();

  if (isLoading){
     <h2>Loading...</h2>
  }

    // const decreaseCartQuantity =() =>{
    //   console.log("elo")
    // }





        const max = 20
        const min = 10
        const mathRandom = Math.random() * (max - min) + min;


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
                          <BorrowedItem book = {book}/>
                          <div className="gallery__book-details">
                             {/* <StoreItem  book = {book}/> */}
                            {buyBook != book.id ? 
                              (<button onClick={() => increaseCartQuantity(book.id, book.title )}> 
                                Add to buy
                                </button>
                              ):(
                              <> 
                              <button onClick={()=> decreaseCartQuantity(book.title)}>-</button>
                              <span> {quantity} </span> in cart
                              <button onClick={()=> increaseCartQuantity(book.id,book.title)}> + </button>
                              <br></br>
                              <button onClick={() => removeFromCart(book.id, book.title)}>Remove</button>                           
                              </>  
                            )
                            }
                          
                            {/* {mathRandom} */}
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
