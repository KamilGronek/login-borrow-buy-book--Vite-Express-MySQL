
import { useQuery, useMutation, useQueryClient } from "react-query"
import { request } from '../utils/axios-utils'
import { BookId, PassBook } from "../types/types" 


type FetchLibraryProps = {
    onSuccess: () => void,
    onError: () => void
}


const fetchLibrary = async () => {
    return await request({url:'/books'})
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
    return request({url:`/books/${id}`, method: 'delete' })
}

export const useDeleteItemSelect = () => {
    const queryClient = useQueryClient()
    return useMutation(deleteItemSelect,
      {
        onSuccess: (data) => {
            queryClient.invalidateQueries('library')
            console.log(data)
        }
      }
    )
}

const addItemSelect = async (book: PassBook ) => {
    return await request({url:`/books`, method: 'post', data: book })
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
    return await request({url:'/borrowedBooks', method: 'post', data: book })
}

export const useBorrowBook = () => {
    const queryClient = useQueryClient();
    return useMutation(addBorrowBook,
     {
       onSuccess: (data) => {
        // queryClient.invalidateQueries('borrowedBooks')
        queryClient.setQueryData('library' ,(oldQueryData) => {
            return {
                ...oldQueryData as Record<string, unknown> ,
                data: [...oldQueryData.data , data.data]
            }
        })
       }
     }
   )
}


const showBorrowedBook = async () => { 
    return await request({url:'/borrowedBooks'})
}

export const useShowBorrowedBook = () => {
    return useQuery(
        'borrowedBooks',
        showBorrowedBook,
    )
}


const addReturnedBook = async (book: PassBook) => { 
    return await request({url:'/returnedBooks', method: 'post', data: book })
}

export const useReturnedBook = () => {
    const queryClient = useQueryClient();
  return useMutation(addReturnedBook,{
    onSuccess: () => {
        queryClient.invalidateQueries('returnedBooks')
    }
  }
  )
}

const showReturnedBooks = async () => { 
    return await request({url:'/returnedBooks'});
}

export const useShowReturnedBooks = () => {
    return useQuery(
        'returnedBooks',
        showReturnedBooks,
    )
}



 export const updateBorrowBook = (body:any) => { 
    return request({url:`/borrowedBooks/${body.id}`, method: 'put', data: body});
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
    return request({url:`/borrowedBooks/${id}`, method: 'delete' })
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
    return request({url:`/returnedBooks/${id}`, method: 'delete' })
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

