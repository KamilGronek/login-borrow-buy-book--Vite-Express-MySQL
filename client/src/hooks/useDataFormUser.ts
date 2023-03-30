import React, {useState} from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { request } from '../utils/axios-utils';
import axios from 'axios';

type UserRegister = {
    registerUser: string,
    passwordUser: string
}

// type UserLogin = {
//     LoginUser: string,
//     passwordUser: string
// }

type UserLogout = {
    auth: string
}


// const [ token, setToken ] = useState("")
 

const registerUser = async (userRegister: UserRegister) => {
    return request({url:'/register', method: 'post', data: userRegister }).result
}

export const useRegisterUser = () => {
    const queryClient = useQueryClient();
    return useMutation(async (userRegister: UserRegister) => {
        return await registerUser(userRegister);
    }, { 
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries('register')
        },
        onError: (error:any) => {
            console.log(error)
            // alert(error.message);
        },
    });
};





// const loginUser = async (userLogin: UserLogin) => {
//     return axios.post('http://localhost:5000/login', userLogin)
// }

// export const useloginUser = () => {
//     const queryClient = useQueryClient();
//     return useMutation(loginUser, {
//         onSuccess: (data) => {
//             queryClient.invalidateQueries('login')
//             setToken(data.data.accessToken) 
//         },
//     });
// };



const logOut = async (auth : any) => {
    return axios.delete('http://localhost:5000/logout', auth)
}

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation(logOut, {
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries('logout')
        },
        onError: (error:any) => {
            console.log(error)
        },
    })
}

