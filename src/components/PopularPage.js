import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";
import MobileBottomBar from "../components/MobileBottomBar";



// components
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./HomePage.css"

// context
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

export default function PopularPage() {
  const navigate = useNavigate();
  const { addToCart } = useContext(CountContext);
  const { setLoading } = useLoader();
  const [mostOrdered, setMostOrdered] = useState([]);

  useEffect(() => {
        setLoading(true);

    fetch("https://menu.teknova-sy.com/api/products/most-ordered?limit=20")
      .then((res) => res.json())
      .then((data) => setMostOrdered(data.data || data))
      .catch((err) => console.error(err))
          .finally(() => setLoading(false));

  }, []);

  return (
    <div className="home-home">
      <Navbar />

      

      {/* MOST ORDERED */}
      <section className="home-popular">
        <SectionTitle>الأكثر طلباً</SectionTitle>

        <div className="home-cards">
  {mostOrdered.map((item) => (
    <div
      className="category-product-card"
      key={item.id}
      onClick={() => navigate(`/product/${item.id}`)}
    >
      <div className="category-image-container">
        <img
          src={item.image_url}
          alt={item.name}
          className="category-product-image"
        />

        <div className="home-image-overlay"></div>

        <div className="category-cat-badge">
          {item.category?.name}
        </div>
      </div>

      <div className="category-product-info">
        <h3 className="category-product-name">
          {item.name}
        </h3>

        <div className="category-price-container">
          <div className="category-new-price">
            {item.price} رس
          </div>
        </div>

        <div className="category-product-actions">
          <button
            className="category-add-to-cart"
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
            أضف للسلة

            <svg
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>

          <button
            className="category-view-details"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${item.id}`);
            }}
          >
            عرض التفاصيل
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
      </section>

<div className="desktop-footer">
        <Footer />
      </div>
            <MobileBottomBar />
                </div>
  );
}