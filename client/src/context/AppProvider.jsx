import React, {  use, useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";


axios.defaults.withCredentials = true; // Enable sending cookies with requests
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";


export const AppProvider = ({ children }) => {

 const currency = import.meta.env.VITE_CURRENCY || "$";

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState({});


//Fetch  seller Status
const fetchSeller = async  ()=>{
  try {
    const { data } = await axios.get("/api/seller/is-auth");
    if (data.success) {
      setIsSeller(true);
      
    }else{
      setIsSeller(false);
      
    }
    
  } catch (error) {
    setIsSeller(false);
    console.error("Error fetching seller status:", error);
  }
  }
 // fetch user status ,User Data and cart Items
 const fetchUser = async () => {
  try {
    const { data } = await axios.get("/api/user/is-auth");
    if (data.success) {
      setUser(data.user);
      setCartItems(data.user.cartItems );
    } else {
      setUser(null);
      setCartItems({});
    }
    
  } catch (error) {
      setUser(null);
      setCartItems({});
  }
 }


  const fetchProducts = async () => {
     try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message || "Failed to fetch products");
      }
      
     } catch (error) {
       console.error("Error fetching products:", error);
     }
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
    fetchSeller();
    fetchUser();
  },[])

  //Update Database Cart items
  
  useEffect(() => {
    const updateCart =async ()=>{
      try {
        const { data } = await axios.post("/api/cart/update", {  cartItems});
        if(!data.success){
          toast.error(data.message || "Failed to update cart");
        }
        
      } catch (error) {
        toast.error(error.message || "Failed to update cart");
      }
    }
    if (user) {
      updateCart();
    }

  },[cartItems])


  console.log("Products fetched:", products);

  const navigate = useNavigate();

  const value = { user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin, navigate, products ,
     currency , addToCart  , cartItems,updateCartItem ,removeCartItem , setProducts, setCartItems, searchQuery, setSearchQuery  ,
     getCartCount, getCartAmount , axios,fetchProducts};

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
