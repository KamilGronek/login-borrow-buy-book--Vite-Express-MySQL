import { useQuery, useMutation, useQueryClient } from "react-query"
import { request } from '../utils/axios-utils'
import { BookId, PassBook } from "../types/types" 


const addBoughtBooks = (book: PassBook) => {
    return request({url:'/boughtBooks', method: 'post', data: book})
}

export const useAddBoughtBooks = () => {
    const queryClient = useQueryClient();
  return useMutation(addBoughtBooks, {
    onSuccess: () => {
        queryClient.invalidateQueries('boughtBooks')
    }
  })
}


const showBoughtBooks = () => { 
    return request({url:'/boughtBooks'})
}

export const useShowBoughtBooks = () => {
    return useQuery(
        'boughtBooks',
        showBoughtBooks,
    )
}


const deleteBoughtBook = (id: BookId) => {
    return request({url:`/boughtBooks/${id}`, method: 'delete' })
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

const deleteBoughtBooks = (id: BookId) => {
    return request({url: `/boughtBooks/${id}`, method: 'delete'})
}

export const useDeleteBoughtBooks = () => {
    const queryClient = useQueryClient()
    return useMutation(deleteBoughtBooks,
        {
        onSuccess: () => {
            queryClient.invalidateQueries('boughtBooks')
        },
    })
} 