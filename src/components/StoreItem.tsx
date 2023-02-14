import React from 'react'
import { useBookShop } from "../context/StoreContext"

type StoreProps = {
    book: Object
}

type Object = {
    id: number,
    title: string
}


 function StoreItem({book} : StoreProps) {

    const { addToBuy,
            quantity,
            increaseCartQuantity, 
            decreaseCartQuantity, 
            removeFromCart 
          } =  useBookShop();
  

  return (
    <>
    <hr className="borrowBook__hr" />
    <div className="gallery__book-details">
       {addToBuy != book.id ? 
         (<button className="gallery_btn-addToBuy" onClick={() => increaseCartQuantity(book.id, book.title )}> 
            + Add to buy
         </button>
         ):(
            <> 
            <div className="gallery__buttons">
                <button  className="btn_minus"  onClick={()=> decreaseCartQuantity(book.title)}>-</button>
                 <span> {quantity} </span> in cart
                <button className="btn_plus" onClick={()=> increaseCartQuantity(book.id,book.title)}> + </button>
            </div>
            <div>
                <button className="btn_removeBoughtBook" onClick={() => removeFromCart(book.id, book.title)}>Remove</button>      
            </div>                     
            </>  
         )
        }
    </div>
    </>
  )
}

export default StoreItem
