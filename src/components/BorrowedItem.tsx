import React from 'react'
import { useLibraryRental } from "../context/LibraryContext";



function BorrowedItem({book}) {

    const {changePrice, editPriceBookClick, changePriceOfBook, priceValue,
        priceAlert, priceAlertSecond,confirmEditBook,handleReturnedBook } =  useLibraryRental()

    return (
     <>
        <img className="gallery__img" src ={book.cover.small} alt="" />
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

                {changePrice != book.id ? (
                    <button  title="Negotiate your price !" onClick={() => editPriceBookClick(book.id,book)}> 
                        Change the price: {book.price} $
                    </button>
                    ) : (
                <>
                    <input type="number" 
                    value={priceValue} 
                    placeholder={book.price} 
                    onChange={(e) => changePriceOfBook(e, book.id, book.price)}
                    />
                    <button onClick={() => confirmEditBook(book.id)} >Confirm the pice</button>
                </>
                )}                             
                <br/>
                {priceAlert == book.id ?(
                    <a>You can't set the price higher than the main one</a>): (
                ""
                )}
                {priceAlertSecond == book.id ?(
                    <a>Too much cheap</a>
                ) :(
                ""
                )}
                </i>
            <br/>
                <p>
                    {/* <em style={book.important ? style : null}>(give back to: {book.date})</em> */}
                </p>
            <button onClick={() => handleReturnedBook(book.id)}>Give back a book</button>
            <br/>
        </div>       
     </>
  )
}

export default BorrowedItem