import "./styles/App.css";
import { QueryClient } from "react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BorrowedBooks } from "./components/BorrowedBooks";
import { ReturnedBooks } from "./components/ReturnedBooks";
import { Login } from "./components/Login_Form/Login";
import { Register } from "./components/Login_Form/Register";
import RequireAuth from './components/RequireAuth';
import { NoMatch }  from "./components/NoMatch";

const queryClient = new QueryClient();

function App() {

  return ( 

    <div className="App">
          <Routes>
             <Route path="/login" element={<Login/>} />
             <Route path="/register" element={<Register/>} />
             <Route element = {<RequireAuth/>}>
                <Route path="/borrowedBooks" element={<BorrowedBooks/>} />
                <Route path="/returnedBooks" element={<ReturnedBooks/>} /> 
            </Route>   
            <Route path="*" element={<NoMatch/>} />
         </Routes>
    </div>
  );
}

export default App
