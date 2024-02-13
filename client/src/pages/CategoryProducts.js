import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/cart';
import axios from 'axios';
import toast from 'react-hot-toast';
import Category from '../components/Category';

const CategoryProducts = () => {
    const params = useParams()
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (params?.name) getPrductsByCat();
    }, [params?.name]);

    const getPrductsByCat = async () => {
        try {
            const { data } = await axios.get(`/api/category/category-products/${params.name}`);
            setProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <Category />
            <h4>All products</h4>
            {products.map((product) => (
                <div className="card" key={product._id}>
                    <img src={product.image} className="card-img-top" alt="product photo" />
                    <div className="card-body">
                        <h5 className="card-title">{product.title}</h5>
                        <h5 className="card-title">{product.price}</h5>
                        <p className="card-text">{product.description}</p>
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

export default CategoryProducts