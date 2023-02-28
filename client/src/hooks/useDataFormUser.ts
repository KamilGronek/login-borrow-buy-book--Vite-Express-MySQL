import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from '../utils/axios-utils';


type UserRegister = {
    registerUser: string,
    passwordUser: string
}

type UserLogin = {
    LoginUser: string,
    passwordUser: string
}

type loginUserProps = {
    onError: () => void
}

 
const registerUser = (userRegister: UserRegister) => {
    return request({url:'/register', method: 'post', data: userRegister })
}

export const useRegisterUSer = () => {
    const queryClient = useQueryClient();
    return useMutation(registerUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('register')
        }
    })
}


const loginUser = async (userLogin: UserLogin) => {
    return await request({url:`/login`, method: 'post', data: userLogin })
}

// const addReturnedBook = async (book: PassBook) => { 
//     let result = await request({url:'/returnedBooks', method: 'post', data: book })
//     console.log(result)
//     return result;
// }

export const useloginUser = () => {
    const queryClient = useQueryClient();
    return useMutation(loginUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('login')
        },
        onError: (error) => {
            console.log(error.response.data.message);
          },
    });
};