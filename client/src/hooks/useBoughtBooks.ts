import { useQuery, useMutation, useQueryClient } from "react-query"
import { request } from '../utils/axios-utils'
import { BookId, PassBook } from "../types/types" 

import { useContext } from 'react';
import { AuthContext } from "../context/AuthProvider"

const addBoughtBooks = (book: PassBook, auth: string) => {
    const headers = {  Authorization: `Bearer ${auth}`}
    return request({url:'/boughtBooks', headers, method: 'post', data: book}).result
}

export const useAddBoughtBooks = () => {
    const { auth } = useContext(AuthContext);
    const queryClient = useQueryClient();   
    return useMutation(
        (book: PassBook) => addBoughtBooks(book, auth), 
        {
        onSuccess: () => {
            queryClient.invalidateQueries('boughtBooks')
            }
        }
    )
}


const showBoughtBooks = async (auth: string) => { 
    const headers = {  Authorization: `Bearer ${auth}`}
    return await request({url:'/boughtBooks',headers }).result;
  
}

export const useShowBoughtBooks = () => {
    const { auth } = useContext(AuthContext);
    return useQuery(
        'boughtBooks',
        () =>showBoughtBooks(auth),
        {
            enabled: !!auth,
        }
    )
}

// CART =========================

const decreaseBoughtBook = (bookId: string, auth: string) => {
    const headers = {  Authorization: `Bearer ${auth}`}
    return request({url:`/boughtBooks/${bookId}`, headers, method: 'delete' }).result
 
}

export const useDecreaseBoughtBook = () => {
    const { auth } = useContext(AuthContext);
    const queryClient = useQueryClient()
    return useMutation(
        (bookId: string) => decreaseBoughtBook(bookId,auth),
        {
        onSuccess: () => {
            queryClient.invalidateQueries('boughtBooks')
        },
    })
} 
//=================================================

const deleteBoughtBooks = (id: string, auth: string) => {
    const headers = {  Authorization: `Bearer ${auth}`}
    return request({url: `/boughtBooks/${id}`,headers, method: 'delete'}).result
 
}

export const useDeleteBoughtBooks = () => {
    const queryClient = useQueryClient()
    const { auth } = useContext(AuthContext);
    return useMutation(
        (id: string) => deleteBoughtBooks(id, auth),
        {
        onSuccess: () => {
            queryClient.invalidateQueries('boughtBooks')
        },
            // enabled: !!auth,
    })
} 