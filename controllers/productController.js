const productModel = require("../models/productModel");

const createProduct = async (req, res) => {
    try {
        const { title, description, image, price, category } = req.body;
        switch (true) {
            case !title:
                return res.status(500).send({ error: 'Name is required' })
            case !description:
                return res.status(500).send({ error: 'description is required' })
            case !image:
                return res.status(500).send({ error: 'photo is required' })
            case !price:
                return res.status(500).send({ error: 'price is required' })
            case !category:
                return res.status(500).send({ error: 'category is required' })
        }

        const product = new productModel({ title, description, image, price, category });
        await product.save();
        return res.status(201).send({
            success: true,
            message: "product creates successfully",
            product,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: " error in creating product",
            error,
        })
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('category').sort({ createdAt: -1 });

        return res.status(200).send({
            success: true,
            count: products.length,
            message: 'All products ',
            products,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: ' error while getting all products',
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { title, description, image, price, category } = req.body;
        switch (true) {
            case !title:
                return res.status(500).send({ error: 'Name is required' })
            case !description:
                return res.status(500).send({ error: 'description is required' })
            case !image:
                return res.status(500).send({ error: 'photo is required' })
            case !price:
                return res.status(500).send({ error: 'price is required' })
            case !category:
                return res.status(500).send({ error: 'category is required' })
        }

        const products = await productModel.findByIdAndUpdate(req.params.pid, {
            title, description, image, price, category
        }, { new: true }
        );

        await products.save();
        return res.status(201).send({
            success: true,
            message: "product updated successfully",
            products,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: " error in updating product",
            error,
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.pid)
        return res.status(200).send({
            success: true,
            message: 'product deleted successfully :',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: ' error while getting deleting product',
        });
    }
};


module.exports = { createProduct, getAllProducts, deleteProduct, updateProduct }