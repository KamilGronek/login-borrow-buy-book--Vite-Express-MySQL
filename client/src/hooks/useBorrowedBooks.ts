import { useQuery, useMutation, useQueryClient } from "react-query"
import { request } from '../utils/axios-utils'
import { BookId, PassBook } from "../types/types" 
import { useContext } from 'react';
import { AuthContext } from "../context/AuthProvider"



const addBorrowBook = async (book:PassBook, auth:string) => { 
    const headers = { Authorization: `Bearer ${auth}`}
    return await request({url:'/borrowedBooks', headers, method: 'post', data: book }).result;
    
}

export const useBorrowBook = () => {
    const { auth } = useContext(AuthContext);
    const queryClient = useQueryClient();
    return useMutation(
       (book:PassBook) => addBorrowBook(book, auth),
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

const showBorrowedBook = async (auth:string) => { 
        const headers = {  Authorization: `Bearer ${auth}`}
        return  await request({url:'/borrowedBooks', headers}).result
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


const updateBorrowBook = (body:any, auth:string) => { 
    const headers = {  Authorization: `Bearer ${auth}`}
    return  request({url:`/borrowedBooks/${body.id}`, headers, method: 'put', data: body}).result;
    
}

export const useUpdateBorrowBook = () => {
    const { auth } = useContext(AuthContext);
    const queryClient = useQueryClient();
   return useMutation(
    (body:any) => updateBorrowBook(body,auth), 
    {
      onSuccess: () => {
         queryClient.invalidateQueries('borrowedBooks')
      }
    }
  )
}


const returnTheBorrowedBook = (id: BookId, auth:string) => {  
    const headers = {  Authorization: `Bearer ${auth}`}
    return  request({url:`/borrowedBooks/${id}`, headers, method: 'delete' }).result
    
}

export const useReturnTheBorrowedBook = () => {
    const queryClient = useQueryClient() 
    const { auth } = useContext(AuthContext);
    return useMutation(
        (id: BookId) => returnTheBorrowedBook(id,auth), 
        {
        onSuccess: () => {
            queryClient.invalidateQueries('borrowedBooks')
        },  
    })
}