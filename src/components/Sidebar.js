import React, { useState } from "react";
import "./Sidebar.css";

import logo from "../assets/logos/logo1.svg";

import dashboardIcon from "../assets/icons/dashboard.svg";
import dashboardIconYellow from "../assets/icons/dashboard-yellow.svg";

import menuIcon from "../assets/icons/menu.svg";
import menuIconYellow from "../assets/icons/menu-yellow.svg";

import ordersIcon from "../assets/icons/orders.svg";
import ordersIconYellow from "../assets/icons/orders-yellow.svg";

import usersIcon from "../assets/icons/users.svg";
import usersIconYellow from "../assets/icons/users-yellow.svg";

import logoutIcon from "../assets/icons/logout.svg";
import home  from "../assets/icons/home.svg";
import homeYellow  from "../assets/icons/homeyellow.svg";


import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("myAppToken");
    localStorage.removeItem("adminName");
    navigate("/");
  };

  const menuItems = [
    {
      to: "/",
      label: "الصفحة الرئيسية",
      icon: home,
      iconActive: homeYellow,
      end: true,
    },
    {
      to: "/dashboard",
      label: "لوحة التحكم",
      icon: dashboardIcon,
      iconActive: dashboardIconYellow,
    },
    {
      to: "/menu",
      label: "إدارة المنيو",
      icon: menuIcon,
      iconActive: menuIconYellow,
    },
    {
      to: "/orders",
      label: "إدارة الطلبات",
      icon: ordersIcon,
      iconActive: ordersIconYellow,
    },
    {
      to: "/user",
      label: "إدارة المستخدمين",
      icon: usersIcon,
      iconActive: usersIconYellow,
    },
  ];

  return (
    <>
      <div className={`sidebar ${open ? "sidebar-active" : ""}`}>

        <div className="sidebar-close-btn" onClick={() => setOpen(false)}>
          ✕
        </div>

        {/* LOGO */}
        <div className="sidebar-logo">
          <img src={logo} alt="logo" />
        </div>

        {/* MENU */}
        <ul className="sidebar-menu">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                end={item.end}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                className={({ isActive }) =>
                  `sidebar-menu-item ${isActive ? "sidebar-active" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={
                        isActive || hoveredItem === index
                          ? item.iconActive
                          : item.icon
                      }
                      alt={item.label}
                    />
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* LOGOUT */}
        <div
          className="sidebar-logout"
          onClick={() => setShowLogoutModal(true)}
        >
          <img src={logoutIcon} alt="logout" />
          <span>تسجيل خروج</span>
        </div>
      </div>

      {/* MODAL */}
      {showLogoutModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">

            <h3>هل أنت متأكد من تسجيل الخروج؟</h3>

            <div className="logout-modal-buttons">

              <button
                className="cancel-btn"
                onClick={() => setShowLogoutModal(false)}
              >
                إلغاء
              </button>

              <button
                className="logout-confirm-btn"
                onClick={handleLogout}
              >
                تسجيل الخروج
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;