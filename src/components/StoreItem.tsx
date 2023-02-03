// import React, {useState} from 'react'
// // import { useBookShop } from "../context/StoreContext"
// import { useLibraryRental } from "../context/LibraryContext";
// import {useAddBoughtBooks } from "../hooks/useDataBooks";
// import { v4 as uuidv4 } from 'uuid';

// type StoreProps = {
//     book: Object,
//     // buyBook: number,
// }

// type Object = {
//     id: number
// }






//  function StoreItem({book} : StoreProps) {

//     const {data } =  useLibraryRental()
//     const { mutate: AddBoughtBooks } = useAddBoughtBooks()
  
//     // const { buyBook,addToBuy,removeFromCart } = useBookShop()

//     const [ buyBook, setAddToBuy ] = useState(0);
//     const [ quantity, setQuantity ] = useState(0);
//     const [ orderNr, setOrderNr ] = useState(1);


//     const  increaseCartQuantity = (bookId :any) => {
    
//         setAddToBuy(bookId)
//     // setQuantity(quantity+1)
  
//         const addBookToBoughtBooks = data?.data.filter(idBook => idBook.id === bookId)
//         const indexObject = addBookToBoughtBooks.findIndex((obj => obj.id == bookId));
//         let objectBookToBoughtBooks =  addBookToBoughtBooks[indexObject]   
  
//         const newObjBoughtBooks =  {
//           ...objectBookToBoughtBooks
//         }

//         setOrderNr(orderNr+1)

//         newObjBoughtBooks['orderNr'] = orderNr

//         console.log(newObjBoughtBooks)

//         let indeXuuid = uuidv4()
//         newObjBoughtBooks.id = indeXuuid
    
      
//         AddBoughtBooks(newObjBoughtBooks)
       
//         // getId(bookId)
//   }

//   const decreaseCartQuantity = (bookId :any) =>{
//     setQuantity(quantity-1)
//   }


//   const removeFromCart = (bookId :any) => {
//     setAddToBuy(!bookId)
//   }
    

//   return (
//     {buyBook !=  book.id ? 
//         (<button onClick={() => increaseCartQuantity(book.id)}> 
//           Add to buy
//           </button>
//         ):(
//         <> 
//             <button onClick={() => decreaseCartQuantity(book.id)}>-</button>
//             {quantity} in cart
//             <button onClick={()=> increaseCartQuantity(book.id)}> + </button>
//             <br></br>
//             <button onClick={() => removeFromCart(book.id)}>Remove</button>                           
//         </>  
//       )}
//   )
// }

// export default StoreItem

//  // {buyBook != book.id ?(
//         // <button onClick={() => addToBuy(book.id)}> 
//     //         Add to buy
//     //     </button>
//     //    ):(
//     //    <> 
//     //    <button>-</button>
//     //      <p>in cart</p>
//     //    <button> + </button>
//     //    <br></br>
//     //    <button onClick={() => removeFromCart(book.id)}>Remove</button>                                              
//     //    </>  
//     //  )
//     // }