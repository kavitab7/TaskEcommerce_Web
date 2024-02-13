import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Category = () => {
    const [category, setCategories] = useState([])
    const navigate = useNavigate()
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get('/api/category/all-categories')
            if (data?.success) {
                setCategories(data?.categories)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllCategory()
    }, [])
    return (
        <div>all Category
            {category.map((c) => (
                <div key={c._id}>
                    <h6 >{c.name}</h6>
                    <button onClick={() => navigate(`/api/category/category-products/${c.name}`)} >Category Products</button>
                </div>

            ))}
        </div>
    )
}

export default Category