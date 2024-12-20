import { configureStore } from '@reduxjs/toolkit';
import userSlice from './func/userSlice';

export const store = configureStore({
    reducer: {
        user: userSlice,
    },
});
