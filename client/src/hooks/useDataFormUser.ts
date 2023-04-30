import { useMutation, useQueryClient } from "react-query";
import { request } from '../utils/axios-utils';
import axios from 'axios';

type UserRegister = {
    registerUser: string,
    passwordUser: string
}


// type UserLogout = {
//     auth: string
// }


const registerUser = async (userRegister: UserRegister) => {
    return request({url:'/register', method: 'post', data: userRegister }).result
}

export const useRegisterUser = () => {
    const queryClient = useQueryClient();
    return useMutation(registerUser,{
        onSuccess: (data) => {
            console.log("data register:",data)
            queryClient.invalidateQueries('register')
        },
        onError: (error:any) => {
            console.log(error)
        },
    });
};



const logOut = async (auth : any) => {
    return axios.delete('http://localhost:4000/logout', auth)
}

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation(logOut, {
        onSuccess: (data) => {
            console.log("Data logout:",data.data.info)
            queryClient.invalidateQueries('logout')
        },
        onError: (error:any) => {
            console.log("Errooooor logouttttt:", error.response.data.error )
        },
    });
};

