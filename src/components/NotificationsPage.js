import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./NotificationsPage.css";
import { useLoader } from "../context/LoaderContext";

import marked from "../assets/icons/marked.svg";
import DeleteIicon from "../assets/icons/delete-icon.svg";

import cartRed from "../assets/icons/cart-red.svg";
import optionsIcon from "../assets/icons/options.svg";
import stabilizingIcon from "../assets/icons/stabilizing.svg";

import Topbar from "./Topbar.js";

export default function NotificationsPage() {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [notifications, setNotifications] = useState([]);
    const { setLoading } = useLoader();
const [filter, setFilter] = useState("all"); 
// all | unread
  const TOKEN = localStorage.getItem("myAppToken");

  useEffect(() => {
      setLoading(true);

    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          "https://menu.teknova-sy.com/api/notifications/unread",
          {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              Accept: "application/json",
            },
          }
        );

        const data = await res.json();

        setNotifications(data.data || []);
        console.log(notifications[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (TOKEN) {
      fetchNotifications();
    }
  }, [TOKEN]);

  const markAsRead = async (notificationId) => {
    try {
      const formData = new FormData();
      formData.append("id", notificationId);

      const res = await fetch(
        "https://menu.teknova-sy.com/api/notifications/read",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            Accept: "application/json",
          },
          body: formData,
        }
      );

      const data = await res.json();

      console.log("READ RESPONSE =>", data);

      setNotifications((prev) =>
        prev.map((item) =>
          item.id === notificationId
            ? { ...item, is_read: true }
            : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  

  return (
    <div className="notification-layout">
      <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

      <div className="notification-content">
        <Topbar setOpenSidebar={setOpenSidebar} />

        <div className="notification-header">
          <h2>الإشعارات</h2>

          <div className="notification-header-actions">
            <button className="notification-btn">
              تمييز كمقروءة
              <img src={marked} alt="" />
            </button>

            <button className="notification-btn">
              حذف الكل
              <img src={DeleteIicon} alt="" />
            </button>
          </div>
        </div>

        <div className="notification-notifications-tabs">
          <span className="notification-active">
            جميع الإشعارات
          </span>

          <span>الكباتن</span>
          <span>الطلبات</span>
          <span>النظام</span>
        </div>

        <div className="notification-notifications-filter">
          <select
  value={filter}
  onChange={(e) => setFilter(e.target.value)}
>
  <option value="all">الكل</option>
  <option value="unread">غير المقروءة</option>
</select>
        </div>

{notifications
  .filter((n) => {
    if (filter === "unread") {
      return n.is_read === false;
    }
    return true;
  })
  .map((notification) => (          <div
            key={notification.id}
            className={`notification-notification-row ${
              notification.is_read ? "read" : ""
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="notification-notification-main">
              <div className="notification-cart-icon-box">
                <img src={cartRed} alt="" />
              </div>

              <div className="notification-notification-content">
                <h4>
                  {notification.title}

                  {!notification.is_read && (
                    <span className="unread-dot"></span>
                  )}
                </h4>

                <p>{notification.message}</p>
              </div>
            </div>

            <div className="notification-notification-left">
              <div className="notification-notification-time">
                {notification.created_at}
              </div>

              <div className="notification-notification-actions">
                <img src={stabilizingIcon} alt="" />
                <img src={optionsIcon} alt="" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}