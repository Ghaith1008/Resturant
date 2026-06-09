import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CountContext } from "../context/CountContext";

const ProductCard = ({ product }) => {
  // تفعيل دوال السلة والتنقل
  const { addToCart } = useContext(CountContext);
  const navigate = useNavigate();

  // معالجة البيانات والأسعار
  const formattedPrice = parseFloat(product.price).toLocaleString("en-US");

  const discountPercentage = product.discount_percentage || 25;

  const oldPriceRaw = product.old_price || 350;

  const formattedOldPrice =
    parseFloat(oldPriceRaw).toLocaleString("en-US");

  const rating = product.rating || 4.7;

  const reviewsCount = product.reviews_count || 97;

 const categoryName =
  product.category?.name || product.category_name || "";

  return (
    <div className="category-product-card">
      

      <div className="category-image-container">
        <img
          src={product.image_url}
          alt={product.name}
          className="category-product-image"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x200?text=بدون+صورة";
          }}
        />
                  <div className="home-image-overlay"></div>


        <div className="category-cat-badge">
          {categoryName}
        </div>
      </div>

      <div className="category-product-info">
        <h3 className="category-product-name">
          {product.name}
        </h3>

        <div className="category-price-container">
         

          <div className="category-new-price">
            {formattedPrice} ل.س
          </div>
        </div>

        

        {/* الأزرار */}
        <div className="category-product-actions">
          {/* زر السلة */}
          <button
            className="category-add-to-cart"
           onClick={(e) => {
    e.stopPropagation();

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
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

          {/* زر التفاصيل */}
          <button
            className="category-view-details"
            onClick={() =>
              navigate(`/product/${product.id}`)
            }
          >
            عرض التفاصيل
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;