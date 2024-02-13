import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const ProductCreate = () => {
    const [inputs, setInputs] = useState({
        title: '', description: '', image: '', price: ''
    })
    const [category, setCategory] = useState('')
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    const getAllCategory = async () => {
        try {
            const response = await axios.get('/api/category/all-categories');
            const { data } = response;
            if (data?.success) {
                setCategories(data?.categories);
            } else {
                toast.error("Failed to fetch categories");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            toast.error("Something went wrong while getting categories");
        }
    };

    useEffect(() => {
        getAllCategory();
    }, []);

    const handleChange = (e) => {
        setInputs((pre) => ({
            ...pre,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/product/create-product', {
                title: inputs.title, description: inputs.description, image: inputs.image, price: inputs.price, category: category,
            })

            if (data?.success) {
                toast.success('Product created successfully')
                navigate('/')

            } else {
                toast.error(data?.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Error in creation of product')
        }
    }
    console.log(category)
    return (
        <div>
            <div className="login">
                <h3 className="mb-3" >Create product</h3>
                <form onSubmit={handleSubmit}>
                    <div className="login-info">
                        <div className="mb-3">
                            <label className="form-label">title</label>
                            <input type="text" value={inputs.title} onChange={handleChange} className="form-control" name='title' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">description</label>
                            <input type="text" value={inputs.description} onChange={handleChange} className="form-control" name='description' id="exampleInputEmail1" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">image address</label>
                            <input type="text" value={inputs.image} onChange={handleChange} className="form-control" name='image' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Price</label>
                            <input type="number" value={inputs.price} onChange={handleChange} className="form-control" name='price' />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Choose category</label>
                            <select className="form-select" onChange={(e) => setCategory(e.target.value)}>
                                {categories.map((c) => (
                                    <option key={c._id} value={c._id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductCreate