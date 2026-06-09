import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./AdminPage.css";
import Topbar from "./Topbar.js";

import userImage from "../assets/images/user.jpg";
import logo from "../assets/logos/logo1.svg";
import admin from "../assets/images/admin.svg";

import bellIcon from "../assets/icons/bell.svg";
import searchIcon from "../assets/icons/search.svg";


import user1 from "../assets/icons/user-icon.svg";
import UserFocus from "../assets/icons/UserFocus.svg";
import PhoneCall from "../assets/icons/PhoneCall.svg";
import reset from "../assets/icons/reset.svg";
import email from "../assets/icons/email.svg";
import site from "../assets/icons/site.svg";
import { NavLink } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";

export default function AdminPage() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [adminData, setAdminData] = useState(null);
      const { setLoading } = useLoader();
  
useEffect(() => {
  setLoading(true);

  const token = localStorage.getItem("myAppToken");

  if (!token) {
    window.location.href = "/login";
  }

  const storedAdmin = localStorage.getItem("adminData");

  if (storedAdmin) {
    setAdminData(JSON.parse(storedAdmin));
  }
  setLoading(false);

}, []);
<svg width="0" height="0">
  <defs>
    <linearGradient
      id="adminGradient"
      x1="0%"
      y1="100%"
      x2="100%"
      y2="0%"
    >
      <stop offset="0%" stopColor="#ff8a00" />
      <stop offset="30%" stopColor="#ffb347" />
      <stop offset="70%" stopColor="#f4e4d5" />
      <stop offset="100%" stopColor="#ffffff" />
    </linearGradient>
  </defs>
</svg>
  return (
    <div className="admin-layout">
      <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

      <div className="admin-content">
        {/* TOPBAR */}
              <Topbar setOpenSidebar={setOpenSidebar}/>
        

        {/* HEADER */}
        <div className="admin-header">
          <h2>معلومات حسابك</h2>
          <p className="admin-sub-title">هذه معلومات أساسية عن حسابك</p>
        </div>

        {/* PROFILE */}
        <div className="admin-profile-container">

          <div className="admin-profile-top">
<img
  src={adminData?.image || admin}
  className="admin-profile-img"
  alt=""
/>
            <div className="admin-profile-actions">
              <button className="admin-btn admin-update">تحديث</button>
              <button className="admin-btn admin-delete">حذف</button>
            </div>
          </div>

          <div className="admin-profile-form">

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label><img src={user1} />الاسم الكامل</label>
<input
  type="text"
  value={adminData?.name || ""}
  readOnly
/>              </div>

              <div className="admin-form-group">
                <label><img src={UserFocus} />اسم الحساب</label>
<input
  type="text"
  value={adminData?.name || ""}
  readOnly
/>               </div>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label><img src={PhoneCall} />رقم الهاتف</label>
<input
  type="text"
  value={adminData?.phone || "لا يوجد رقم"}
  readOnly
/>              </div>

              <div className="admin-form-group">
                <label><img src={email} />البريد الإلكتروني</label>
<input
  type="text"
  value={adminData?.email || ""}
  readOnly
/>              </div>
            </div>

            <div className="admin-form-group admin-full">
              <label><img src={site} />العنوان</label>
              <textarea placeholder="ادخل العنوان بالتفصيل"></textarea>
            </div>

            <button className="admin-reset-password">
              <img src={reset} />إعادة تعيين كلمة المرور
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}