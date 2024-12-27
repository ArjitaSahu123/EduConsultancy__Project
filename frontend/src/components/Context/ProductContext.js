import React, { createContext, useState, useContext } from 'react';


const ProductContext = createContext();


export const useProducts = () => {
  return useContext(ProductContext);
};


export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

 
  const setFetchedProducts = (products) => {
    setProducts(products);
  };


  const deleteProductById = (productId) => {
    setProducts((prevProducts) => prevProducts.filter(product => product.productId !== productId));
  };

  return (
    <ProductContext.Provider value={{ products, setFetchedProducts, deleteProductById }}>
      {children}
    </ProductContext.Provider>
  );
};
