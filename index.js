const express = require('express')
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./dbConnection');
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const morgan = require('morgan')
const app = express();

dotenv.config()
connectDB();

app.use(express.json());
app.use(morgan('dev'))
//routes
app.use('/api/user', userRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)
app.use('/api/order', orderRoutes)

app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('Server is running');
})