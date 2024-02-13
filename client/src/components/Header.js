import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/auth'
import toast from 'react-hot-toast'
import { useCart } from '../context/cart'

const Header = () => {
    const [cart, setCart] = useCart()
    const [auth, setAuth] = useAuth()
    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        })
        localStorage.removeItem('auth');
        toast.success('Logout successfully')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" >EcommerceApp</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav mb-2 mb-lg-0 ">
                            <NavLink to="/" className="nav-link active" aria-current="page" >Home</NavLink>
                            <NavLink to="/category" className="nav-link">Category</NavLink>
                            {auth?.user ? (<>
                                {auth.user.role === 'admin' && <NavLink to='/dashboard/admin' className="nav-link">Dashboard</NavLink>}
                                <NavLink to="/" onClick={handleLogout} className="nav-link" >Logout</NavLink>
                            </>
                            ) : (<>
                                <NavLink to="/login" className="nav-link" >Login</NavLink>
                                <NavLink to="/register" className="nav-link" >Register</NavLink>
                            </>)}
                            <NavLink to="/cart" className="nav-link">Cart ({cart.length})</NavLink>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header