import React from 'react'
import "../styles/SectionBooks.css";
import { useLibraryRental } from "../context/LibraryContext";
import BorrowedItem from "./Items/BorrowedItem";
import StoreItem from "./Items/StoreItem";


export function BorrowedBooks() {
  
  const {data,isFetching } =  useLibraryRental()


  // if (isLoading){
  //    <h2>Loading...</h2>
  // }

    const sortBorrowedBooks= data?.data.sort((prevId,nextId)=>{
        return prevId.id - nextId.id;
    })

    return (
        <>
        {/* {isFetching && <div>Loading</div>} */}
        {data?.data.length > 0 ? (
          <section className="gallery"> 
            {sortBorrowedBooks.map(book => (
            <div data-testid="borrowedBook-1" key={book.id} className="gallery__book">
              <span className="gallery__bookId">{book.id}</span>
              <BorrowedItem book = {book}/>
              <StoreItem book = {book}/>
            </div>
            ))}
          </section> 
         ):(<p className="gallery-info">No borrowed books </p>
         )
        }
        </>
    )
}


