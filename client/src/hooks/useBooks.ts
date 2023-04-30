import { useQuery, useMutation, useQueryClient } from "react-query"
import { request } from '../utils/axios-utils'
import { BookId, PassBook } from "../types/types" 
import { useContext } from 'react';
import { AuthContext } from "../context/AuthProvider"


const fetchLibrary = async (auth:string) => {
    
    const headers = {  Authorization: `Bearer ${auth}`}
    const response =  await request({url:'/books', headers}).result
    return response;
}

export const useFetchLibrary = ()  => {
    const { auth } = useContext(AuthContext);
    return useQuery(
        'library',
        () => fetchLibrary(auth),
        {
            enabled: !!auth,
        }
    );
}


const deleteItemSelect = (id: BookId, auth:string) => {  

    const headers = {  Authorization: `Bearer ${auth}`}
    const response =  request({url:`/books/${id}`,headers, method: 'delete' }).result
    return response;
}

export const useDeleteItemSelect = () => {
    const { auth } = useContext(AuthContext);
    const queryClient = useQueryClient()
    return useMutation(
        (id: BookId) => deleteItemSelect(id,auth),
      {
        onSuccess: () => {
            queryClient.invalidateQueries('library')
        }
      }
    )
}



const addItemSelect = (book: PassBook, auth:string ) => {

    const headers = { Authorization: `Bearer ${auth}`}
    const response = request({url:`/books`,headers, method: 'post', data: book }).result;
    return response;
}

export const useAddItemSelect = () => {
    const { auth } = useContext(AuthContext);
    const queryClient = useQueryClient();
    return useMutation(
        (book: PassBook)=> addItemSelect(book,auth),
      {
         onSuccess: () => {
          queryClient.invalidateQueries('library')
        }
      }
    )
}