import React from 'react'
import "../../../styles/SectionBooks.scss";
import { useBorrowedBooks } from "../../../context/BorrowedBooksContext";
import { BorrowedItem } from "./Items/BorrowedItem";
import { BoughtItem } from "./Items/BoughtItem";
import { Header } from "../Header";
import { MenuBorrowDetails } from "../MenuBorrowDetails";
import { Navigation } from "../Navigation";
import { useShowBorrowedBook } from '../../../hooks/useBorrowedBooks';



export function BorrowedBooks() {
  
  // const { data } = useShowBorrowedBook()


    const {data} =  useBorrowedBooks()


    const sortBorrowedBooks = data?.data.sort((prevId:any,nextId:any)=>{
        return prevId.id - nextId.id;
    })

    return (
        <div className="grid">
         <Header/>
         <MenuBorrowDetails/>
            {data?.data.length > 0 ? (
              <section className="gallery"> 
                {sortBorrowedBooks.map((book:any) => (
                <div data-testid="borrowedBook-1" key={book.id} className="gallery__book">
                  <span className="gallery__bookId">{book.id}</span>
                  <BorrowedItem book = {book}/>
                  <BoughtItem book = {book}/>
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


