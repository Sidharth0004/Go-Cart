// import User from "../models/userModel.js";
import User from "../models/User.js";



//Update User CartData : /api/cart/update

export const updateCart = async (req, res) => {
    try {
        const {  cartItems } = req.body;
        const userId = req.userId; // Assuming userId is set by authUser middleware
        console.log("Updating cart for user:", userId, "with items:", cartItems);

        // Validate input
        if (!userId ) {
            return res.status(400).json({ success: false, message: "Invalid input data" });
        }

        // Update user's cart data
        await User.findByIdAndUpdate(userId, { cartItems});

        return res.status(200).json({ success: true, message: "Cart updated successfully" });

    } catch (error) {
        console.error("Error updating cart:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}