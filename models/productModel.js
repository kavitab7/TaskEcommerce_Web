const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category",
    },
},
    { timeseries: true });

module.exports = mongoose.model('Products', productSchema)