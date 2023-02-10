// import React from 'react'
// import { createContext, ReactNode, useContext, useState } from "react";
// import {useAddBoughtBooks} from "../hooks/useDataBooks"
// import { useLibraryRental } from "./LibraryContext";

// import { v4 as uuidv4 } from 'uuid';

// type StoreProviderProps = {
//   children: ReactNode
// }


// type StoreContext = {
//   // buyBook: number,
//   // quantity: number,
//   // increaseCartQuantity: (bookId: number) => void,
//   // removeFromCart: (bookId: number) => void,
// } 



// const StoreShopContext = createContext({} as StoreContext);

// export function useBookShop(){
//     return useContext(StoreShopContext);
// }

// export const StoreContextProvider = ({ children }: StoreProviderProps) => {


//     // const [buyBook, setAddToBuy] = useState(4);
//     // const [ quantity, setQuantity ] = useState(0);

//     // const {data } =  useLibraryRental()

//     const { mutate: AddBoughtBooks } = useAddBoughtBooks();


//   //   const  increaseCartQuantity = (bookId: any) => {
    
//   //     setAddToBuy(bookId)
//   //     setQuantity(quantity+1)

//   //     const addBookToBoughtBooks = data?.data.filter(idBook => idBook.id === bookId)
//   //     const indexObject = addBookToBoughtBooks.findIndex((obj => obj.id == bookId));
//   //     let objectBookToBoughtBooks =  addBookToBoughtBooks[indexObject]   

//   //     const newObjBoughtBooks =  {
//   //       ...objectBookToBoughtBooks
//   //     }

//   //     let indeXuuid = uuidv4()
//   //     newObjBoughtBooks.id = indeXuuid
  
//   //     AddBoughtBooks(newObjBoughtBooks)
//   // }
    
//  const removeFromCart = (bookId) => {
//       setAddToBuy(!bookId)
//     }



//   return (
//     <StoreShopContext.Provider 
//     value={{
//             // buyBook,
//             // quantity,
//             // increaseCartQuantity,
//             removeFromCart
//           }}>
//         {children}
//     </StoreShopContext.Provider>
//   )
// }
