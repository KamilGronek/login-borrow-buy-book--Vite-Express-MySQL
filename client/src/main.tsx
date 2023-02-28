import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ErrorBoundary from './components/ErrorBoundary'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
// import { LoginForm } from "./components/LoginForm"


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>
    <ErrorBoundary>
    
        {/* <LoginForm/> */}
  
      <App/>
    </ErrorBoundary>
  </React.StrictMode>
)
