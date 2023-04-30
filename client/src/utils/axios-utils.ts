// import axios from "axios";
// import { useContext } from 'react';
// import { BorrowedBooks } from "../components/layout/pages/BorrowedBooks";
// import { AuthContext } from "../context/AuthProvider"
// import useAuth from '../hooks/useAuth';

// const client = axios.create({ baseURL: 'http://localhost:4000' });



// export const request = ({ ...options }) => {
  
//   const { setAuth } = useAuth();

//   console.log(options.headers.Authorization);

//   const onSuccess = (response: any) => response;
  
//   const onError = async (error: any) => {
//     console.log(error.response.data.code);

//     console.log(error);
//     console.log(error.response);
//     console.log(error.response.status);
//     console.log(error.response.status === 401 && error.response.data.code === 'EXPIRED');

//     if (error.response.status === 401 && error.response.data.code === 'EXPIRED') {
      
//       console.log("we are in if");

//       const  refreshToken  = options.headers.Authorization || {};
//       console.log('refreshToken!!!:', refreshToken);

//       console.log("next step we are in if");  

//       try {
        
//         // const { setAccessToken }:any = useAuth();


//         const response = await axios.post('http://localhost:4000/token', refreshToken);
//         console.log('RETRIVED accessToken: ', response.data.accessToken);
//         setAuth(response.data.accessToken);

//         const { auth } = useContext(AuthContext);

//         const newOptions = {
//           ...options,
//           headers: {
//             ...options.headers,
//             Authorization: `Bearer ${auth}`,
//           },
//         };

//         const result = await client(newOptions);
//         return {
//           result: result.data
//         }
//       } catch (error) {
//         console.log('Error related with get accessToken occred: ', error);
//         throw error;
//       }
//     }
//     throw error;
//   };

//   const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
//   client.defaults.headers.common = headers;

//    const result = makeRequest(options, onSuccess, onError);

//     return {
//       result
//     }
// };

// const makeRequest = ({ ...options }, onSuccess: any, onError: any) => {
//    return client(options)
//    .then(onSuccess)
//    .catch(onError);
// }


import axios from "axios";
// import { useContext } from "react";
// import { useContext } from 'react';
import { BorrowedBooks } from "../components/layout/pages/BorrowedBooks";
// import { AuthContext } from "../context/AuthProvider"
// import useAuth from '../hooks/useAuth';

const client = axios.create({ baseURL: 'http://localhost:4000' });

let useContext = {};
let AuthContext = {};
let useAuth = {};

export const initialize = (useCon: typeof useContext,
                          AuthCon: typeof AuthContext,
                          useAu: typeof useAuth) => {
  useContext = useCon;
  AuthContext = AuthCon;
  useAuth = useAu;
}

export const request = ({ ...options }) => {
  console.log({ ...options });

      // console.log('refreshToken!!!:', refreshToken);

//   const { accessToken }:any = useContext(AuthContext);

  const onSuccess = (response: any) => response;

  const onError = async (error: any) => {
    console.log(error.response.data.code);

    console.log(error);
    console.log(error.response);
    console.log(error.response.status);
    console.log(error.response.status === 401 && error.response.data.code === 'EXPIRED');

    if (error.response.status === 401 && error.response.data.code === 'EXPIRED') {
      
      console.log("we are in if");

      // const { refreshToken } = options.headers || {}


      const { refreshToken } = useContext(AuthContext);

       console.log("next step we are in if");  

      console.log('refreshToken!!!:', refreshToken);

      try {

        // const { setAccessToken }:any = useAuth();

        const { setAuth }:any = useAuth();


        const response = await axios.post('http://localhost:4000/token', refreshToken);
        console.log('RETRIVED accessToken: ', response.data.accessToken);
        // setAccessToken(response.data.accessToken);
           setAuth(response.data.accessToken);

           const { auth } = useContext(AuthContext);

        const newOptions = {
          ...options,
          headers: {
            ...options.headers,
            // Authorization: `Bearer ${response.data.accessToken}`,
            Authorization: `Bearer ${auth}`,
          },
        };

        const result = await client(newOptions);
        return {
          result: result.data
        }
      } catch (error) {
        console.log('Error related with get accessToken occred: ', error);
        throw error;
      }
    }
    throw error;
  };

  const headers = { Authorization: `Bearer ${localStorage.getItem('accessToken')}` };
  client.defaults.headers.common = headers;

   const result = makeRequest(options, onSuccess, onError);

    return {
      result
    }
};

// const  makeRequest = await ({ ...options }) => {
const makeRequest = ({ ...options }, onSuccess: any, onError: any) => {
   return client(options)
   .then(onSuccess)
   .catch(onError);
}



