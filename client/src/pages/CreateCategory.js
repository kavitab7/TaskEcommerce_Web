import React, { useState } from 'react'
import axios from 'axios'
import toast from "react-hot-toast";
import Menu from '../components/Menu'

const CreateCategory = () => {
    const [cname, setName] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/category/create-category', {
                name: cname
            })
            if (data.success) {
                setName(data.category)
                toast.success('category created successfully')
            } else {
                toast.error(data?.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Error in creating category')
        }
    }
    return (
        <div>
            <Menu />
            <div className="col-md-9">
                <div className="card w-75 p-3">
                    <h3 className="mb-3" >Create Category</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="login-info">
                            <div className="mb-3">
                                <input type="text" value={cname} onChange={(e) => setName(e.target.value)} className="form-control" name='name' id="exampleInputEmail1" />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateCategory