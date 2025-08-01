import Order from "../models/Order.js";
import Product from "../models/Product.js";



//Place Order Cod : /api/order/cod
export const placeOrderCod = async (req, res) => {
    try {
        const userId = req.userId; // Assuming userId is set by authUser middleware
        const { items, address } = req.body;
        if(!userId || items.length ==0 || !address) {
            return res.status(400).json({ success: false, message: "Invalid input data" });
        }
        // Calculate amount using  Items 
        // const amount = await items.reduce(async (acc, item) => {
        //     const product = await Product.findById(item.product);
        //     return acc + item.quantity * product.price;
        // }, 0);
        const amounts = await Promise.all(
  items.map(async (item) => {
    const product = await Product.findById(item.product);
    return item.quantity * product.price;
  })
);

const amount = amounts.reduce((acc, val) => acc + val, 0);

 amount += Math.floor(amount * 0.05); // Adding 5% tax to the total amount

 await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: 'COD',
            isPaid: false
        });

        res.status(201).json({ success: true, message: "Order placed successfully" });


    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// Get  Orders by User Id :/api/order/user
export const getUserOrders = async ()=>{
    try {
        const userId = req.userId; // Assuming userId is set by authUser middleware
        const orders = await Order.find({ userId ,
            $or:[{paymentType: 'COD'},{isPaid : true}]
        }).populate('items.product address').sort({ createdAt: -1 });
        return res.status(200).json({ success: true, orders });
        
        
    } catch (error) {
        console.error("Error fetching user orders:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
        
    }
}

//Get All Orders (for seller /admin) : /api/order/all
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({  $or:[{paymentType: 'COD'},{isPaid : true}]}).populate('items.product address').sort({ createdAt: -1 });
        return res.status(200).json({ success: true, orders });
    } catch (error) {
        console.error("Error fetching all orders:", error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}