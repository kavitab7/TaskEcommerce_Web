const categoryModel = require("../models/categoryModel");
const productModel = require("../models/productModel");

//create category
const createCategory = async (req, res) => {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(401).send({ message: 'Name is required' })
        }
        const existingCategory = await categoryModel.findOne({ name })
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: 'Category Already Exisits'
            })
        }
        const category = await new categoryModel({ name }).save()
        return res.status(200).send({
            success: true,
            message: 'new category created',
            category
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: 'error is category',
        });
    }
}

//get all products by category name
const getCateProducts = async (req, res) => {
    try {
        const category = await categoryModel.findOne({ name: req.params.name });
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Category not found"
            });
        }

        const products = await productModel.find({ category: category._id });

        return res.status(200).send({
            success: true,
            category,
            products,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: " error in category products ",
            error,
        })
    }
}
//get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        return res.status(200).send({
            success: true,
            message: 'All categories :',
            categories,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            error,
            message: ' error while getting all categories',
        });
    }
};
module.exports = { createCategory, getCateProducts, getAllCategories }
