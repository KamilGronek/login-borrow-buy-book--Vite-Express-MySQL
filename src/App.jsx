import React from "react";
import "./styles/App.css";
import { QueryClientProvider ,QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"

import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import { MenuDetails } from "./components/MenuDetails";
import ReturnedBooks from "./components/ReturnedBooks"
import BorrowedBooks from "./components/BorrowedBooks";
import { LibraryRentalProvider } from "./context/LibraryContext";

const queryClient = new QueryClient();


function App() {

  return ( 
      <QueryClientProvider client={queryClient} >
        <LibraryRentalProvider>
        <Router>
          <div className="grid">
                <Header/>
                <MenuDetails/>
                <Routes>
                <Route exact path="/" element={<BorrowedBooks/>}/>
                  <Route path="/returnedBooks" element={<ReturnedBooks/>} /> 
                </Routes>
                <Navigation/>
          </div>
        </Router>
        <ReactQueryDevtools initialIsOpen ={false} position='bottom-right'/>
        </LibraryRentalProvider>
      </QueryClientProvider>
    
  );
}

export default App
