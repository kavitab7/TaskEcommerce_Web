import React, { useEffect, useState } from 'react'
import { Outlet } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { useAuth } from '../../context/auth';

const AdminRoutes = () => {
    const [auth, setAuth] = useAuth()
    const [ok, setOk] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await axios.get(`/api/user/admin-auth?_=${Date.now()}`);
                if (data.ok || auth.user.role) {
                    setOk(true)
                } else {
                    setOk(false);
                }
            } catch (error) {
                console.log(error)
            }
        }
        if (auth?.token) checkAuth();
    }, [auth?.token])

    return ok ? <Outlet /> : <h3>This page only Admin can access <NavLink to={'/'} ><button className='btn' >Go to home </button></NavLink></h3>
}

export default AdminRoutes