import React,{useState} from "react";
import styles from "./AddProductModal.module.css"; // استيراد التنسيقات

const AddProductModal = ({ isOpen, onClose,categoryId,onSuccess }) => {
    const TOKEN = localStorage.getItem("myAppToken");

const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [price, setPrice] = useState("");
const [image, setImage] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", parseInt(price, 10));
    formData.append("category_id", categoryId);

    if (image) {
      formData.append("image_url", image);
    }

    const res = await fetch(
      "https://menu.teknova-sy.com/api/admin/products",
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

    console.log(data);

    if (res.ok) {
  await onSuccess?.();

  onClose();
} else {
      alert(data.message);
    }
  } catch (err) {
    console.log(err);
  }
};
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} dir="rtl">
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <h2 className={styles.title}>إضافة منتج</h2>

        <div className={styles.uploadArea}>
  {image ? (
    <div className={styles.previewWrapper}>
      <img
        src={URL.createObjectURL(image)}
        alt="preview"
        className={styles.previewImage}
      />

      <label
        htmlFor="product-image"
        className={styles.changeImageOverlay}
      >
        اختيار صورة أخرى
      </label>
    </div>
  ) : (
    <>
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="2"
        style={{ marginBottom: "12px" }}
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
      </svg>

      <label
        htmlFor="product-image"
        className={styles.uploadBtn}
      >
        تحميل صورة
      </label>

      <span
        style={{
          fontSize: "12px",
          color: "#9CA3AF",
        }}
      >
        فقط PNG, JPG, JPEG
      </span>
    </>
  )}

  <input
    id="product-image"
    type="file"
    accept="image/*"
    hidden
    onChange={(e) =>
      setImage(e.target.files[0])
    }
  />
</div>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>اسم المنتج</label>
<input
  type="text"
  placeholder="بيتزا خضار"
  value={name}
  onChange={(e) =>
    setName(e.target.value)
  }
/>          </div>

          <div className={styles.inputGroup}>
            <label>وصف المنتج</label>
<input
  type="text"
  placeholder="بيتزا خضار مقاس وسط"
  value={description}
  onChange={(e) =>
    setDescription(e.target.value)
  }
/>          </div>

          <div className={styles.inputGroup}>
            <label>سعر المنتج</label>
<input
  type="number"
  placeholder="20"
  value={price}
  onChange={(e) =>
    setPrice(e.target.value)
  }
/>          </div>

          <button type="submit" className={styles.submitBtn}>
            إضافة
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
