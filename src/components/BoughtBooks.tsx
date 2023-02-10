import React, {useState}  from 'react'
import "../styles/SectionBooks.css";
import { useShowBoughtBooks, useDeleteBoughtBook } from '../hooks/useDataBooks';
import { useBookShop } from '../context/StoreContext'
  

export function BoughtBooks(){

    const { data } = useShowBoughtBooks();
    const { getQuantityByBookTitle, totalAmount } = useBookShop()
    
    const { mutate: deleteBook } = useDeleteBoughtBook()

    const deleteBoughtBook = (bookId: any) => {
        deleteBook(bookId)
    }   



    const uniqueBooks = data?.data.reduce((acc:any , curr: any) => {
        if (!acc.find((item:any) => item.title === curr.title)) {
             acc.push(curr);
        }
        return acc;
    }, []);


 
    return (
        <>
        {data?.data.length > 0 ?(
            <section className="gallery"> 
                {uniqueBooks.map((book: any) => (
                    <div key={book.id} className="gallery__book">
                        <span className="gallery__bookId"></span>
                        <img src ={book.cover.small}  alt="" />
                        <h3>{book.title}</h3>
                        <div className="gallery__book-details">
                            <h4>Price: {book.price}$ <span>{getQuantityByBookTitle(book.title)}x</span></h4>
                             <h3>{book.price * getQuantityByBookTitle(book.title)}$</h3>
                            <button onClick={() => deleteBoughtBook(book.id)}
                                className="confirm"> Remove Book
                            </button>
                        </div>
                    </div>
                ))}
               <h3>Total: {totalAmount()}$ </h3>
            </section>
      ):(<p className="gallery-info">All books are returned</p>)}
      </>
    )
}


