import React,{useState} from 'react'
import { useLibraryRental } from "../../context/LibraryContext";
import { useBookShop } from "../../context/StoreContext";
import PictureModal from "../PictureModal";


function BorrowedItem({book}:any) {

    const { 
            changePrice, 
            editPriceBookClick, 
            changePriceOfBook, 
            priceValue,
            priceAlert, 
            priceAlertSecond,
            confirmEditBook,
            handleReturnedBook,
            disabledBtnConfirm
           } = useLibraryRental()
    
    const { 
            disabledBtnChangePrice
           } = useBookShop()       



        const [modalIsOpen, setModalIsOpen] = useState(false);

        const styleGiveBackDate = {
            color: "red",
          };

          const styleBtnConfirm = {
            opacity: 0.6,
            cursor: "not-allowed",
            pointerEvents: "none"
        }

        
        const openModal = () => {
            setModalIsOpen(!modalIsOpen)
        }

    return (
     <>
        <img className="gallery__img" src ={book.cover.small} alt="" 
          onClick={openModal}/>
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
                <p>
                    <em style={book.important ? styleGiveBackDate : null}>(give back to: {book.date})</em>
                </p>
            </i>
            <div className="gallery_btn">
                {changePrice != book.id ? (
                    <button 
                        style={disabledBtnChangePrice ? styleBtnConfirm : null}
                        title="Negotiate your price !" 
                        onClick={() => editPriceBookClick(book.id,book)}> 
                        Change the price: {book.price} $
                    </button>
                    ) : (
                <>
                    <input type="number" 
                        value={priceValue} 
                        name={book.id}
                        placeholder={book.price} 
                        onChange={(e) => changePriceOfBook(e, book.id, book.price)}
                    />
                    <button style={disabledBtnConfirm ? styleBtnConfirm : null}
                         onClick={(e) => confirmEditBook(e, book.id)} >Confirm the pice
                    </button>
                </>
                )}                             
                <br/>
                {priceAlert == book.id ?(
                    <a>You can't set the price higher than the main one</a>
                ):(
                ""
                )}
                {priceAlertSecond == book.id ?(
                    <a>Too much cheap</a>
                ):(
                ""
                )}
                <button className="gallery__btn-details" onClick={() => handleReturnedBook(book.id)}>Give back a book</button>
            </div>
        </div>   
        <PictureModal {...book} modalIsOpen={modalIsOpen} openModal={openModal}/>    
     </>
  )
}

export default BorrowedItem