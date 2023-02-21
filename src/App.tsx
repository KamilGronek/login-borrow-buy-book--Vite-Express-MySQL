import React from "react";
import "./styles/App.css";
import { QueryClientProvider ,QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools"

import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import { MenuBorrowDetails } from "./components/MenuBorrowDetails";
import BorrowedBooks from "./components/BorrowedBooks";
import ReturnedBooks from "./components/ReturnedBooks";
import { LibraryRentalProvider } from "./context/LibraryContext";
import { StoreBookProvider } from "./context/StoreContext";
import { BorrowOrBuyProvider } from "./context/BorrrowOrBuyContext";

const queryClient = new QueryClient();


function App() {
   
  return ( 
      <QueryClientProvider client={queryClient} >
        <LibraryRentalProvider>
        <StoreBookProvider>
          <BorrowOrBuyProvider>
          <Router>
            <div className="App">
              <div className="grid">
                    <Header/>
                    <MenuBorrowDetails/>
                    <Routes>
                        <Route exact path="/borrowedBooks" element={<BorrowedBooks/>} />
                        <Route path="/returnedBooks" element={<ReturnedBooks/>} /> 
                    </Routes>
                    <Navigation/>
              </div>
            </div>
          </Router>
          </BorrowOrBuyProvider>
          <ReactQueryDevtools initialIsOpen ={false} position='bottom-right'/>
        </StoreBookProvider>
        </LibraryRentalProvider>
      </QueryClientProvider>
    
  );
}

export default App
