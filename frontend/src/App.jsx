import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header, Footer, Signup, Login, Profile, ChangePassword, ChangeUserDetails, ChangeAvatar, Contact, About, Home, Loader , ListNotices , LongNotice , EditNotice, AddNotice , CreateNote,ListNotes} from './components/index.js';
import React, { useEffect, useState } from 'react'
import { get_user } from './utils/user.index.js';
import { useDispatch } from 'react-redux';
import { loginUser, logoutUser } from '../store/func/userSlice.js'

const App = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const fetchUser = async () => {
            const res = await get_user();
            try {
                if (res.success) {
                    dispatch(loginUser(res.user));
                    setLoading(false);
                }
                else {
                    dispatch(logoutUser());
                    setLoading(false);
                    // console.log("Response:", res);
                }
            } catch (error) {
                setLoading(false);
                console.log(`Error in fetchUser: ${error}`);
            }
        };
        fetchUser();

    }, [dispatch])
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
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/edit-details" element={<ChangeUserDetails />} />
                    <Route path="/change-avatar" element={<ChangeAvatar />} />
                    <Route path="/notices" element={<ListNotices />} />
                    <Route path="/notices/:id" element={<LongNotice />} />
                    <Route path="/notices/edit-notice/:id" element={<EditNotice />} />
                    <Route path="/notices/add-notice" element={<AddNotice />} />
                    <Route path="/notes/add-note" element={<CreateNote />} />
                    <Route path="/notes" element={<ListNotes />} />

                </Routes>
                <Footer />
                <Toaster position="bottom-center" />
            </Router>
    )
}

export default App