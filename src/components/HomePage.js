
import React, { useState,useEffect } from "react";
import { NavLink,useNavigate,Link } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";

import "./HomePage.css";

// components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MobileBottomBar from "../components/MobileBottomBar";
// images
import hero from "../assets/images/hero.jpg";
import food from "../assets/images/food.jpg";
import logo from "../assets/logos/Logo.svg";

import pizza from "../assets/images/pizza.png";
import burger from "../assets/images/burger.png";
import sandwich from "../assets/images/sandwich.png";
import chicken from "../assets/images/chicken.png";
import juice from "../assets/images/juice.png";
import salad from "../assets/images/salad.png";
import dessert from "../assets/images/dessert.png";
import coffee from "../assets/images/coffee.png";

// icons
import homeIcon from "../assets/icons/home-icon.svg";
import categoryIcon from "../assets/icons/category-icon.svg";
import cartIcon from "../assets/icons/cart-icon.svg";
import userIcon from "../assets/icons/user-icon.svg";
import cartIconY from "../assets/icons/cart-icon-y.svg";
import categoryIconY from "../assets/icons/category-icon-y.svg";
import userIconY from "../assets/icons/user-icon-y.svg";
import { useContext } from "react";
import { CountContext } from "../context/CountContext";


const SectionTitle = ({ children }) => (

  <div className="home-section-title">
    <svg viewBox="0 0 211 84" className="home-title-border">
      <defs>
        <linearGradient
          id="titleGradient"
          gradientUnits="objectBoundingBox"
          x1="20%"
          y1="80%"
          x2="100%"
          y2="30%"
        >
          <stop offset="0%" stopColor="#f9fafb" />
          <stop offset="55%" stopColor="#f9fafb" />
          <stop offset="65%" stopColor="#FE942A" stopOpacity="0.15" />
          <stop offset="72%" stopColor="#FE942A" stopOpacity="0.35" />
          <stop offset="82%" stopColor="#FE942A" stopOpacity="0.8" />
          <stop offset="90%" stopColor="#FE942A" />
          <stop offset="100%" stopColor="#FE942A" />
        </linearGradient>
      </defs>

      <ellipse
        cx="105.5"
        cy="42"
        rx="102.5"
        ry="39"
        fill="none"
        stroke="url(#titleGradient)"
        strokeWidth="5"
      />
    </svg>

    <span>{children}</span>
  </div>
);

const HomePage = () => {
  const navigate =useNavigate();
  const [mobileMenu, setMobileMenu] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [mostOrdered, setMostOrdered] = useState([]);
const [categories, setCategories] = useState([]);
  const { addToCart } = useContext(CountContext);
  const { setLoading } = useLoader();
    const { count } = useContext(CountContext);


  useEffect(() => {
    setLoading(true);
  Promise.all([
    fetch("https://menu.teknova-sy.com/api/products/most-ordered")
      .then((res) => res.json()),

    fetch("https://menu.teknova-sy.com/api/categories")
      .then((res) => res.json()),
  ])
    .then(([productsData, categoriesData]) => {
      setMostOrdered(productsData.data || productsData);
      setCategories(categoriesData.data || categoriesData);
    })
    .catch((err) => console.error(err))
    .finally(() => setLoading(false));
}, []);




  return (
    <div className="home-home">


      <div className="home-desktop-nav">
<Navbar className="home-navbar" />      </div>

      {/* HERO */}
      <section className="home-hero">
        <img src={hero} alt="" />

  <button
  className={`home-mobile-menu-btn ${mobileMenu ? "home-active" : ""}`}
  onClick={() => setMobileMenu(!mobileMenu)}
>
  {mobileMenu ? "✕" : "☰"}
</button>
{mobileMenu && <div className="home-drawer-backdrop"></div>}

        <div className="home-overlay">
          <img src={logo} className="home-hero-logo" alt="" />
          <h1>
            نكهة مميزة تبدأ من <span>اختيارك</span>
          </h1>
        </div>
      </section>

      {/* DRAWER */}
      <div className={`home-mobile-drawer ${mobileMenu ? "home-open" : ""}`}>
    <NavLink
    onClick={()=>setMenuOpen(false)}
    to="/"
    className={({ isActive }) => isActive ? "home-active" : ""}
  >
    القائمة
  </NavLink>

  <NavLink
  onClick={()=>setMenuOpen(false)}
    to="/category"
    className={({ isActive }) => isActive ? "home-active" : ""}
  >
    الأصناف
  </NavLink>

  <NavLink onClick={()=>setMenuOpen(false)} to="/popular">الأكثر طلباً</NavLink>
  <NavLink onClick={()=>setMenuOpen(false)} to="/contact">تواصل معنا</NavLink>
</div>

      {/* MOST ORDERED */}
      <section className="home-popular" id="popular">
        <SectionTitle>الأكثر طلباً</SectionTitle>

       <div className="home-cards">
  {mostOrdered.map((item, i) => (
    // 3️⃣ داخل كارد الأكثر طلباً استبدل div الأساسي بهذا

<div
  className={`home-card ${i === 3 ? "home-mobile-only-card" : ""}`}
  key={item.id}
  style={{ cursor: "pointer" }}
>
      <div className="home-card-image">
        <div className="home-image-wrapper">
          <img src={item.image_url} alt={item.name} />
          <div className="home-image-overlay"></div>
        </div>

        <span className="home-badge">
          {item.category?.name}
        </span>

       
      </div>

      <div className="home-card-body">
        <h3>{item.name}</h3>

        <div className="home-price">
          <div className="home-new-price-row">
            <span className="home-new">
              {item.price} رس
            </span>
          </div>

          
        </div>

        <button
  onClick={(e) => {
    e.stopPropagation();

    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image_url,
      quantity: 1,
    });
  }}
>
  أضف للسلة <span>+</span>
</button>
      </div>
    </div>
  ))}
</div>
      </section>

      {/* CATEGORIES */}
        <section className="home-categories">
       <SectionTitle>الأصناف</SectionTitle>

      <div className="home-category-grid">
              {(
         categories.map((cat) => (
                      <div className="home-category-card" key={cat.id}>
                 <img
                   src={cat.image_url }
                  alt={cat.name}
                 />
                  <h3>{cat.name}</h3>
                <p>{cat.products_count } صنف</p>
              </div>
             ))
          )}
         </div>
         <Link to="/category">
         <button className="home-show-btn">
          عرض الأصناف
         </button>
         </Link>
      </section>

      <div className="home-desktop-footer">
        <Footer />
      </div>

      <MobileBottomBar />

    </div>
  );
};


export default HomePage;
