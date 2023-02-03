
import { useQuery, useMutation, useQueryClient } from "react-query"
import { request } from '../utils/axios-utils'


type FetchLibraryProps = {
    onSuccess: () => void
    onError: () => void
}


type BookId = {
    id: number
}

type PassBook = {
    book: object,
    body: object,
    id: number,
}



const fetchLibrary = () => {
    return request({url:'/books'})
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

const addItemSelect = (book: PassBook ) => {
    return request({url:`/books`, method: 'post', data: book })
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



//===================================================================


const addBorrowBook = (book:PassBook) => { 
    return request({url:'/borrowedBook', method: 'post', data: book })
}

export const useBorrowBook = () => {
    const queryClient = useQueryClient();
    return useMutation(addBorrowBook,
     {
       onSuccess: (data) => {
        // queryClient.invalidateQueries('borrowedBook')
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



const showBorrowedBook = () => { 
    return request({url:'/borrowedBook'})
}

export const useShowBorrowedBook = () => {
    return useQuery(
        'borrowedBook',
        showBorrowedBook,
    )
}



const addReturnedBook = (book: PassBook) => { 
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


  export const updateBorrowBook = (body: PassBook) => {
    console.log(body)
    return request({url:`/borrowedBook/${body.id}`, });
}

// export const useUpdateBorrowBook = () => {
//     const queryClient = useQueryClient();
//    return useMutation(updateBorrowBook, {
//       onSuccess: () => {
//          queryClient.invalidateQueries('borrowedBook')
//       }
//     }
//   )
// }




// export const useUpdateBorrowBook = () => {
//     // const queryClient = useQueryClient();
//    return useMutation(updateBorrowBook, {
//     onSuccess: (data) => {
//         console.log(data)
//         queryCache.setQueryData('borrowedBook',{id:1}, (prev) => {
       
//             return {
//                 ...prev,
//                 id: "",
//                 cover: {
//                     large: "",
//                     small: ""
//                 },
//                 price: "",
//                 title: "",
//                 author: "",
//                 releaseDate: "",
//                 pages: "",
//                 link: "",
//                 date: "",
//                 important: "",
//                 active: "",
//                 activeReturnedBook: "",
//                 finishDate: ""
//             }
//         })
//     //   queryClient.setQueryData(['returnedBooks', { id: 6 }], data)
//     //   console.log(data)
//     }
//   })
// }





// export const useUpdateBorrowBook = () => {
//     const queryClient = useQueryClient();
//   return useMutation(updateBorrowBook,{
//     onSuccess: (data) => {
//         queryClient.setQueryData(['library', {id: 5}], data)
//     }
//   })
// }


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


const returnTheBorrowedBook = (id: BookId) => {  
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


const deleteBoughtBook = (id: BookId) => {
    return request({url:`/boughtBooks/${id}`, method: 'delete' })
}

export const useDeleteBoughtBoo = () => {
    const queryClient = useQueryClient()
    return useMutation(deleteBoughtBook,
        {
        onSuccess: () => {
            queryClient.invalidateQueries('boughtBooks')
        },
    })
} 