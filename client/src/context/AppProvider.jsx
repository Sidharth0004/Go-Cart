import React, {  useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppProvider = ({ children }) => {

 const currency = import.meta.env.VITE_CURRENCY || "$";

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});




  const fetchProducts = async () => {
    setProducts(dummyProducts)
  }

  const addToCart = (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else{
      cartData[itemId] = 1;
    }

    setCartItems(cartData);
    toast.success("Item added to cart");

  };
  //update cart Quantity
  const updateCartItem = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
      cartData[itemId] = quantity;
      setCartItems(cartData);
      toast.success("Cart updated successfully");

  };
  // Remove item from cart
  const removeCartItem = (itemId) => {
    let cartData = structuredClone(cartItems);
    if(cartData[itemId]){
       cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
    }}
 
    toast.success("Item removed from cart");
    setCartItems(cartData);
  };
  //Get Item Count
  const getCartCount = ()=>{
    let totalCount = 0;
    for(const item in cartItems){
      totalCount += cartItems[item];
    }
    return totalCount;
  }
  // Get cart Total amount
  const getCartAmount = () => {
   let totalAmount = 0;
    for(const item in cartItems){
      const product = products.find((product) => product._id === item);
      if(product){
        totalAmount += product.price * cartItems[item];
      }
    }
    return Math.floor(totalAmount * 100) / 100; // Round to two decimal places
  }

  useEffect(()=>{
    fetchProducts();
  },[])

  const navigate = useNavigate();

  const value = { user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, navigate, products ,
     currency , addToCart  , cartItems,updateCartItem ,removeCartItem , setProducts, setCartItems, searchQuery, setSearchQuery  ,
     getCartCount, getCartAmount };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
