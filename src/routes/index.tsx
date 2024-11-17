import React from 'react'
import {createBrowserRouter} from "react-router-dom"
import App from '../App'
import ToastNotification from '../projects/toastNotification'

const router = createBrowserRouter([
    {
        path:"/",
        element : <App />,
        children: [{
            path:'toast-notification',
            element: <ToastNotification />
        }]
    }
])

export default router