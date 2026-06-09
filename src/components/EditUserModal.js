import React from "react";
import styles from "./AddUserModal.module.css";

const EditUserModal = ({
  isOpen,
  onClose,
  editUser,
  setEditUser,
  handleUpdateUser,
}) => {

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
          تعديل المستخدم
        </h2>

        <div className={styles.formWrapper}>

          <form onSubmit={(e) => e.preventDefault()}>

            {/* الاسم */}
            <div className={styles.inputGroup}>
              <label>الاسم الكامل</label>

              <input
                type="text"
                placeholder="الاسم والكنية"
                value={editUser.name}
                onChange={(e) =>
                  setEditUser({
                    ...editUser,
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
                value={editUser.phone}
                onChange={(e) =>
                  setEditUser({
                    ...editUser,
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
                value={editUser.email}
                onChange={(e) =>
                  setEditUser({
                    ...editUser,
                    email: e.target.value,
                  })
                }
              />
            </div>

            {/* ROLE */}
            <div className={styles.inputGroup}>

              <label>الصلاحية</label>

              <select
                value={editUser.role}
                onChange={(e) =>
                  setEditUser({
                    ...editUser,
                    role: e.target.value,
                  })
                }
              >
                <option value="staff">User</option>
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
                onClick={handleUpdateUser}
              >
                حفظ التعديلات
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
