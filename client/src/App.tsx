import React, {lazy, Suspense} from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/layout/Login_Form/Login";
import RequireAuth from "./components/RequireAuth";
import { NoMatchPage }  from "./components/layout/pages/NoMatchPage";

const BorrowedBooks = lazy(() => 
  import("./components/layout/pages/BorrowedBooks").then(module => {
    return {default: module.BorrowedBooks }
  })
)

const ReturnedBooks = lazy(() => 
  import("./components/layout/pages/ReturnedBooks").then(module => {
    return {default: module.ReturnedBooks }
  })
)

const Register = lazy(() => 
  import("./components/layout/Login_Form/Register").then(module => {
    return {default: module.Register }
  })
)

function App() {
  return ( 
    <div className="App">
          <Routes>
             <Route path="/login" element={<Login/>} />
             <Route path="/register" element={
                  <Suspense fallback={<div>Loading...</div>}>
                      <Register/>
                  </Suspense>
              }/>
             <Route element = {<RequireAuth/>}>
                <Route path="/borrowedBooks" element={
                  <Suspense fallback={<div>Loading...</div>}>
                      <BorrowedBooks/>
                  </Suspense>
                 }/>
                <Route path="/returnedBooks" element={
                  <Suspense fallback={<div>Loading...</div>}>
                      <ReturnedBooks/>
                  </Suspense>
                } /> 
            </Route>   
            <Route path="*" element={<NoMatchPage/>} />
         </Routes>
    </div>
  );
}

export default App
