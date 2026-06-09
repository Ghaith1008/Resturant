import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./UsersControl.css";
import Topbar from "./Topbar.js";
import EditUserModal from "./EditUserModal";
import AddUserModal from "./AddUserModal";
import { useLoader } from "../context/LoaderContext";

import userImage from "../assets/images/user.jpg";
import logo from "../assets/logos/logo1.svg";

import bellIcon from "../assets/icons/bell.svg";
import searchIcon from "../assets/icons/search.svg";

import edit from "../assets/icons/edit.svg";
import delete1 from "../assets/icons/delete1.svg";

import { NavLink } from "react-router-dom";

export default function UsersControl() {
  const TOKEN = localStorage.getItem("myAppToken");

  const [Users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const [openSidebar, setOpenSidebar] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { setLoading } = useLoader();

  const [showAddModal, setShowAddModal] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });

  // ================= DELETE USER =================
  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      const res = await fetch(
        `https://menu.teknova-sy.com/api/admin/delete/user/${selectedUser.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            Accept: "application/json",
          },
        }
      );

      const text = await res.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        data = {};
      }

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      setUsers((prev) =>
        prev.filter((u) => u.id !== selectedUser.id)
      );

      setShowDeleteModal(false);
      setSelectedUser(null);

    } catch (err) {
      setError(err.message);
    }
  };

  // ================= FETCH USERS =================
  
  useEffect(() => {
    setLoading(true);

    const fetchUsers = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          "https://menu.teknova-sy.com/api/admin/users",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${TOKEN}`,
              Accept: "application/json",
            },
          }
        );

        const text = await res.text();

        let data;

        try {
          data = JSON.parse(text);
        } catch {
          throw new Error("Invalid response from server");
        }

        if (!res.ok) {
          throw new Error(data.message || "Failed to load users");
        }

        setUsers(Array.isArray(data.data) ? data.data : []);

      } catch (err) {
        setError(err.message);

      } finally {
        setLoading(false);
      }
    };

    if (TOKEN) fetchUsers();

  }, [TOKEN]);

  // ================= ADD USER =================
  const handleAddUser = async () => {
    try {
      const res = await fetch(
        "https://menu.teknova-sy.com/api/admin/add/user",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      const text = await res.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        data = {};
      }

      if (!res.ok) {
        throw new Error(data.message || "Add user failed");
      }

      setUsers((prev) => [data.data, ...prev]);

      setShowAddModal(false);

      setNewUser({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "user",
      });

    } catch (err) {
      setError(err.message);
    }
  };
const [showEditModal, setShowEditModal] = useState(false);
const ROLES = {
  STAFF: "staff",
  ADMIN: "admin",
};
const [editUser, setEditUser] = useState({
  id: "",
  name: "",
  email: "",
  phone: "",
});
// ================= UPDATE USER =================
const handleUpdateUser = async () => {
  try {
    const formData = new FormData();

    if (editUser.name) formData.append("name", editUser.name);
    if (editUser.email) formData.append("email", editUser.email);
    if (editUser.phone) formData.append("phone", editUser.phone);
    if (editUser.role) formData.append("role", editUser.role);

    // 🔥 أهم check
    if ([...formData.keys()].length === 0) {
      throw new Error("No fields to update");
    }

    const res = await fetch(
      `https://menu.teknova-sy.com/api/admin/update/user/${editUser.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: "application/json",
        },
        body: formData,
      }
    );

    const data = await res.json();

    if (!res.ok) {
      console.log(data);
      throw new Error(data.message || "Update failed");
    }

    setUsers((prev) =>
      prev.map((u) =>
        u.id === editUser.id ? data.data : u
      )
    );

    setShowEditModal(false);

  } catch (err) {
    setError(err.message);
  }
};

  return (
    <div className="users-layout">
      <Sidebar open={openSidebar} setOpen={setOpenSidebar} />

      <div className="users-content">

        {/* TOPBAR */}
        <Topbar setOpenSidebar={setOpenSidebar}/>
        

        {/* HEADER */}
        <div className="users-header">

          <h2>المستخدمين</h2>

          <button
            className="users-btn users-add-user"
            onClick={() => setShowAddModal(true)}
          >
            إضافة مستخدم
          </button>

        </div>

        
        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        {/* TABLE */}
        <div className="users-users-table">

          <div className="users-table-head">
            <span>ID</span>
            <span>صورة</span>
            <span>الاسم</span>
            <span>الإيميل</span>
            <span>الهاتف</span>
            <span>الإجراءات</span>
          </div>

            {Users.map((user) => (
              <div
                className="users-table-row"
                key={user.id}
              >
                <span>{user.id}</span>

                <span>
                  <img
                    src={user.image || userImage}
                    alt={user.name}
                    className="users-user-img"
                    onError={(e) => {
                      e.target.src = userImage;
                    }}
                  />
                </span>

                <span>{user.name}</span>
                <span>{user.email}</span>
                <span>{user.phone}</span>

                <span className="users-actions">

<img
  src={edit}
  alt="edit"
  onClick={() => {
    setEditUser({
      id: user.id,
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      role: user.role || "user",
    });

    setShowEditModal(true);
  }}
/>
                  <img
                    src={delete1}
                    alt="delete"
                    onClick={() => {
                      setSelectedUser(user);
                      setShowDeleteModal(true);
                    }}
                  />

                </span>
              </div>
            ))}
        </div>

        {/* DELETE MODAL */}
        {showDeleteModal && (
          <div className="users-modal-overlay">

            <div className="users-modal">

              <p>
                هل تريد حذف المستخدم؟
                <br />
                <strong>{selectedUser?.name}</strong>
              </p>

              <div className="users-modal-actions">

                <button className="cancel-btn"
                  onClick={() => setShowDeleteModal(false)}
                >
                  إلغاء
                </button>

                <button className="delete-btn" onClick={handleDelete}>
                  حذف
                </button>

              </div>

            </div>
          </div>
        )}

        {/* ADD USER MODAL */}
        <AddUserModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          newUser={newUser}
          setNewUser={setNewUser}
          handleAddUser={handleAddUser}
        />
<EditUserModal
  isOpen={showEditModal}
  onClose={() => setShowEditModal(false)}
  editUser={editUser}
  setEditUser={setEditUser}
  handleUpdateUser={handleUpdateUser}
/>
      </div>
    </div>
  );
}