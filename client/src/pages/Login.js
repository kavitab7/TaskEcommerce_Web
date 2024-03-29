import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth'
import axios from 'axios'
import toast from "react-hot-toast";


const Login = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: '', password: ''
    })

    const handleChange = (e) => {
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/user/login', {
                email: input.email, password: input.password
            })
            if (data.success) {
                setAuth({
                    ...auth,
                    user: data.user,
                    token: data.token
                })
            } else {
                toast.error(data.massage)
            }
            localStorage.setItem('auth', JSON.stringify(data))
            toast.success('Login successfully')
            navigate('/')

        } catch (error) {
            console.log(error)
            toast.error('Error in login')
        }
    }
    return (
        <>
            <div className="login">
                <h3 className="mb-3" >LOGIN</h3>
                <form onSubmit={handleSubmit}>
                    <div className="login-info">
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" value={input.email} onChange={handleChange} className="form-control" name='email' id="exampleInputEmail1" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" value={input.password} onChange={handleChange} className="form-control" name='password' />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div></>
    )
}

export default Login