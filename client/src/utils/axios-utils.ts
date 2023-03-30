import axios from "axios";
import { useContext } from 'react';
import { BorrowedBooks } from "../components/BorrowedBooks";
import { AuthContext } from "../context/AuthProvider"
import useAuth from '../hooks/useAuth';

const client = axios.create({ baseURL: 'http://localhost:4000' });



export const request = ({ ...options }) => {
  console.log({ ...options });
  // const { refreshToken } = useContext(AuthContext);


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
      const { refreshToken } = options.headers;
       console.log("next step we are in if");  

      console.log('refreshToken!!!:', refreshToken);

      try {

        const { setAccessToken }:any = useAuth();
        const response = await axios.post('http://localhost:5000/token', refreshToken);
        console.log('RETRIVED accessToken: ', response.data.accessToken);
        // setAccessToken(response.data.accessToken);

        const newOptions = {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${response.data.accessToken}`,
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



