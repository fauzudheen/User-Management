import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import authreducer from '../redux/authSlice'

const store = configureStore({
    reducer: {
        auth: authreducer
    }
})

export default store
