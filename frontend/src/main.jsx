import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AuthProvider } from './firebase/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
  <Navbar></Navbar>
    <App />
    <Footer></Footer>
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
