import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  let foundProduct;
  let index;

  function incQty() {
    setQty((prev) => prev + 1);
  }

  function decQty() {
    setQty((prev) => {
      if (prev - 1 < 1) {
        return 1;
      }
      return prev - 1;
    });
  }

  function onAdd(product, quantity) {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    if (checkProductInCart) {
      setTotalPrice((prev) => prev + product.price * quantity);
      setTotalQuantities((prev) => prev + quantity);

      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id == product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        return cartProduct
      });
      setCartItems(updatedCartItems);
      toast.success(`${qty} ${product.name} added to the Cart.`);
    } else {
      setTotalPrice(totalPrice + product.price * quantity);
      setTotalQuantities(totalQuantities + quantity);
      // eslint-disable-next-line no-param-reassign
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);

      toast.success(`${qty} ${product.name} added`);
    }
  }

  function onRemove(product){
    foundProduct = cartItems.find(item => item._id == product._id)
    const newCartItems = cartItems.filter(item => item._id !== product._id)
    setTotalPrice(prev => prev - foundProduct.price * foundProduct.quantity)
    setTotalQuantities(prev => prev - foundProduct.quantity)
    setCartItems(newCartItems)
  }


  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = [...cartItems];

    if (value === "inc") {
      foundProduct.quantity += 1;
      newCartItems[index] = foundProduct;
      setCartItems(newCartItems)
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } 
    
    else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        foundProduct.quantity -= 1;
        newCartItems[index] = foundProduct
        setCartItems(newCartItems)
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
