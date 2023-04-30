import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { useRegisterUser} from "../hooks/useDataFormUser";
import { DataItem} from "../types/types" ;


type RegisterProps = {
    children: ReactNode
}

type RegisterUserContext = {
    registerUser: string,
    passwordUser: string
    setRegisterUser: (e: any) => void,
    setPasswordUser: (e: any) => void,
    showInfo: boolean
    handleCreateUser: (e: any) => void
    data: any,
    error: object
}



const RegisterContext = createContext({} as RegisterUserContext);

export function useRegister() {
    return useContext(RegisterContext);
}

export function RegisterProvider({children} : RegisterProps){

    const { mutate, data, error, status  } = useRegisterUser();  
    

    const [ registerUser, setRegisterUser] = useState("");
    const [ passwordUser,setPasswordUser ] = useState("");
    const [ showInfo, setShowInfo ] = useState(false);
    console.log(status)

    const handleCreateUser = async (e:any) => {
      e.preventDefault();
      const userRegister = {
        registerUser,
        passwordUser
      }
     await mutate(userRegister);
     setShowInfo(true);
    };

    useEffect(() => {
      setInterval(() => {
        setShowInfo(false)
      }, 10000);
    }, []);
   

     return(
        <RegisterContext.Provider
          value={{
            registerUser,
            passwordUser,
            setRegisterUser,
            setPasswordUser,
            showInfo,
            handleCreateUser,
            data,
            error
          }}>
            {children}
        </RegisterContext.Provider>
     )

}