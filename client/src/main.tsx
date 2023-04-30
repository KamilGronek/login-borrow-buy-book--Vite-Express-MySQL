import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'

import { QueryClientProvider ,QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"
import { BorrowedBooksProvider } from "./context/BorrowedBooksContext";
import { ReturnedBooksProvider } from "./context/ReturnedBooksContext";
import { BoughtBooksProvider } from "./context/BoughtBooksContext";
import { MenuBorrowDetailsProvider } from "./context/MenuBorrowDetailsContext";

import { RegisterProvider } from "./context/RegisterContext";
import { LoginProvider } from "./context/LoginContext";
import { AuthProvider } from './context/AuthProvider';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>
    <ErrorBoundary>
    <QueryClientProvider client={queryClient} >
    <AuthProvider>
    <BoughtBooksProvider>
    <MenuBorrowDetailsProvider>
    <RegisterProvider>
    <BorrowedBooksProvider>
    <ReturnedBooksProvider>
    <Router>
    <LoginProvider>
        <App/>
    </LoginProvider>
    </Router>
    </ReturnedBooksProvider>
    </BorrowedBooksProvider>
    </RegisterProvider>
    </MenuBorrowDetailsProvider>
    <ReactQueryDevtools initialIsOpen ={false} position='bottom-right'/>
    </BoughtBooksProvider>
    </AuthProvider>
    </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
)
