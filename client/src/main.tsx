import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'

import { QueryClientProvider ,QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"
import { LibraryRentalProvider } from "./context/LibraryContext";
import { StoreBookProvider } from "./context/StoreContext";
import { BorrowOrBuyProvider } from "./context/BorrrowOrBuyContext";

import { RegisterProvider } from "./context/RegisterContext";
import { LoginProvider } from "./context/LoginContext";
import { AuthProvider } from './context/AuthProvider';


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>
    <ErrorBoundary>
    <QueryClientProvider client={queryClient} >
    <AuthProvider>
    <StoreBookProvider>
    <BorrowOrBuyProvider>
    <RegisterProvider>
    <LibraryRentalProvider>
    <LoginProvider>
      <Router>
        <App/>
      </Router>
    </LoginProvider>
    </LibraryRentalProvider>
    </RegisterProvider>
    </BorrowOrBuyProvider>
    <ReactQueryDevtools initialIsOpen ={false} position='bottom-right'/>
    </StoreBookProvider>
    </AuthProvider>
    </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
)
