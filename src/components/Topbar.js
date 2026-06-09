import React from "react";
import { NavLink } from "react-router-dom";

import userImage from "../assets/images/user.jpg";
import logo from "../assets/logos/logo1.svg";

import bellIcon from "../assets/icons/bell.svg";
import searchIcon from "../assets/icons/search.svg";

import "./Topbar.css";
import { useEffect, useState } from "react";

export default function Topbar({
  setOpenSidebar,
  searchPlaceholder = "بحث...",
}) {
  const [unreadCount, setUnreadCount] = useState(0);
  useEffect(() => {
  const fetchUnread = async () => {
    try {
      const token = localStorage.getItem("myAppToken");

      const res = await fetch(
        "https://menu.teknova-sy.com/api/notifications/unread",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const data = await res.json();

      const list = data?.data || [];
      setUnreadCount(list.length);

    } catch (err) {
      console.log(err);
    }
  };

  fetchUnread();
}, []);
  useEffect(() => {
  
    const token = localStorage.getItem("myAppToken");
  
    if (!token) {
      window.location.href = "/login";
    }
  
    const storedAdmin = localStorage.getItem("adminData");
  
    if (storedAdmin) {
      setAdminData(JSON.parse(storedAdmin));
    }
  
  }, []);
    const [adminData, setAdminData] = useState(null);
  
  return (
    <div className="topbar">

      {/* MENU BUTTON */}
      <div
        className="topbar-menu-btn"
        onClick={() => setOpenSidebar(true)}
      >
        ☰
      </div>

      {/* MOBILE LOGO */}
      <div className="topbar-mobile-logo">
        <img src={logo} alt="logo" />
      </div>

      {/* SEARCH */}
      <div className="topbar-search-box">
        <img src={searchIcon} alt="" />

        <input
          type="text"
          placeholder={searchPlaceholder}
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="topbar-right-group">

        {/* STATUS */}
        <div className="topbar-restaurant-status">

          <div className="topbar-dot"></div>

          <div className="topbar-status-texts">
            <p className="topbar-title">
              حالة المطعم
            </p>

            <span className="topbar-status">
              مفتوح الآن ويستقبل الطلبات
            </span>
          </div>
        </div>

        {/* NOTIFICATION */}
        <NavLink to="/notification">

          <div className="topbar-notification">
            <img src={bellIcon} alt="" />

            {unreadCount > 0 && (
  <span className="topbar-badge">
    {unreadCount}
  </span>
)}
          </div>

        </NavLink>

        {/* ADMIN */}
        <div className="topbar-admin-info">

          <NavLink to="/Admin">
<img
  src={adminData?.image || userImage}
  alt=""
/>          </NavLink>

          <div className="topbar-admin-text">
            <p>{adminData?.name || ""}</p>
            <span>admin</span>
          </div>

        </div>

      </div>
    </div>
  );
}