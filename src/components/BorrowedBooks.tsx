import React,{useState, useEffect} from 'react'
import Modal from 'react-modal'
import "../styles/SectionBooks.css";
import axios from 'axios';
import { useLibraryRental } from "../context/LibraryContext";
import BorrowedItem from "./BorrowedItem";
import {useAddBoughtBooks} from "../hooks/useDataBooks";
import { v4 as uuidv4 } from 'uuid';
import { useQuery, useMutation, useQueryClient } from "react-query"
import StoreItem from './StoreItem';

// import PictureModal from "./PictureModal"
// import { useShowBorrowedBook, 
//     useReturnedBook,
//     useReturnTheBorrowedBook, 
    
// } from '../hooks/useDataBooks';

// import { useBookShop } from "../context/StoreContext"




Modal.setAppElement('#root')


function BorrowedBooks() {
  
  const {data } =  useLibraryRental()

  const { mutate: AddBoughtBooks } = useAddBoughtBooks()

    // const { buyBook, increaseCartQuantity, removeFromCart } = useBookShop()
    const [ buyBook, setAddToBuy ] = useState(0);
    const [ quantity, setQuantity ] = useState(0);
    const [ orderNr, setOrderNr ] = useState(1);

    const  increaseCartQuantity = (bookId :any) => {
    
          setAddToBuy(bookId)
      // setQuantity(quantity+1)
    
          const addBookToBoughtBooks = data?.data.filter(idBook => idBook.id === bookId)
          const indexObject = addBookToBoughtBooks.findIndex((obj => obj.id == bookId));
          let objectBookToBoughtBooks =  addBookToBoughtBooks[indexObject]   
    
          const newObjBoughtBooks =  {
            ...objectBookToBoughtBooks
          }

          setOrderNr(orderNr+1)

          newObjBoughtBooks['orderNr'] = orderNr

          console.log(newObjBoughtBooks)

          let indeXuuid = uuidv4()
          newObjBoughtBooks.id = indeXuuid
      
        
          AddBoughtBooks(newObjBoughtBooks)
         
          // getId(bookId)
    }

    // const getId = (bookId) => {
    //   const checkId = data?.data.findIndex(Id => Id.id == bookId )
      
    //   console.log(checkId)

    //   if(checkId != orderNr){
    //     setOrderNr(orderNr+1)
    //    } 
    //   else{
        
    //   }
    // }     

    
    const decreaseCartQuantity = (bookId) =>{
      setQuantity(quantity-1)
    }


    const removeFromCart = (bookId) => {
      setAddToBuy(!bookId)
    }

    
  
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
                              (<button onClick={() => increaseCartQuantity(book.id)}> 
                                Add to buy
                                </button>
                              ):(
                              <> 
                              <button onClick={() => decreaseCartQuantity(book.id)}>-</button>
                               {quantity} in cart
                              <button onClick={()=> increaseCartQuantity(book.id)}> + </button>
                              <br></br>
                              <button onClick={() => removeFromCart(book.id)}>Remove</button>                           
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
