

import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ProductCart from '../components/ProductCart';

const AllProducts = () => {
  const { products, searchQuery } = useContext(AppContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // if (searchQuery && searchQuery.length > 0) {
    //   const query = searchQuery.toLowerCase();

    //   const results = products.filter(product => {
    //     const name = typeof product.name === 'string' ? product.name.toLowerCase() : '';
    //     const description = typeof product.description === 'string' ? product.description.toLowerCase() : '';
    //     return name.includes(query) || description.includes(query);
    //   });

    //   setFilteredProducts(results);
    // } 
    if(searchQuery.length>0){
      setFilteredProducts(products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) 
        
      ));
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  console.log("Filtered products:", filteredProducts.map(p => ({
    name: p.name,
    inStock: p.inStock
  })));

  return (
    <div className='mt-16 flex flex-col px-4'>
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl font-medium uppercase'>All Products</p>
        <div className='w-16 h-[2px] bg-primary rounded-full'></div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-8">
        {filteredProducts
          .filter(product =>
            Array.isArray(product.inStock)
              ? product.inStock.length > 0
              : product.inStock === true
          )
          .map((product, index) => (
            <ProductCart key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
