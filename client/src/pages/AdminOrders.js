import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);

    const getAllOrders = async () => {
        try {
            const timestamp = new Date().getTime();
            const { data } = await axios.get(`/api/admin/orders?_=${timestamp}`)
            console.log(data.success)
            if (data?.success) {

                setOrders(data?.orders);
            } else {
                toast.error('Error in getting orders');
            }
        } catch (error) {
            console.log(error);
            toast.error('Error in getting orders')
        }
    }
    useEffect(() => {
        getAllOrders();
        console.log(orders)
    }, [])
    return (
        <div>AdminOrders</div>
    )
}

export default AdminOrders