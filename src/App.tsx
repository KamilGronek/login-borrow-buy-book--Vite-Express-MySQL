import React from "react";
import "./styles/App.css";
import { QueryClientProvider ,QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"

import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import { MenuDetails } from "./components/MenuDetails";
import BorrowedBooks from "./components/BorrowedBooks";
import ReturnedBooks from "./components/ReturnedBooks";
import {BoughtBooks} from "./components/BoughtBooks";
import { LibraryRentalProvider } from "./context/LibraryContext";
import { StoreBooklProvider } from "./context/StoreContext";

const queryClient = new QueryClient();


function App() {

  return ( 
      <QueryClientProvider client={queryClient} >
        <LibraryRentalProvider>
        <StoreBooklProvider>
          <Router>
            <div className="grid">
                  <Header/>
                  <MenuDetails/>
                  <Routes>
                      <Route exact path="/" element={<BorrowedBooks/>} />
                      <Route path="/returnedBooks" element={<ReturnedBooks/>} /> 
                      <Route path="/boughtBooks" element={<BoughtBooks/>} /> 
                  </Routes>
                  <Navigation/>
            </div>
          </Router>
          <ReactQueryDevtools initialIsOpen ={false} position='bottom-right'/>
        </StoreBooklProvider>
        </LibraryRentalProvider>
      </QueryClientProvider>
    
  );
}

export default App
