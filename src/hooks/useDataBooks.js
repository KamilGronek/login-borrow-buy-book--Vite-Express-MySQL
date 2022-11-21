import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from "react-query"



const fetchLibrary = () =>{
    return axios.get('http://localhost:4000/books')
 }



const addBorrowBook = (book) => {
    return axios.post('http://localhost:4000/borrowedBook', book)
}


const showBorrowedBook = () =>{
    return axios.get('http://localhost:4000/borrowedBook')
}


export const useFetchLibrary = (onSuccess, onError) => {
    return useQuery(
        'library',
        fetchLibrary, {
            onSuccess,
            onError
        }
    )
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

export const useShowBorrowedBook = () => {
    return useQuery(
        'library',
        showBorrowedBook,
    )
}
