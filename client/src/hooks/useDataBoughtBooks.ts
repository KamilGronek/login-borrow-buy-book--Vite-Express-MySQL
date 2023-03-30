import { useQuery, useMutation, useQueryClient } from "react-query"
import { request } from '../utils/axios-utils'
import { BookId, PassBook } from "../types/types" 

import { useContext } from 'react';
import { AuthContext } from "../context/AuthProvider"

const addBoughtBooks = (book: PassBook) => {
    return request({url:'/boughtBooks', method: 'post', data: book}).result
}

export const useAddBoughtBooks = () => {
    const queryClient = useQueryClient();
  return useMutation(addBoughtBooks, {
    onSuccess: () => {
        queryClient.invalidateQueries('boughtBooks')
    }
  })
}


const showBoughtBooks = async (auth:any) => { 
    try {
        const headers = {  Authorization: `Bearer ${auth}`}
        const response = await request({url:'/boughtBooks',headers }).result;
        return response;
    } catch (err) {
        console.log(err);
    }
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


const deleteBoughtBook = (id: BookId) => {
    return request({url:`/boughtBooks/${id}`, method: 'delete' }).result
}

export const useDeleteBoughtBook = () => {
    const queryClient = useQueryClient()
    return useMutation(deleteBoughtBook,
        {
        onSuccess: () => {
            queryClient.invalidateQueries('boughtBooks')
        },
    })
} 

const deleteBoughtBooks = (id: BookId, auth:string) => {
    
    // const headers = {  Authorization: `Bearer ${auth}`}
    return request({url: `/boughtBooks/${id}`, method: 'delete'}).result
}

export const useDeleteBoughtBooks = () => {
    const queryClient = useQueryClient()
    const { auth } = useContext(AuthContext);
    return useMutation(
        (id: BookId) => deleteBoughtBooks(id, auth),
        {
        onSuccess: () => {
            queryClient.invalidateQueries('boughtBooks')
        },
            // enabled: !!auth,
    })
} 