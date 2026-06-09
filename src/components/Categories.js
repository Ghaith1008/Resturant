import React from "react";
import MobileBottomBar from "../components/MobileBottomBar";

const Categories = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <section className="category-categories-container">
      {/* العنوان */}
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
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="55%" stopColor="#FFFFFF" />
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

  <span>الأصناف</span>
</div>

      <div className="category-categories-carousel">
        {/* السهم الأيمن */}
        <button className="category-nav-arrow">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        {/* عناصر التصنيفات */}
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`category-category-item ${
              activeCategory === cat.id ? "active" : ""
            }`}
            onClick={() => onSelectCategory(cat.id)}
          >
            <img
              src={cat.image_url}
              alt={cat.name}
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/110?text=بدون+صورة";
              }}
            />

            <h3>{cat.name}</h3>

            <span>{cat.products_count} صنف</span>
          </div>
        ))}

        {/* السهم الأيسر */}
        <button className="category-nav-arrow">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        
      </div>
                <MobileBottomBar />

    </section>
  );
};

export default Categories;