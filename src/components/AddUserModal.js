import React, { useState } from "react";
import styles from "./AddUserModal.module.css";

const AddUserModal = ({
  isOpen,
  onClose,
  newUser,
  setNewUser,
  handleAddUser,
}) => {

  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>

      <div className={styles.modalContainer} dir="rtl">

        <button
          className={styles.closeButton}
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className={styles.title}>
          إضافة مستخدم
        </h2>

        <div className={styles.formWrapper}>

          <form onSubmit={(e) => e.preventDefault()}>

            {/* الاسم */}
            <div className={styles.inputGroup}>
              <label>الاسم الكامل</label>

              <input
                type="text"
                placeholder="الاسم والكنية"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    name: e.target.value,
                  })
                }
              />
            </div>

            {/* الهاتف */}
            <div className={styles.inputGroup}>
              <label>رقم الهاتف</label>

              <input
                type="text"
                placeholder="+963 999999999"
                style={{ direction: "ltr" }}
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    phone: e.target.value,
                  })
                }
              />
            </div>

            {/* الإيميل */}
            <div className={styles.inputGroup}>
              <label>البريد الإلكتروني</label>

              <input
                type="email"
                placeholder="example@gmail.com"
                style={{ direction: "ltr" }}
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    email: e.target.value,
                  })
                }
              />
            </div>

            {/* كلمة المرور */}
            <div className={styles.inputGroup}>
              <label>كلمة المرور</label>

              <div className={styles.passwordWrapper}>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="************"
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      password: e.target.value,
                    })
                  }
                />

                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  👁️
                </button>

              </div>
            </div>

            {/* ROLE */}
            <div className={styles.inputGroup}>

              <label>الصلاحية</label>

              <select
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({
                    ...newUser,
                    role: e.target.value,
                  })
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>

            </div>

            {/* BUTTON */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >

              <button
                type="button"
                className={styles.submitBtn}
                onClick={handleAddUser}
              >
                إضافة
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default AddUserModal;