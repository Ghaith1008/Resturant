import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./toast.css";

import HomePage from "./components/HomePage";
import ProductList from "./components/ProductDetails";
import OrdersPage from "./components/OrdersPage";
import NotificationsPage from "./components/NotificationsPage";
import AdminPage from "./components/AdminPage";
import UsersControl from "./components/UsersControl";
import ProductDetails from "./components/ProductDetails";
import Login from "./components/Login";
import CategoryProductsPage from "./components/CategoryProductsPage";
import CheckoutPage from "./components/CheckoutPage";
import PopularPage from "./components/PopularPage";
import Dashboard from "./components/Dashboard";
import MenuPage from "./components/MenuPage";

function App() {
  const token = localStorage.getItem("myAppToken");
  const lastNotificationId = useRef(null);

  useEffect(() => {
    if (!token) return;

    const fetchNotifications = async () => {
      try {
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
        const notifications = data.data || [];

        if (notifications.length > 0) {
          const newest = notifications[0];

          if (
            lastNotificationId.current &&
            newest.id !== lastNotificationId.current
          ) {
            toast.info(
              <div className="toast-body">
                
                <div className="toast-icon">📩</div>

                <div className="toast-text">
                  <div className="toast-title">{newest.title}</div>
                  <div className="toast-message">{newest.message}</div>
                </div>

              </div>
            );
          }

          lastNotificationId.current = newest.id;
        }
      } catch (err) {
        console.error("Notification Error:", err);
      }
    };

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 10000);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        newestOnTop
        closeOnClick
        pauseOnHover
        rtl={true}
        hideProgressBar={false}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryProductsPage />} />
        <Route path="/cart" element={<CheckoutPage />} />
        <Route path="/popular" element={<PopularPage />} />

        <Route path="/orders" element={token ? <OrdersPage /> : <Navigate to="/login" replace />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="/notification" element={token ? <NotificationsPage /> : <Navigate to="/login" replace />} />
        <Route path="/Admin" element={token ? <AdminPage /> : <Navigate to="/login" replace />} />
        <Route path="/user" element={token ? <UsersControl /> : <Navigate to="/login" replace />} />
        <Route path="/menu" element={token ? <MenuPage /> : <Navigate to="/login" replace />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;