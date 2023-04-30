import React, {useState, useMemo} from 'react'
import { useBookShop } from "../../../../context/BoughtBooksContext"
import { useShowBorrowedBook } from '../../../../hooks/useBorrowedBooks';
import { useShowBoughtBooks, useAddBoughtBooks } from "../../../../hooks/useBoughtBooks"
import { v4 as uuidv4 } from 'uuid';
type StoreProps = {
    book: Object
}

type Object = {
    id: number,
    title: string
}


 export function BoughtItem({book} : StoreProps) {

    const { 
            // addToBuy,
            // quantity,
            // increaseCartQuantity, 
            decreaseCartQuantity, 
            removeFromCart,
            quantityObj
            // memoizedCount 
          } =  useBookShop();
  
  const { data,error } = useShowBorrowedBook();
  const { data: datawBoughtBook } = useShowBoughtBooks()
  const { mutate: AddBoughtBooks } = useAddBoughtBooks();


  const [addToBuy, setAddToBuy] = useState(0);
  const [quantity, setQuantity ] = useState(0);

  const [disabledBtnChangePrice, setDisabledBtnChangePrice] = useState(0)



    const increaseCartQuantity =  (bookId: number, bookTitle: string) => {

      // setCount(count+1)
  
      setAddToBuy(bookId)
      const addBookToBoughtBooks = data?.data.filter((idBook: any) => idBook.id === bookId)
      const indexObject = addBookToBoughtBooks.findIndex(((obj: any) => obj.id == bookId));
      let objectBookToBoughtBooks =  addBookToBoughtBooks[indexObject]   
  
      const newObjBoughtBooks =  {
        ...objectBookToBoughtBooks,
      }
  
      let indeXuuid = uuidv4()
      newObjBoughtBooks.id = indeXuuid
      
      const nrQuantity = datawBoughtBook?.data.filter((book: any) => book.title === bookTitle)
                                              .map((book: any) => book.id).length
    
      setQuantity(nrQuantity)
  
  
      AddBoughtBooks(newObjBoughtBooks)
  
      compareObjectByTitleBook(bookTitle, bookId);
  

    }

    const compareObjectByTitleBook = (bookTitle: string, bookId: number) => {

      const titleBoughtBook =  datawBoughtBook?.data.filter((e: any) => e.title === bookTitle)[0].title
      const dataBorrowBook =  data?.data.filter((e: any) => e.title === bookTitle)[0].title
                        
      if(titleBoughtBook == dataBorrowBook ){
           setDisabledBtnChangePrice(bookId)
      }else{
           setDisabledBtnChangePrice(0)
      }
    }



  return (
    <>
    <hr className="borrowBook__hr" />
    <div className="gallery__book-details">
       {addToBuy != book.id ? 
         (<button  className="gallery_btn-addToBuy" onClick={() => 
         increaseCartQuantity(book.id, book.title)}> 
            + Add to buy
         </button>
         ):(
            <> 
            <div className="gallery__buttons">
                <button  className="btn_minus"  onClick={()=> decreaseCartQuantity(book.title)}>-</button>
                 <span> {quantityObj} </span> in cart
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


