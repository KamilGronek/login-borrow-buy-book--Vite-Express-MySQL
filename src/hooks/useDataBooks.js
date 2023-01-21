
import { useQuery, useMutation, useQueryClient } from "react-query"
import { request } from '../utils/axios-utils'


const fetchLibrary = () => {
    return request({url:'/books'})
 }

 export const useFetchLibrary = (onSuccess, onError) => {
    return useQuery(
        'library',
        fetchLibrary,
        {
          onSuccess,
          onError
        }
      );
 }


//===================================================================


const addBorrowBook = (book) => { 
    return request({url:'/borrowedBook', method: 'post', data: book })
}

export const useBorrowBook = () => {
    const queryClient = useQueryClient();
  return useMutation(addBorrowBook,{
    onSuccess: () => {
        queryClient.invalidateQueries('library')
    }
  }
  )
}



const showBorrowedBook = () => { 
    return request({url:'/borrowedBook'})
}

export const useShowBorrowedBook = () => {
    return useQuery(
        'borrowedBook',
        showBorrowedBook,
    )
}



const addReturnedBook = (book) => { 
    return request({url:'/returnedBooks', method: 'post', data: book })
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


const showReturnedBook = () => { 
    return request({url:'/returnedBooks'});
}

export const useShowReturnedBook = () => {
    return useQuery(
        'returnedBooks',
        showReturnedBook,
    )
}

//===================================================================


export const updateBorrowBook = () => {
    // return axios.put(`http://localhost:4000/borrowedBook/${id}`, updateBook);
}

// export const useUpdateBook = () => {
//     const queryClient = useQueryClient();
//   return useMutation(updateBorrowBook,{
//     onSuccess: () => {
//         queryClient.setQueryData(['library', {id:2}],updateBook)
//     },
//     // onSuccess: () => {
//     //     queryClient.invalidateQueries(['library', id])
//     // }
//   })
// }


//===================================================================


const returnTheBorrowedBook = (id) => {  
    return request({url:`/borrowedBook/${id}`, method: 'delete' })
}

export const useReturnTheBorrowedBook = () => {
    const queryClient = useQueryClient() 
    return useMutation(returnTheBorrowedBook, 
        {
        onSuccess: () => {
            queryClient.invalidateQueries('borrowedBook')
        }, 
        
    })
}

//====================================================================

const confirmReturnedBook = (id) => {
    return request({url:`/returnedBooks/${id}`, method: 'delete' })
}

export const useConfirmReturmedBook = () => {
    const queryClient = useQueryClient()
    return useMutation(confirmReturnedBook,
        {
        onSuccess: () => {
            queryClient.invalidateQueries('returnedBooks')
        }
        })
} 