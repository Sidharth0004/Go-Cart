import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';

const productRouter = express.Router();

// productRouter.post('/add' , upload.array([images]), authSeller , addProduct);

// productRouter.post('/add', upload.array(['images']), authSeller, addProduct);
// productRouter.get('/list', authSeller, productList);
// productRouter.get('/id', authSeller, productById);
// productRouter.post('/stock', authSeller, changeStock);
productRouter.post('/add', upload.array(['images']), authSeller, addProduct);   // ✅ Protected
productRouter.get('/list', productList);                                        // ✅ Public
productRouter.get('/id', productById);                                          // ✅ Public
productRouter.post('/stock', authSeller, changeStock);                          // ✅ Protected


export default productRouter;