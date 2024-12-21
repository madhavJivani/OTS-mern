import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header, Footer, Signup, Login, Profile, Contact, About, Home ,Loader } from './components/index.js';
import React, { useEffect, useState } from 'react'
import { getCurrentUser } from './utils/index.js'
import { useDispatch } from 'react-redux';
import { loginUser } from '../store/func/userSlice.js'
import toast from 'react-hot-toast';

const App = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        const fetchUser = async () => {
            const res = await getCurrentUser();
            try {
                if (res.success) {
                    dispatch(loginUser(res.user));
                    // toast.success("User fetched successfully");
                    setLoading(false);
                }
                else {
                    toast.error("Failed to fetch user");
                    setLoading(false);
                    console.log("Response:", res);
                }
            } catch (error) {
                toast.error("Failed to fetch user");
                setLoading(false);
                console.log(`Error in fetchUser: ${error}`);
            }
        };
        fetchUser();

    }, [])
    return (
        loading ? <Loader messages={["Fetching your info"]} /> :
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
            <Footer />
            <Toaster position="bottom-center" />
        </Router>
    )
}

export default App