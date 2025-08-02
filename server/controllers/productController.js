import {v2 as cloudinary} from 'cloudinary';
import Product from '../models/Product.js';


// Add Product : /api/product/add
export const addProduct = async (req, res) => {
    try {
        let productData = JSON.parse(req.body.productData);
        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async (image) => {
                const result = await cloudinary.uploader.upload(image.path , {resource_type: "image"});
                return result.secure_url;
            })
        );

        await Product.create({
            ...productData,
            image: imagesUrl
        });
        res.status(201).json({ success: true, message: "Product added successfully" });

    } catch (error) {
        console.error("Error adding product:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
        
    }

}

// Get Product : /api/product/list
export const productList = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true,  products });
    } catch (error) {
        console.error("Error fetching products:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
        
    }

}

// Get Singlr Product : /api/product/id
export const productById = async (req, res) => {

    try {
        const { id } = req.body;
        const product = await Product.findById(id);
         res.status(200).json({ success: true, data: product });
        
    } catch (error) {
        console.error("Error fetching product by ID:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
        
    }
}

// Change Product inStock : /api/product/stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
          await Product.findByIdAndUpdate(id ,{inStock});
      
        res.status(200).json({ success: true, message: "Product stock updated successfully" });

    } catch (error) {
        console.error("Error changing product stock:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
        
    }

}