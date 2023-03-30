import React from 'react'
import "../styles/SectionBooks.scss";
import { useLibraryRental } from "../context/LibraryContext";
import BorrowedItem from "./Items/BorrowedItem";
import StoreItem from "./Items/StoreItem";
import { Header } from "./Header";
import { MenuBorrowDetails } from "./MenuBorrowDetails";
import { Navigation } from "./Navigation";


export function BorrowedBooks() {
  
    const {data } =  useLibraryRental()


    const sortBorrowedBooks = data?.data.sort((prevId,nextId)=>{
        return prevId.id - nextId.id;
    })

    return (
        <div className="grid">
         <Header/>
         <MenuBorrowDetails/>
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
         <Navigation/>
      </div>
    )
}


