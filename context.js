import React, { useState, useEffect, createContext, Component } from "react";
import { storeProducts, detailProduct } from "./data";

export const ProductContext = createContext();

export const ProductProvider = (props) => {
  const [details, setDetails] = useState(detailProduct);
  const [products, setProducts] = useState(storeProducts);
  const [cart, setCart] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(details);
  const getItem = (id) => {
    const item = products.find((i) => i.id == id);
    return item;
  };

  function handleDetails(id) {
    const product = getItem(id);
    setDetails(product);
  }

  function addToCart(id) {
    const index = products.indexOf(getItem(id));
    const product = products[index];
    product.inCart = true;
    product.count = 1;
    product.total = product.price;
    setCart((prv) => [...prv, product]);
    console.log(products);
  }
  function openModal(id) {
    const product = getItem(id);
    setModalProduct(product);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
  }
  return (
    <ProductContext.Provider
      // value={[
      //   products,
      //   setProducts,
      //   details,
      //   setDetails,
      //   addToCart,
      //   handleDetails,
      //   modalOpen,
      //   openModal,
      //   closeModal,
      // ]}
      value={{
        products,
        setProducts,
        details,
        setDetails,
        addToCart,
        handleDetails,
        modalOpen,
        openModal,
        closeModal,
        modalProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
