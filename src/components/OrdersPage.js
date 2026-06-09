import React, { useState,useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./OrdersPage.css";
import { NavLink } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";

// images
import userImage from "../assets/images/user.jpg";
import food1 from "../assets/images/food1.svg";
import food2 from "../assets/images/food2.svg";
import logo from "../assets/logos/logo1.svg"; // ✅ نفس لوغو السايدبار

// icons
import eyeIcon from "../assets/icons/eye.svg";
import deleteIcon from "../assets/icons/delete.svg";
import filterIcon from "../assets/icons/filter.svg";
import downloadIcon from "../assets/icons/download.svg";
import bellIcon from "../assets/icons/bell.svg";
import searchIcon from "../assets/icons/search.svg";
import Topbar from "./Topbar.js";

const OrdersPage = () => {
  
const handleDeleteOrder = async () => {
  if (!selectedOrder) return;

  try {
    const res = await fetch(
      `https://menu.teknova-sy.com/api/admin/orders/${selectedOrder.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error("فشل حذف الطلب");
    }

    setOrders((prev) =>
      prev.filter((order) => order.id !== selectedOrder.id)
    );

    setShowDeleteModal(false);
    setSelectedOrder(null);

  } catch (err) {
    console.error(err);
  }
};
  const [openSidebar, setOpenSidebar] = useState(false);
  const [orders, setOrders] = useState([]);
    const { setLoading } = useLoader();
    const[showDeleteModal,setShowDeleteModal]=useState(false);
    const [selectedOrder,setSelectedOrder]=useState(null);


  const TOKEN = localStorage.getItem("myAppToken");

useEffect(() => {
  setLoading(true);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://menu.teknova-sy.com/api/admin/orders",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            Accept: "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load orders");
      }

      setOrders(Array.isArray(data.data) ? data.data : data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (TOKEN) {
    fetchOrders();
  }
}, [TOKEN]);
 
  return (
    <div className="orders-layout">

      <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

      <div className="orders-content">

        {/* 🔥 TOP BAR */}
      <Topbar setOpenSidebar={setOpenSidebar}/>

        {/* HEADER */}
        <div className="orders-header">
          <h2>الطلبات</h2>

          <div className="orders-header-actions">
            <button className="orders-btn">
              تنزيل الفاتورة
              <img src={downloadIcon} alt="" />
            </button>

            <button className="orders-btn">
              فلترة حسب
              <img src={filterIcon} alt="" />
            </button>
          </div>
        </div>

        {/* TABLE HEADER */}
        <div className="orders-table-header">
          <span>معلومات الطلب</span>
          <span>اسم العميل ونوعه</span>
          <span>السعر الكلي</span>
          <span>صورة الطلب</span>
          <span>تفاصيل الطلب</span>
          <span>صنف الطلب</span>
          <span>أزرار التحكم</span>
        </div>

        {/* ORDERS */}
{orders.map((order, index) => (
            <div key={order.id}>
            {index === 4 && <p className="orders-day-label">أمس</p>}

            <div className="orders-order-card">

              <div className="orders-order-info">
                <p>{order.id}</p>
                <span>{order.created_at}</span>
              </div>

              <div className="orders-customer">
                <img src={userImage} alt="" />
                <div>
                  <p>{order.customer_name}</p>
                  <span>زبون خارجي</span>
                </div>
              </div>

<div className="orders-price">
  {Number(order.total_amount).toLocaleString()} ل.س
</div>
              <div className="orders-order-images">
  <div className="orders-images-group">

    {order.items?.slice(0, 2).map((item) => (
      <div key={item.id} className="orders-stack-item">
        <img
          src={item.product.image_url}
          alt={item.product.name}
        />
      </div>
    ))}

    {order.items?.length > 2 && (
      <div className="orders-stack-item orders-more">
        +{order.items.length - 2}
      </div>
    )}

  </div>
</div>

<div className="orders-mobile-food-row">

  <div className="orders-details">
    <p>
      {order.items?.[0]?.product?.name || "لا يوجد منتجات"}
      {order.items?.[0]?.quantity
        ? ` × ${order.items[0].quantity}`
        : ""}
    </p>

    {order.items?.length > 1 && (
      <p className="orders-salad">
        منتجات إضافية
        <span className="orders-tag">
          +{order.items.length - 1}
        </span>
      </p>
    )}
  </div>

  <div className="orders-category">
    <p>{order.payment_method === "cash" ? "نقداً" : order.payment_method}</p>
    <span>{order.customer_address}</span>
  </div>

</div>

              <div className="orders-category">
  <p>
    {order.items?.[0]?.product?.name || "لا يوجد منتجات"}
  </p>
  <span>
    {order.items?.length > 1
      ? `+${order.items.length - 1} منتجات`
      : "منتج واحد"}
  </span>
</div>

              <div className="orders-actions">
                <div className="orders-action-btn"><img src={eyeIcon} alt="" /></div>
<div
  className="orders-action-btn"
  onClick={() =>{setSelectedOrder(order);
    setShowDeleteModal(true);
  }
}
>
  <img src={deleteIcon} alt="" />
</div>               </div>

            </div>
          </div>
        ))}
      </div>
            {showDeleteModal && (
  <div className="delete-modal-overlay">

    <div className="delete-modal">

      <h3>حذف الطلب</h3>

      <p>
        هل أنت متأكد من حذف الطلب؟
      </p>

      <div className="delete-order-id">
        {selectedOrder?.id}
      </div>

      <div className="delete-modal-actions">

        <button
          className="delete-cancel-btn"
          onClick={() => {
            setShowDeleteModal(false);
            setSelectedOrder(null);
          }}
        >
          إلغاء
        </button>

        <button
          className="delete-confirm-btn"
          onClick={handleDeleteOrder}
        >
          حذف الطلب
        </button>

      </div>

    </div>

  </div>
)}
    </div>
  );
};

export default OrdersPage;