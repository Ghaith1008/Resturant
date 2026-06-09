import { useState } from "react";
import logo from "../assets/logos/logo1.svg";
import cartIcon from "../assets/icons/shopping_cart.svg";
import "./Navbar.css";
import { Link,NavLink } from "react-router-dom";
import { useContext } from "react";
import { CountContext } from "../context/CountContext";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("myAppToken");
  const { count } = useContext(CountContext);

  return (
    <header className="navbar">

  {/* overlay */}
  <div
    className={`menu-overlay ${menuOpen ? "active" : ""}`}
    onClick={() => setMenuOpen(false)}
  ></div>

  <div className="container nav-content">

        <div className="nav-left">
        <div className="logo">
          <img src={logo} alt="logo1" />
        </div>

        <button
          className={`menu-btn ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
<nav className={`nav-links ${menuOpen ? "active" : ""}`}>

  <NavLink
    to="/"
    className={({ isActive }) => isActive ? "active" : ""}
  >
    القائمة
  </NavLink>

  <NavLink
    to="/category"
    className={({ isActive }) => isActive ? "active" : ""}
  >
    الأصناف
  </NavLink>

  <NavLink to="/popular">الأكثر طلباً</NavLink>
  <NavLink to="/contact">تواصل معنا</NavLink>

</nav>

        {/* Left Actions */}
        <div className="nav-actions">
<div className="cart-btn">
<Link to="/cart">
  <button className="cart-icon-btn">
    <img src={cartIcon} alt="cart icon" />
<span className="cart-count">{count}</span>
  </button>
  </Link>

  <div className="cart-text">
    <p>سلة المشتريات</p>
<span>{count} طلبات</span>
  </div>

</div>
          {token ? (
  <Link to="/dashboard">
    <button className="dashboard-btn">لوحة الإدارة</button>
  </Link>
) : (
  <Link to="/login">
    <button className="login-btn">تسجيل الدخول</button>
  </Link>
)}
        </div>

      </div>
    </header>
  );
}