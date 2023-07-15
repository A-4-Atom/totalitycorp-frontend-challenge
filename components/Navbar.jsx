import Link from "next/link";
import Image from "next/image";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart";
import { useStateContext } from "../context/stateContext";
import ramvik from '../public/ramvik.png'
const Navbar = () => {
  const {showCart, setShowCart, totalQuantities} = useStateContext();
  return (
    <div className="navbar-container">
      <div className="logo">
        <Image src={ramvik} alt="293847" height={50} width={50}/>
        <Link href="/" className="logo-name">Ramvik Pharma</Link>
      </div>
      <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;

