import React, {
  useState,
  useContext,
} from "react";

import "./CheckoutPage.css";

import { CountContext } from "../context/CountContext";
import MobileBottomBar from "../components/MobileBottomBar";


import { useNavigate } from "react-router-dom";

// icons
import phoneIcon from "../assets/icons/PhoneCall.svg";
import userIcon from "../assets/icons/user-icon.svg";
import locationIcon from "../assets/icons/site.svg";
import tableIcon from "../assets/icons/table.svg";
import trashIcon from "../assets/icons/delete.svg";

// components
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function CheckoutPage() {

  const navigate = useNavigate();

  const {
    cartItems,
    incrementQuantity,
    decrementQuantity,
    removeItem,
    totalPrice,
    count,
    setCartItems,
  } = useContext(CountContext);

  // customer info
  const [customerName, setCustomerName] =
    useState("");

  const [customerPhone, setCustomerPhone] =
    useState("");

  const [customerAddress, setCustomerAddress] =
    useState("");

  const [tableNumber, setTableNumber] =
    useState("");

  const [notes, setNotes] = useState("");

  const [loading, setLoading] =
    useState(false);
    const [successModal, setSuccessModal] =
  useState(false);

  // send order
const handleSubmitOrder = async () => {

  if (!customerName) {
    alert("أدخل اسم الزبون");
    return;
  }

  if (cartItems.length === 0) {
    alert("السلة فارغة");
    return;
  }

  try {

    setLoading(true);

    const orderData = {
      customer_name: customerName,
      customer_phone: customerPhone,
      customer_address: customerAddress,
      table_number: tableNumber,

      status: "external",

      payment_method: "cash",

      notes: notes,

      items: cartItems.map((item) => ({
        product_id: item.uuid || item.id,
        quantity: item.quantity,
      })),
    };

    console.log("ORDER DATA =>", orderData);

const response = await fetch(
  "https://menu.teknova-sy.com/api/orders/create",
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },

    body: JSON.stringify(orderData),
  }
);

let data = null;

// هون منعنا الكراش إذا الريسبونس مو JSON
const text = await response.text();

try {
  data = text ? JSON.parse(text) : {};
} catch {
  data = {};
}

console.log("RESPONSE =>", data);

if (!response.ok) {

  console.log("ERROR RESPONSE =>", data);

  alert(
    data.message || "فشل إرسال الطلب"
  );

  return;
}


    // SUCCESS
    setCartItems([]);

    // تنظيف الحقول
    setCustomerName("");
    setCustomerPhone("");
    setCustomerAddress("");
    setTableNumber("");
    setNotes("");

    // مودل النجاح
    setSuccessModal(true);

    // انتقال بعد ثانيتين
    setTimeout(() => {
      setSuccessModal(false);
      navigate("/");
    }, 3000);

  }  finally {

    setLoading(false);

  }

};

  return (
    <>
      <Navbar />

      <div className="checkout-page">

        <div className="checkout-container">

          {/* RIGHT SIDE */}
          <div className="checkout-right">

            {/* customer info */}
            <div className="customer-box">

              <h2>
                معلومات الزبون
              </h2>

              <div className="form-grid">

                {/* name */}
                <div className="input-group">

                  <label>
                    <img
                      src={userIcon}
                      alt=""
                    />

                    اسم الزبون
                  </label>

                  <input
                    type="text"
                    placeholder="اسم الزبون"
                    value={
                      customerName
                    }
                    onChange={(e) =>
                      setCustomerName(
                        e.target.value
                      )
                    }
                  />

                </div>

                {/* phone */}
                <div className="input-group">

                  <label>
                    <img
                      src={phoneIcon}
                      alt=""
                    />

                    رقم الزبون
                  </label>

                  <input
                    type="text"
                    placeholder="رقم الزبون"
                    value={
                      customerPhone
                    }
                    onChange={(e) =>
                      setCustomerPhone(
                        e.target.value
                      )
                    }
                  />

                </div>

                {/* address */}
                <div className="input-group">

                  <label>
                    <img
                      src={
                        locationIcon
                      }
                      alt=""
                    />

                    عنوان الزبون
                  </label>

                  <input
                    type="text"
                    placeholder="عنوان الزبون"
                    value={
                      customerAddress
                    }
                    onChange={(e) =>
                      setCustomerAddress(
                        e.target.value
                      )
                    }
                  />

                </div>

                {/* table */}
                <div className="input-group">

                  <label>
                    <img
                      src={tableIcon}
                      alt=""
                    />

                    رقم الطاولة
                  </label>

                  <input
                    type="text"
                    placeholder="رقم الطاولة"
                    value={
                      tableNumber
                    }
                    onChange={(e) =>
                      setTableNumber(
                        e.target.value
                      )
                    }
                  />

                </div>

              </div>
            </div>

            {/* products */}
            {cartItems.map((item) => (

              <div
                className="product-card1"
                key={
                  item.uuid ||
                  item.id
                }
              >

                {/* image */}
                <img
                  className="product-image1"
                  src={
                    item.image ||
                    item.image_url
                  }
                  alt=""
                />

                {/* info */}
                <div className="product-info1">

                  <h3>
                    {item.name}
                  </h3>

                  <p className="price1">

                    {item.price} ل.س

                  </p>

                  <div className="quantity-row1">

                    <span className="quantity-label1">
                      الكمية
                    </span>

                    {/* quantity */}
                    <div className="quantity-box1">

                      <button
                        onClick={() =>
                          incrementQuantity(
                            item.id
                          )
                        }
                      >
                        +
                      </button>

                      <span>
                        {
                          item.quantity
                        }
                      </span>

                      <button
                        onClick={() =>
                          decrementQuantity(
                            item.id
                          )
                        }
                      >
                        -
                      </button>

                    </div>

                    {/* delete */}
                    <button
                      className="trash-btn1"
                      onClick={() =>
                        removeItem(
                          item.id
                        )
                      }
                    >
                      <img
                        src={trashIcon}
                        alt=""
                      />
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>

          {/* LEFT SIDE */}
          <div className="summary-box">

            <h2>
              ملخص الطلب
            </h2>

            {/* count */}
            <div className="summary-head">

              <span>
                عدد الأصناف
              </span>

              <span>
                {count}
              </span>

            </div>

            {/* items */}
            {cartItems.map((item) => (

              <div
                className="summary-item"
                key={
                  item.uuid ||
                  item.id
                }
              >

                <span>
                  {item.name}
                </span>

                <div className="item-price">

                  <span>

                    {item.price}
                    {" × "}
                    {
                      item.quantity
                    }

                  </span>

                  <span>

                    {item.price *
                      item.quantity}

                  </span>

                </div>

              </div>
            ))}

            {/* total */}
            <div className="summary-total">

              <span>
                المجموع الكلي
              </span>

              <span>
                {totalPrice} ل.س
              </span>

            </div>

            {/* notes */}
            <textarea
              placeholder="أضف ملاحظاتك"
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
            ></textarea>

            {/* button */}
            <button
              className="confirm-btn"
              onClick={
                handleSubmitOrder
              }
              disabled={loading}
            >

              {loading
                ? "جارٍ الإرسال..."
                : "تأكيد الطلب"}

            </button>

          </div>

        </div>
      </div>

            <div className="desktop-footer">
        <Footer />
      </div>
            <MobileBottomBar />
            {successModal && (
  <div className="success-modal-overlay">

    <div className="success-modal">

      <div className="success-check">
        ✓
      </div>

      <h2>
        تم إرسال الطلب بنجاح
      </h2>

      <p>
        شكراً لطلبك ❤️
      </p>

    </div>

  </div>
)}

    </>
  );
}