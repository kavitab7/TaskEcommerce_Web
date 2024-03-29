import React, { useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const [inputs, setInputs] = useState({
        username: '', email: '', password: '', phone: '',
    })
    const [role, setRole] = useState('user')
    const navigate = useNavigate()

    const handleChange = (e) => {
        setInputs((pre) => ({
            ...pre,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/user/register', {
                username: inputs.username, email: inputs.email, password: inputs.password, phone: inputs.phone, role: role,
            })
            if (data?.success) {
                toast.success('Register successfully')
                navigate('/login')
            } else {
                toast.error(data?.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Error in registration')
        }
    }
    return (
        <>
            <div className="login">
                <h3 className="mb-3" >REGISTER</h3>
                <form onSubmit={handleSubmit}>
                    <div className="login-info">
                        <div className="mb-3">
                            <label className="form-label">Username</label>
                            <input type="text" value={inputs.username} onChange={handleChange} className="form-control" name='username' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" value={inputs.email} onChange={handleChange} className="form-control" name='email' id="exampleInputEmail1" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" value={inputs.password} onChange={handleChange} className="form-control" name='password' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phone</label>
                            <input type="number" value={inputs.phone} onChange={handleChange} className="form-control" name='phone' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Choose role</label>
                            <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register