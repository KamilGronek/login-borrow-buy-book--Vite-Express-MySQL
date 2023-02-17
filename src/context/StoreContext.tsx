// import React from 'react';
import { createContext, ReactNode, useContext, useState } from "react";
import { useShowBorrowedBook, } from '../hooks/useDataLibraryBooks';
import {useAddBoughtBooks,
        useShowBoughtBooks,
        useDeleteBoughtBook,
        useDeleteBoughtBooks
      } from "../hooks/useDataBoughtBooks"
import { v4 as uuidv4 } from 'uuid';
import { StoreBookCart } from "../components/StoreBookCart";



type StoreBookProviderProps = {
  children: ReactNode
}

type StoreContext = {
  openCart: () => void
  addToBuy: number,
  setAddToBuy: void,
  quantity: number,
  increaseCartQuantity: (bookId: number, bookTitle: string) => void,
  decreaseCartQuantity: (bookTitle: string) => void,
  removeFromCart: (bookId: number, bookTitle: string) => void,
  getQuantityByBookTitle: (bookTitle: string) => number,
  totalAmount: () => number,
  nrQuantity: number,
  getQuantity: (nrQuantity: number) => number,
  bookTitle: string,
  quantityObj: number,
  disabledBtnChangePrice: number
}




const StoreBookContext = createContext({} as StoreContext);

export function useBookShop() {
    return useContext(StoreBookContext);
}

export function StoreBookProvider({children} : StoreBookProviderProps){

  const [addToBuy, setAddToBuy] = useState(0);
  const [quantity, setQuantity ] = useState(0);
  const { data } = useShowBorrowedBook();
  const { data: datawBoughtBook } = useShowBoughtBooks()
  const { mutate: AddBoughtBooks } = useAddBoughtBooks();
  const { mutate: deleteBook } = useDeleteBoughtBook();
  const { mutate: deleteBooks } = useDeleteBoughtBooks();

  const [isOpen, setIsOpen] = useState(false);
  const [disabledBtnChangePrice, setDisabledBtnChangePrice] = useState(0)

  const openCart = () => setIsOpen(!isOpen);

//  1,1,2,3,5,8,13,21,34

//  const nrArray = [1,2,3,4,5,6,7,8,9,10];
    // nrArray.filter(el => el % 2 == 0).map(el => el * el) 

   //  let res = (n-1) + (n-2)
        //  console.log(i)

 
      
        
  //       let number = 9 
        
  //     const getOddNr =() => {

  //        const typArray = []

  //     for( let count = 1; count <= 10 ; count ++ ) {
  //       const product = number * count
  //          typArray.push(product)
          
  //      }
  //      const res = typArray.filter(el => el % 2 == 0)

  // }

  // 1,1,2,3,5,8
        //===============================================

  //         const array = []
  //         array[0] = 1

  // for( let count = 2; count <= 7 ; count ++ ) {

  //   // dla  3  [ position 4]

  //    let p = count -1;    // position 2
  //    let p2 = count -2    //  position 1


  //   let result = p + p2 
    
  //   array[p] + array[p+1]

  //   // console.log(rest)
  //  }


  // const nums = [3, 2, 4];
  //   const sums1 = [];
  //   const sums2 = [];

  //   for( let i = 0; i< nums.length; i +=2){
  //     const sum = nums[i] +( nums[i+1] || 0)
  //     sums1.push(sum) // [5,4]
  //   }
  //   console.log(sums1)

  //   for( let i = 1; i< nums.length; i +=2){
  //     const sum = nums[i] + nums[i+1]
  //     sums2.push(sum) // [6]
      
  //     const findIndexes = nums.findIndex(sum =>  sum == 6 )
  //     console.log(findIndexes)
  //   }
   
  //   console.log(sums2)



//     const nums = [2, 7, 11, 15];

//         const sumFirstTwo = nums.reduce((accumulator, currentElement, currentIndex) => {
          
//           if (currentIndex < 2) {
//             return accumulator + currentElement;
//           } else {
//             return accumulator;
//           }
//         }, 0);

// console.log(sumFirstTwo); // 9



const nums = [2, 7, 11, 15];
const tab = [];


  const getOddNr = (nums: any) => {

    for (let i = 0; i < nums.length; i++) {   
      for (let j = i+1; j < nums.length; j++) {
       const empty = nums[j]                           
        // tab.push(empty)
        console.log(empty)
      }
    }
   
  }





  const  increaseCartQuantity = (bookId: number, bookTitle: string) => {

       getOddNr(nums)
        


    setAddToBuy(bookId)

    const addBookToBoughtBooks = data?.data.filter((idBook: any) => idBook.id === bookId)
    const indexObject = addBookToBoughtBooks.findIndex(((obj: any) => obj.id == bookId));
    let objectBookToBoughtBooks =  addBookToBoughtBooks[indexObject]   

    const newObjBoughtBooks =  {
      ...objectBookToBoughtBooks,
    }
    // console.log(newObjBoughtBooks)

    let indeXuuid = uuidv4()
    newObjBoughtBooks.id = indeXuuid
    
    const nrQuantity = datawBoughtBook?.data.filter((book: any) => book.title === bookTitle)
                                              .map((book: any) => book.id).length
    setQuantity(nrQuantity)
    AddBoughtBooks(newObjBoughtBooks)

    compareObjectByTitleBook(bookTitle, bookId);

  
  }

  const compareObjectByTitleBook = (bookTitle: string, bookId:number) => {

    const titleBoughtBook =  datawBoughtBook?.data.filter((e: any) => e.title === bookTitle)[0].title
                                                   

    const dataBorrowBook =  data?.data.filter((e: any) => e.title === bookTitle)[0].title
                      


    if(titleBoughtBook == dataBorrowBook ){
         setDisabledBtnChangePrice(bookId)
    }else{
         setDisabledBtnChangePrice(0)
    }
  }

  

  const decreaseCartQuantity = (bookTitle: string) => {

    const deleteFirstBookByTitle =  datawBoughtBook?.data.filter((book: any) => book.title === bookTitle)
                                                          .map((book:any) => book.id)[0]

    const nrQuantity = datawBoughtBook?.data.filter((book: any) => book.title === bookTitle)
                                             .map((book: any) => book.id).length
      setQuantity(nrQuantity)

    if(quantity === 0){
      setAddToBuy(!bookId)
    }

      deleteBook(deleteFirstBookByTitle) 
  }


  const removeFromCart = (bookId: number, bookTitle: string) => {
    setAddToBuy(!bookId)

     const showBoughtBooks =  datawBoughtBook?.data.filter((book: any) => book.title === bookTitle);
     const idsToDelete = showBoughtBooks.map((book: any) => book.id)
    
    for( let i = 0; i<idsToDelete.length; i++){
      deleteBooks(idsToDelete[i])
    }
  }


  const getQuantityByBookTitle = (bookTitle: string) => {
    return( 
          datawBoughtBook?.data.filter((e: any) => e.title === bookTitle)
                               .map((e: any) => e.id).length
    );
 }


 const totalAmount = () => {
  return(
        datawBoughtBook?.data.map((book: any) => book.price)
                              .reduce((total: any, item: any) => total + item)
                              .toFixed(2)
  );
}






let quantityObj = datawBoughtBook?.data.length



console.log(quantity);
     return(
        <StoreBookContext.Provider
          value={{
              openCart,
              addToBuy,
              quantity,
              increaseCartQuantity,
              decreaseCartQuantity,
              removeFromCart,
              getQuantityByBookTitle,
              totalAmount,
              quantityObj,
              disabledBtnChangePrice
          }}>
            {children}
            <StoreBookCart isOpen={isOpen}/>
        </StoreBookContext.Provider>
     )

}