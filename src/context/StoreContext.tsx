import React from 'react'
import { createContext, ReactNode, useContext, useState } from "react";

type StoreProviderProps = {
  children: ReactNode
}



type StoreContext = {
  buyBook: number,
  increaseCartQuantity: (bookId: number) => void,
  removeFromCart: (bookId: number) => void,
} 



const StoreShopContext = createContext({} as StoreContext);

export function useBookShop(){
    return useContext(StoreShopContext);
}

export const StoreContextProvider = ({ children }: StoreProviderProps) => {


    const [buyBook, setAddToBuy] = useState(0);


    const increaseCartQuantity = (bookId) => {
      setAddToBuy(bookId)
    }
    
 const removeFromCart = (bookId) => {
      setAddToBuy(!bookId)
    }



  return (
    <StoreShopContext.Provider 
    value={{
            buyBook,
            increaseCartQuantity,
            removeFromCart
          }}>
        {children}
    </StoreShopContext.Provider>
  )
}
