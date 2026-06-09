import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { CountContext } from "../context/CountContext";
import "./MobileBottomBar.css";

import homeIcon from "../assets/icons/home-icon.svg";
import homeIconY from "../assets/icons/home-icon-y.svg";

import categoryIcon from "../assets/icons/category-icon.svg";
import categoryIconY from "../assets/icons/category-icon-y.svg";

import cartIcon from "../assets/icons/cart-icon.svg";
import cartIconY from "../assets/icons/cart-icon-y.svg";

const MobileBottomBar = () => {
  const location = useLocation();
  const { count } = useContext(CountContext);

  return (
    <div className="home-mobile-bottom-bar">

      <Link to="/">
        <button className={location.pathname === "/" ? "active" : ""}>
          <img src={homeIcon} className="home-icon-default" alt="" />
          <img src={homeIconY} className="home-icon-hover" alt="" />
          <p>الرئيسية</p>
        </button>
      </Link>

      <Link to="/category">
        <button className={location.pathname === "/category" ? "active" : ""}>
          <img src={categoryIcon} className="home-icon-default" alt="" />
          <img src={categoryIconY} className="home-icon-hover" alt="" />
          <p>الأصناف</p>
        </button>
      </Link>

      <Link to="/cart">
        <button className={location.pathname === "/cart" ? "active cart-icon-btn" : "cart-icon-btn"}>
          
          <div className="cart-icon-wrapper">
            <img src={cartIcon} className="home-icon-default" alt="" />
            <img src={cartIconY} className="home-icon-hover" alt="" />

            <span className="cart-count">{count}</span>
          </div>

          <p>السلة</p>
        </button>
      </Link>

    </div>
  );
};

export default MobileBottomBar;