import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Header,Footer,Signup,Login,Contact,About} from './components/index.js'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Toaster from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about" element={<About />} />
    </Routes>
    <Toaster />
    <Footer />
  </Router>,
)
