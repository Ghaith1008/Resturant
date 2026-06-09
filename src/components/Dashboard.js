import React, { useState,useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./Dashboard.css";
import { NavLink } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";

// images
import userImage from "../assets/images/user.jpg";
import food1 from "../assets/images/food1.svg";
import food2 from "../assets/images/food2.svg";
import logo from "../assets/logos/logo1.svg"; // ✅ نفس لوغو السايدبار
import revenueIcon from "../assets/icons/revenue.svg";
import preparingIcon from "../assets/icons/preparing.svg";
import ordersIcon from "../assets/icons/orders-icon.svg";
import statsIcon from "../assets/icons/stats.svg";

// icons
import eyeIcon from "../assets/icons/eye.svg";
import deleteIcon from "../assets/icons/delete.svg";
import filterIcon from "../assets/icons/filter.svg";
import downloadIcon from "../assets/icons/download.svg";
import bellIcon from "../assets/icons/bell.svg";
import searchIcon from "../assets/icons/search.svg";
import Topbar from "./Topbar.js";
import {
  LineChart,
  Line,
  Area,
  AreaChart,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis
} from "recharts";
const lineData = [
  { day: "30", value: 9000 },
  { day: "25", value: 20000 },
  { day: "20", value: 10000 },
  { day: "15", value: 30000 },
  { day: "10", value: 8000 },
  { day: "5", value: 6000 },
];

const pieData = [
  { name: "شاورما", value: 52.1, color: "#F4C94E" },
  { name: "بيتزا", value: 22.8, color: "#FF9C2E" },
  { name: "مندي دجاج", value: 13.9, color: "#4CAF50" },
  { name: "أطباق أخرى", value: 11.2, color: "#5B6CE1" },
];


const Dashboard = () => {
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

console.log(data);
console.log(data.data?.[0]?.status);
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
      {/* ================= GENERAL STATS ================= */}
<div className="orders-stats-section">

  <div className="orders-stats-title-row">
    <h2>إحصائيات عامة</h2>

    <select className="orders-stats-filter">
      <option>اليوم</option>
      <option>الأسبوع</option>
      <option>الشهر</option>
    </select>
  </div>

  <div className="orders-stats-grid">


  <div className="orders-stat-card stats">

    <div className="orders-stat-top">
      <h4>الإحصائيات</h4>
      <img src={statsIcon} alt="" />
    </div>

    <div className="orders-stat-bottom">
      <span className="orders-stat-growth">↗ 11.09%</span>
      <span className="orders-stat-number">7.23</span>
    </div>

  </div>


  <div className="orders-stat-card orders">

    <div className="orders-stat-top">
      <h4>الطلبات</h4>
      <img src={ordersIcon} alt="" />
    </div>

    <div className="orders-stat-bottom">
      <span className="orders-stat-growth">↗ 11.09%</span>
      <span className="orders-stat-number">30</span>
    </div>

  </div>
  <div className="orders-stat-card preparing">

    <div className="orders-stat-top">
      <h4>قيد التحضير</h4>
      <img src={preparingIcon} alt="" />
    </div>

    <div className="orders-stat-bottom">
      <span className="orders-stat-growth">↗ 11.09%</span>
      <span className="orders-stat-number">205</span>
    </div>

  </div>


  <div className="orders-stat-card revenue">

    <div className="orders-stat-top">
      <h4>الإيرادات</h4>
      <img src={revenueIcon} alt="" />
    </div>

    <div className="orders-stat-bottom">
      <span className="orders-stat-growth">↗ 11.09%</span>
      <span className="orders-stat-number">7,203</span>
    </div>

  </div>

</div>
</div>

{/* ================= CHARTS ================= */}
<div className="orders-charts-section">
  <div className="orders-pie-chart-card">

    <h3>الأطباق الأكثر طلباً</h3>

    <div className="orders-donut-wrapper">

  <ResponsiveContainer width={160} height={160}>
    <PieChart>

      <Pie
        data={pieData}
        dataKey="value"
        innerRadius={42}
        outerRadius={70}
        paddingAngle={3}
      >
        {pieData.map((entry, index) => (
          <Cell
            key={index}
            fill={entry.color}
          />
        ))}
      </Pie>

      <Tooltip />

    </PieChart>
  </ResponsiveContainer>

  <div className="orders-donut-list">

    {pieData.map((item,index)=>(
  <div className="orders-donut-row" key={index}>

    <div className="orders-item-name">
      <span style={{ background:item.color }}></span>
      <p>{item.name}</p>
    </div>

    <strong>{item.value}%</strong>

  </div>
))}

  </div>

</div>

  </div>

  <div className="orders-line-chart-card">

    <div className="orders-chart-header">
      <h3>أداء الطلبات خلال هذا الشهر</h3>
<select className="orders-chart-filter">
  <option>الشهر</option>
</select>    </div>

    <div className="orders-real-chart">

  <ResponsiveContainer width="100%" height={290}>
<AreaChart
  data={lineData}
  margin={{
    top: 10,
    right: 0,
    left: 0,
    bottom: 0
  }}
>      <defs>
        <linearGradient id="ordersGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FE942A" stopOpacity={0.4}/>
          <stop offset="100%" stopColor="#FE942A" stopOpacity={0}/>
        </linearGradient>
      </defs>

      <Tooltip />

      <Area
        type="monotone"
        dataKey="value"
        stroke="#FE942A"
        strokeWidth={3}
        fill="url(#ordersGradient)"
      />

      <Line
        type="monotone"
        dataKey="value"
        stroke="#FE942A"
        strokeWidth={3}
        dot={false}
      />
      <CartesianGrid
  stroke="#ECECEC"
  vertical={false}
/>

<XAxis
  dataKey="day"
  tickLine={false}
  axisLine={false}
/>

<YAxis
  tickLine={false}
  axisLine={false}
  orientation="right"
  domain={[0, 30000]}
  ticks={[0, 10000, 20000, 30000]}
  width={55}
/>
    </AreaChart>
  </ResponsiveContainer>

</div>

  </div>

  

</div>



        {/* HEADER */}
        <div className="orders-header">
          {/* ================= GENERAL STATS ================= */}

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
</div>              </div>

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

export default Dashboard;