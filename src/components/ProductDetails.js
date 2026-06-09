import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CountContext } from "../context/CountContext";
import axios from "axios";

import Navbar from "./Navbar";
import Footer from "./Footer";

import cartIcon from "../assets/icons/cart.svg";

import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  // state للكمية
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CountContext);

  useEffect(() => {
    axios
      .get(`https://menu.teknova-sy.com/api/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!product) return <h2>جاري التحميل...</h2>;

  return (
    <>
      <Navbar />

      <main className="prudact-product-page">
        <div className="prudact-container prudact-product-container">

          {/* الصورة */}
          <div className="prudact-product-image">
            <img src={product.image_url} alt="" />
          </div>

          {/* المعلومات */}
          <div className="prudact-product-info">

            <div className="prudact-top-row">
              <h1>{product.name}</h1>
            </div>

            <div className="prudact-price-row">
              <p className="prudact-price">{product.price} ل.س</p>
            </div>

            <h3>الوصف</h3>

            <p className="prudact-description">
              {product.description}
            </p>

            {/* الكمية + زر السلة */}
            <div className="prudact-actions">

              <div className="prudact-quantity">
                <span>الكمية</span>

                <div className="prudact-counter">

                  {/* زيادة */}
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <span>+</span>
                  </button>

                  {/* عرض الكمية */}
                  <span>{quantity}</span>

                  {/* نقصان */}
                  <button
                    onClick={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                      }
                    }}
                  >
                    <span>-</span>
                  </button>

                </div>
              </div>

              <button
                className="prudact-add-cart"
                onClick={() => {

                  addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image_url,

                    // إرسال الكمية
                    quantity: quantity,
                  });

                }}
              >
                أضف للسلة

                <img
                  className="prudact-cart-icon"
                  src={cartIcon}
                  alt=""
                />
              </button>

            </div>

          </div>
        </div>

        <div className="prudact-notes-full">
          <h3>الملاحظات</h3>
          <textarea placeholder="اضف ملاحظاتك"></textarea>
        </div>
      </main>

      <Footer />
    </>
  );
}