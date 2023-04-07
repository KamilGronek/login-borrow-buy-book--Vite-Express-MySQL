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
    return useMutation(addBoughtBooks, 
        {
        onSuccess: () => {
            queryClient.invalidateQueries('boughtBooks')
            }
        }
    )
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

// CART =========================

const decreaseBoughtBook = async (bookId: string) => {
    console.log("delete ID:::",bookId)
    const response = await request({url:`/boughtBooks/${bookId}`, method: 'delete' }).result
    return response;
}

export const useDecreaseBoughtBook = () => {
    const queryClient = useQueryClient()
    return useMutation(decreaseBoughtBook,
        {
        onSuccess: () => {
            queryClient.invalidateQueries('boughtBooks')
        },
    })
} 
//=================================================

const deleteBoughtBooks = async (id: string, auth:string) => {
    // const headers = {  Authorization: `Bearer ${auth}`}
    const response = await request({url: `/boughtBooks/${id}`, method: 'delete'}).result
    return response;
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