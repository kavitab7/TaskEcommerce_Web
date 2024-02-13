import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useCart } from '../context/cart';
import toast from 'react-hot-toast';
import Category from '../components/Category';
const Home = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useCart();


    //get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get('/api/product/all-products')
            if (data?.success) {
                setProducts(data?.products)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllProducts()
    }, [])
    return (
        <>
            <Category />
            <h4>All products</h4>
            {products.map((product) => (
                <div className="card" style={{ width: '18rem' }} key={product._id}>
                    <img src={product.image} className="card-img-top" alt="product photo" />
                    <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <h5 className="card-title">{product.price}</h5>
                        <p className="card-text">{product.description.substring(0, 25)}...</p>
                        <button className="btn btn-primary" onClick={() => {
                            setCart([...cart, product])
                            localStorage.setItem("cart", JSON.stringify([...cart, product]));
                            toast.success("Item added to cart");
                        }} >Add to cart</button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Home