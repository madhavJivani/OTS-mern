import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header, Footer, Signup, Login, Contact, About, Home } from './components/index.js';
import React, { useEffect } from 'react'
import { getCurrentUser } from './utils/index.js'
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/func/userSlice.js'

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUser = async () => {
            const res = await getCurrentUser();
            if (res.success) {
                dispatch(loginUser(res.user));
            }
            // console.log("Response:", res);
        };
        fetchUser();

    }, [])
  return (
      <Router>
          <Header />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
          <Toaster position="bottom-center" />
      </Router>
  )
}

export default App