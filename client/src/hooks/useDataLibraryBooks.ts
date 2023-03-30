
import React,{useEffect, useState} from 'react'
import { useQuery, useMutation, useQueryClient } from "react-query"
import { request } from '../utils/axios-utils'
import { BookId, PassBook } from "../types/types" 
// import { useAuth } from './useAuth';

import { useContext } from 'react';
import { AuthContext } from "../context/AuthProvider"
import axios from 'axios';

type FetchLibraryProps = {
    onSuccess: () => void,
    onError: () => void
}


const fetchLibrary = async () => {
    return await request({url:'/books'}).result
 }

 export const useFetchLibrary = ({onSuccess, onError}: FetchLibraryProps)  => {
    return useQuery(
        'library',
        fetchLibrary,
        {
          onSuccess,
          onError
        }
      );
 }


 const deleteItemSelect = (id: BookId) => {  
    return request({url:`/books/${id}`, method: 'delete' }).result
}

export const useDeleteItemSelect = () => {
    const queryClient = useQueryClient()
    return useMutation(deleteItemSelect,
      {
        onSuccess: (data) => {
            queryClient.invalidateQueries('library')
        }
      }
    )
}

const addItemSelect = async (book: PassBook ) => {
    return await request({url:`/books`, method: 'post', data: book }).result
}

export const useAddItemSelect = () => {
    const queryClient = useQueryClient();
    return useMutation(addItemSelect,
      {
         onSuccess: () => {
          queryClient.invalidateQueries('library')
        }
      }
    )
}


const addBorrowBook = async (book:PassBook) => { 
    return await request({url:'/borrowedBooks', method: 'post', data: book }).result
}

export const useBorrowBook = () => {
    const queryClient = useQueryClient();
    return useMutation(addBorrowBook,
     {
       onSuccess: () => {
        queryClient.invalidateQueries('borrowedBooks')
        // queryClient.setQueryData('library' ,(oldQueryData) => {
        //     return {
        //         ...oldQueryData as Record<string, unknown> ,
        //         data: [...oldQueryData.data , data.data]
        //     }
        // })
       }
     }
   )
}




const showBorrowedBook = async (auth:any) => { 

    try {
        const headers = {  Authorization: `Bearer ${auth}`}
        const response =  await request({url:'/borrowedBooks', headers}).result
        return response;
        
    } catch (err) {
        console.log(err);
        // return null;
    }
}

export const useShowBorrowedBook = () => {

    const { auth } = useContext(AuthContext);
    console.log("useShowBorrowedBook Auth:",auth)
    return useQuery(
        'borrowedBooks',
        () => showBorrowedBook(auth), 
        {
             enabled: !!auth,
        }
    );
}


// onError: (error:any) => {     
//     console.log(error.response.data.warning)
//   }


//=============================================================

const addReturnedBook = async (book: PassBook) => { 
    let result = await request({url:'/returnedBooks', method: 'post', data: book }).result
    return result;
}

export const useReturnedBook = () => {
    const queryClient = useQueryClient();
  return useMutation(addReturnedBook,{
    onSuccess: () => {
        queryClient.invalidateQueries('returnedBooks')
    },
  }
  )
}


//=========================================

const showReturnedBooks = async (auth:any) => { 

    try {
        console.log(auth)
        const headers = { Authorization: `Bearer ${auth}`}
        let response =  await request({url:'/returnedBooks', headers}).result
        return response;
    } 
    catch (err) {
        console.log(err);
        return null;
    }
}
 
export const useShowReturnedBooks = () => {

    const { auth } = useContext(AuthContext);
    return useQuery(
        'returnedBooks',
        () => showReturnedBooks(auth),
        {
            enabled: !!auth,
        }
    )
}



 export const updateBorrowBook = (body:any) => { 
    return request({url:`/borrowedBooks/${body.id}`, method: 'put', data: body}).result;
}

export const useUpdateBorrowBook = () => {
    const queryClient = useQueryClient();
   return useMutation(updateBorrowBook, {
      onSuccess: () => {
         queryClient.invalidateQueries('borrowedBooks')
      }
    }
  )
}


const returnTheBorrowedBook = (id: BookId) => {  
    return request({url:`/borrowedBooks/${id}`, method: 'delete' }).result
}

export const useReturnTheBorrowedBook = () => {
    const queryClient = useQueryClient() 
    return useMutation(returnTheBorrowedBook, 
        {
        onSuccess: () => {
            queryClient.invalidateQueries('borrowedBooks')
        },  
    })
}


const confirmReturnedBook = (id: BookId) => {
    return request({url:`/returnedBooks/${id}`, method: 'delete' }).result
}

export const useConfirmReturmedBook = () => {
    const queryClient = useQueryClient()
    return useMutation(confirmReturnedBook,
        {
        onSuccess: () => {
            queryClient.invalidateQueries('returnedBooks')
        },
    })
} 

