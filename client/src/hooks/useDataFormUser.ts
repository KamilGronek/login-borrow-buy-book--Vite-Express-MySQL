import React, {useState} from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from '../utils/axios-utils';
import axios from 'axios';

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



// const [ token, setToken ] = useState("")

// const loginUser = async (userLogin: UserLogin) => {
//     return axios.post('http://localhost:5000/login', userLogin)
// }

// export const useloginUser = () => {
//     const queryClient = useQueryClient();
//     return useMutation(loginUser, {
//         onSuccess: (data) => {
//             queryClient.invalidateQueries('login')
//             setToken(data.data)
//         },
//     });
// };


// const showRegisterUser = (token: any) => { 
//     return request({url:'/register', 
//     headers: {
//         'Authorization': `Bearer ${token}}`
//      }});
// }

// export const useshowRegisterUsers = () => {
//     const queryClient = useQueryClient();
//     return useMutation(showRegisterUser, {
//         onSuccess: () => {
//             queryClient.invalidateQueries('register')
//          }
//     }
//     )
// }


    // return await request({url:`/login`, method: 'post', data: userLogin })