import React, { useState } from 'react'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate()

    const handleCilck = async () => {
        try {
            const { data } = await axios.post('/api/order/create-order', {
                products: cart, buyer: auth.user._id
            })
            if (data.success) {
                toast.success('Order confirmed')
                console.log(data.order)
            }
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }

    //detele item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {cart?.length
                ? `You Have ${cart.length} items in your cart` : " Your Cart Is Empty"}

            {!auth?.token ? (
                <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                        navigate("/login")
                    }
                >
                    Plase Login to checkout
                </button>
            ) : (
                <button onClick={handleCilck}
                    className="btn btn-outline-success">
                    Buy now
                </button>
            )}

            <div className="row ">
                <div className="col-md-7  p-0 m-0">
                    {cart?.map((p) => (
                        <div className="row card " key={p._id}>
                            <div className="col-md-4 product ">
                                <img
                                    src={p.image}
                                    className="cart-img"
                                    alt='cart image'
                                    width="100%"
                                    height={"130px"}
                                />
                            </div>
                            <div className="col-md-4 cart-product-detail">
                                <p>{p.title}</p>
                                <p>{p.description?.substring(0, 30)}</p>
                                <p>Price : {p.price}</p>
                            </div>
                            <div className="col-md-4 cart-remove-btn">
                                <button
                                    className="btn btn-danger"
                                    onClick={() => removeCartItem(p._id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default CartPage