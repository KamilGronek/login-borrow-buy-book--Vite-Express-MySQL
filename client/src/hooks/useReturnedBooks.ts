import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from '../utils/axios-utils';
import { BookId, PassBook } from "../types/types" ;
import { useContext } from 'react';
import { AuthContext } from "../context/AuthProvider";


const addReturnedBook = async (book: PassBook, auth: string) => { 
    const headers = { Authorization: `Bearer ${auth}`}
    return await request({url:'/returnedBooks',headers, method: 'post', data: book }).result
 
}

export const useReturnedBook = () => {
    const { auth } = useContext(AuthContext);
    const queryClient = useQueryClient();
    return useMutation(
        (book: PassBook) => addReturnedBook(book,auth),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('returnedBooks')
            },
        }
    )
}


const showReturnedBooks = async (auth: string) => { 
    const headers = { Authorization: `Bearer ${auth}`}
    return await request({url:'/returnedBooks', headers}).result
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

const confirmReturnedBook = (id: BookId, auth: string) => {
    const headers = {  Authorization: `Bearer ${auth}`}
    return request({url:`/returnedBooks/${id}`, headers, method: 'delete' }).result
}

export const useConfirmReturmedBook = () => {
    const queryClient = useQueryClient()
    const { auth } = useContext(AuthContext);
    return useMutation(
        (id: BookId) => confirmReturnedBook(id,auth),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('returnedBooks')
            },
    })
} 