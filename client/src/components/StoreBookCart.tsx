// import React from 'react'
import { useBookShop } from "../context/StoreContext"
import "../styles/StoreBookCart.scss"
import { useShowBoughtBooks, useDeleteBoughtBook } from '../hooks/useDataBoughtBooks';



type ShoppingCartProps = {
    isOpen: boolean
}

export function StoreBookCart({isOpen}: ShoppingCartProps) {



  const { data, isFetching } = useShowBoughtBooks();

  const {openCart, getQuantityByBookTitle, totalAmount, quantityObj} = useBookShop()
  
  const { mutate: deleteBook } = useDeleteBoughtBook()


  const deleteBoughtBook = (bookId: any) => {
      deleteBook(bookId)
      if(quantityObj-1 === 0){
        openCart()
    }
  }   



  const uniqueBooks = data?.data.reduce((acc:any , curr: any) => {
      if (!acc.find((item:any) => item.title === curr.title)) {
           acc.push(curr);
      }
      return acc;
  }, []);


  const style = {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      background:"black",
      opacity: 0.7,
      zIndex: 10
  }



  return (
    <>
    {isFetching && <div>Loading...</div>}
    {isOpen ?
     (
      <div className="storeBookCart">
          <div className="storeBookCart__nav">
              <h3>Cart</h3>
              <p className="closeCart" onClick={openCart}>X</p>
          </div>
           {data?.data.length > 0 ?(
            <section className="storeBookCart__content"> 
                {uniqueBooks.map((book: any) => (
                    <div key={book.id} className="storeBookCart_place">
                        {/* <span className="gallery__bookId"></span> */} 
                        <img src ={book.cover.small}  alt="" />
                       <div className="storeBookCart_details">
                          <h4>{book.title}</h4>
                          {getQuantityByBookTitle(book.title) > 1 ?
                            (
                              <p>{getQuantityByBookTitle(book.title)}x</p>
                            ):(
                                ""
                            )
                          }
                          {book.price}$
                       </div>
                        <h3>{(book.price * getQuantityByBookTitle(book.title)).toFixed(2)}$</h3>
                       <button className="storeBookCart_remove" onClick={() => deleteBoughtBook(book.id)}> 
                          X
                       </button>
                    </div>
                ))}
                <h3 className="totalAmonut">Total: {totalAmount()}$ </h3>
            </section>
            ):(
              <p className="gallery-info">All books are returned</p>
            )}
      </div>
     ):(
      ""
     )}
       <div style={isOpen ? style : null }></div>
    </>
    
  )
}

