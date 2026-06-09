import { useEffect, useRef,useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../context/LoaderContext";

import AddProductModal from "./AddProductModal";
import optionsIcon from "../assets/icons/options.svg";

import "./MenuPage.css";

export default function MenuPage() {
  const [openSidebar, setOpenSidebar] = useState(false);

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [activeCategory, setActiveCategory] = useState(null);

  const TOKEN = localStorage.getItem("myAppToken");
  const [categoryMenu, setCategoryMenu] = useState(null);
const [productMenu, setProductMenu] = useState(null);
    const { setLoading } = useLoader();
    const categoryMenuRef = useRef();
const productMenuRef = useRef();

  const navigate = useNavigate();

const editCategory = (cat) => {
  setEditingCategory({
    id: cat.id,
    name: cat.name || "",
    description: cat.description || "",
    image: null,
  });

  setShowCategoryModal(true);
};

const deleteCategory = (id) => {
  setDeleteTarget(id);
  setDeleteType("category");
  setShowDeleteModal(true);
};

const showProductDetails = (product) => {
  console.log("Details", product);
};

const editProduct = (product) => {
  setEditingProduct({
    id: product.id,
    name: product.name || "",
    price: product.price || "",
    description: product.description || "",
  });

  setShowProductModal(true);
};

const deleteProduct = (id) => {
  setDeleteTarget(id);
  setDeleteType("product");
  setShowDeleteModal(true);
};
const loadAll = async () => {
  try {
    setLoading(true);

    await Promise.all([
      loadCategories(),
      loadProducts()
    ]);

  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    loadAll();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await fetch(
        "https://menu.teknova-sy.com/api/admin/categories",
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            Accept: "application/json",
          },
        }
      );

      const data = await res.json();

      const cats = data.data || [];

      setCategories(cats);

      if (cats.length) {
        setActiveCategory(cats[0].id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const loadProducts = async () => {
    try {
      const res = await fetch(
        "https://menu.teknova-sy.com/api/admin/products",
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            Accept: "application/json",
          },
        }
      );

      const data = await res.json();

      setProducts(data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredProducts = products.filter(
    (item) => item.category_id === activeCategory
  );
const [showCategoryModal, setShowCategoryModal] = useState(false);
const [showProductModal, setShowProductModal] = useState(false);
const [showAddProductModal, setShowAddProductModal] =
  useState(false);
  const [showAddCategory, setShowAddCategory] =
  useState(false);

const [categoryName, setCategoryName] =
  useState("");

const [categoryDescription, setCategoryDescription] =
  useState("");

const [categoryStatus, setCategoryStatus] =
  useState("active");

const [categoryImage, setCategoryImage] =
  useState(null);

const [editingCategory, setEditingCategory] = useState({
  id: "",
  name: "",
  description: "",
  image: null,
});

const [editingProduct, setEditingProduct] = useState({
  id: "",
  name: "",
  price: "",
  description: "",
});
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteTarget, setDeleteTarget] = useState(null);
const [deleteType, setDeleteType] = useState(null);
const updateCategory = async () => {
  try {
    const formData = new FormData();

    formData.append("_method", "PUT");
    formData.append("name", editingCategory.name);
    formData.append(
      "description",
      editingCategory.description
    );

    if (editingCategory.image) {
      formData.append(
        "image_url",
        editingCategory.image
      );
    }

    const res = await fetch(
      `https://menu.teknova-sy.com/api/admin/categories/${editingCategory.id}`,
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

      setShowCategoryModal(false);

      loadCategories();
    }
  } catch (err) {
    console.log(err);
  }
};
const updateProduct = async () => {
  try {
    const payload = {
      name: editingProduct.name,
      price: parseInt(editingProduct.price, 10),
      description: editingProduct.description,
    };

    const res = await fetch(
      `https://menu.teknova-sy.com/api/admin/products/${editingProduct.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (res.ok) {

      setShowProductModal(false);

      await loadProducts();
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.log(err);
  }
};
const handleAddCategory = async () => {

  try {

    const formData = new FormData();

    formData.append("name", categoryName);

    formData.append(
      "description",
      categoryDescription
    );

    formData.append(
      "status",
      categoryStatus
    );

    if (categoryImage) {
      formData.append(
        "image_url",
        categoryImage
      );
    }

    const res = await fetch(
      "https://menu.teknova-sy.com/api/admin/categories",
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

    // إعادة تحميل الأقسام
    loadCategories();

    // إغلاق المودال
    setShowAddCategory(false);

    // تنظيف الحقول
    setCategoryName("");
    setCategoryDescription("");
    setCategoryStatus("active");
    setCategoryImage(null);

  } catch (err) {
    console.log(err);
  }
};
const handleDelete = async () => {
  try {
    const url =
      deleteType === "category"
        ? `https://menu.teknova-sy.com/api/admin/categories/${deleteTarget}`
        : `https://menu.teknova-sy.com/api/admin/products/${deleteTarget}`;

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/json",
      },
    });

    if (res.ok) {

      if (deleteType === "category") {
        loadCategories();
      } else {
        loadProducts();
      }

      setShowDeleteModal(false);
      setDeleteTarget(null);
      setDeleteType(null);
    }
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  const handleClickOutside = (e) => {
    if (!e.target.closest(".options-menu") &&
        !e.target.closest(".category-options") &&
        !e.target.closest(".product-options")) {
      setCategoryMenu(null);
      setProductMenu(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
  return (
    <div className="menu-layout">

      <Sidebar
        open={openSidebar}
        setOpen={setOpenSidebar}
      />

      <div className="menu-content">

        <Topbar
          setOpenSidebar={setOpenSidebar}
        />

        {/* CATEGORIES */}

        <div className="menu-section-head">
          <h2>الأصناف</h2>

<button
  className="menu-add-btn"
  onClick={() => setShowAddCategory(true)}
>
  إضافة قسم
</button>
        </div>

        <div className="menu-categories">

          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`menu-category ${
                activeCategory === cat.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                setActiveCategory(cat.id)
              }
            >

<button
  className="category-options"
  onClick={(e) => {
    e.stopPropagation();
    setCategoryMenu(
      categoryMenu === cat.id ? null : cat.id
    );
    setProductMenu(null);
  }}
>
                  <img
                  src={optionsIcon}
                  alt=""
                />
              </button>
              {categoryMenu === cat.id && (
  <div className="options-menu">

    <button
      onClick={() => editCategory(cat)}
    >
      تعديل
    </button>

    <button
      className="delete-btn"
      onClick={() => deleteCategory(cat.id)}
    >
      حذف
    </button>

  </div>
)}

              <div className="category-image-wrap">
                <img
                  src={cat.image_url}
                  alt={cat.name}
                />
              </div>

              <h3>{cat.name}</h3>

              <span>
                {cat.products_count || 0} صنف
              </span>

            </div>
          ))}

        </div>

        {/* PRODUCTS */}

        <div className="menu-section-head products-head">
          <h2>المنتجات</h2>

          <button
  className="menu-add-btn"
  onClick={() =>
    setShowAddProductModal(true)
  }
>
  إضافة منتج
</button>
        </div>

        <div className="menu-products">

          {filteredProducts.map((product) => (
            <div
              className="product-card"
              key={product.id}
            >

 <button
  className="product-options"
  onClick={(e) => {
    e.stopPropagation();
    setProductMenu(
      productMenu === product.id
        ? null
        : product.id
    );
  }}
>
  <img
    src={optionsIcon}
    alt=""
  />
</button>

{productMenu === product.id && (
  <div className="options-menu">
    <button
            className="category-view-details"
            onClick={() =>
              navigate(`/product/${product.id}`)
            }
          >
            عرض التفاصيل
          </button>

    <button
      onClick={() =>
        editProduct(product)
      }
    >
      تعديل
    </button>

    <button
      className="delete-btn"
      onClick={() =>
        deleteProduct(product.id)
      }
    >
      حذف
    </button>
  </div>
)}

              <div className="product-image-wrap">
                <img
                  src={product.image_url}
                  alt={product.name}
                />
              </div>

              <div className="product-info">

                <h3>{product.name}</h3>

                <p>
                  {Number(product.price).toLocaleString()} ل.س
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
{showCategoryModal && (
  <div className="edit-category-overlay">

    <div className="edit-category-modal">

      <h2>تعديل بيانات الصنف</h2>

      <div className="edit-category-divider"></div>

      <div className="edit-category-body">

        {/* الصورة */}

        <div className="edit-category-image-section">

          <label>صورة الصنف</label>

          <div className="edit-category-image-box">

            <img
              src={
                editingCategory.image
                  ? URL.createObjectURL(editingCategory.image)
                  : categories.find(
                      (c) =>
                        c.id === editingCategory.id
                    )?.image_url
              }
              alt=""
            />

            <label
              htmlFor="editCategoryImage"
              className="change-image-overlay"
            >
              تغيير الصورة
            </label>

            <input
              id="editCategoryImage"
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  image: e.target.files[0],
                })
              }
            />
          </div>

        </div>

        {/* البيانات */}

        <div className="edit-category-fields">

          <div className="field-group">

            <label>اسم الصنف</label>

            <input
              type="text"
              value={editingCategory.name}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  name: e.target.value,
                })
              }
            />

          </div>

          <div className="field-group">

            <label>الوصف</label>

            <textarea
              placeholder="أدخل وصف الصنف..."
              value={editingCategory.description}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  description:
                    e.target.value,
                })
              }
            />

          </div>

        </div>

      </div>

      <div className="edit-category-divider"></div>

      <div className="edit-category-footer">

        <button
          className="save-category-btn"
          onClick={updateCategory}
        >
          حفظ التغييرات
        </button>

        <button
          className="cancel-category-btn"
          onClick={() =>
            setShowCategoryModal(false)
          }
        >
          إلغاء
        </button>

      </div>

    </div>

  </div>
)}
{showProductModal && (
  <div className="product-edit-overlay">

    <div className="product-edit-modal">

      <button
        className="product-edit-close"
        onClick={() =>
          setShowProductModal(false)
        }
      >
        ×
      </button>

      <h2>تعديل بيانات المنتج</h2>

      <div className="product-edit-form">

        <div className="product-edit-field">

          <label>اسم المنتج</label>

          <input
            type="text"
            value={editingProduct.name}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                name: e.target.value,
              })
            }
          />

        </div>

        <div className="product-edit-field">

          <label>سعر المنتج</label>

          <input
            type="number"
            value={editingProduct.price}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                price: e.target.value,
              })
            }
          />

        </div>

        <div className="product-edit-field">

          <label>الوصف</label>

          <textarea
            value={editingProduct.description}
            onChange={(e) =>
              setEditingProduct({
                ...editingProduct,
                description: e.target.value,
              })
            }
          />

        </div>

      </div>

      <div className="product-edit-actions">

        <button
          className="product-save-btn"
          onClick={updateProduct}
        >
          حفظ التعديلات
        </button>

        <button
          className="product-cancel-btn"
          onClick={() =>
            setShowProductModal(false)
          }
        >
          إلغاء
        </button>

      </div>

    </div>

  </div>
)}
<AddProductModal
  isOpen={showAddProductModal}
  onClose={() =>
    setShowAddProductModal(false)
  }
  categoryId={activeCategory}
  onSuccess={() => {
    loadProducts();
  }}
/>
{/* ADD CATEGORY MODAL */}
{showAddCategory && (
<div className="add-category-overlay">

  <div className="add-category-modal">

    {/* HEADER */}

    <div className="add-category-header">

      <button
  className="add-category-close"
  onClick={() => setShowAddCategory(false)}
>
  ×
</button>

      <h2>إضافة قسم جديد</h2>

    </div>

    {/* FORM */}

    <div className="add-category-form">

      {/* NAME */}

      <div className="add-category-field">

        <label>
          اسم القسم *
        </label>

        <input
  type="text"
  placeholder="مثال: مشروبات"
  value={categoryName}
  onChange={(e) =>
    setCategoryName(e.target.value)
  }
/>

      </div>

      {/* DESCRIPTION */}

      <div className="add-category-field">

        <label>
          الوصف (اختياري)
        </label>

        <textarea
  placeholder="اكتب وصفاً مختصراً للقسم..."
  value={categoryDescription}
  onChange={(e) =>
    setCategoryDescription(e.target.value)
  }
/>

      </div>

      {/* STATUS */}

      <div className="add-category-field">

        <label>
          الحالة
        </label>

        <select
  value={categoryStatus}
  onChange={(e) =>
    setCategoryStatus(e.target.value)
  }
>
  <option value="active">
    نشط (Active)
  </option>

  <option value="inactive">
    غير نشط
  </option>
</select>

      </div>

      {/* IMAGE */}

      <div className="add-category-field">

        <label>
          صورة القسم
        </label>

<div className="add-category-upload">

  <label
    htmlFor="categoryImage"
    className="upload-btn"
  >
    اختيار ملف
  </label>

  <input
    id="categoryImage"
    type="file"
    accept="image/*"
    hidden
    onChange={(e) =>
      setCategoryImage(e.target.files[0])
    }
  />

  <span>
    {categoryImage
      ? categoryImage.name
      : "لم يتم اختيار أي ملف"}
  </span>

</div>

      </div>

    </div>

    {/* FOOTER */}

    <div className="add-category-footer">

      <button
  className="add-category-save"
  onClick={handleAddCategory}
>
  إضافة القسم
</button>

      <button
  className="add-category-cancel"
  onClick={() => setShowAddCategory(false)}
>
  إلغاء
</button>

    </div>

  </div>

</div>
)}
{showDeleteModal && (
  <div className="users-modal-overlay">

    <div className="users-modal">

      <p>
        هل تريد حذف{" "}
        <strong>
          {deleteType === "category"
            ? "هذا الصنف"
            : "هذا المنتج"}
        </strong>
        ؟
      </p>

      <div className="users-modal-actions">

        <button
          className="cancel-btn"
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
    </div>
  );
}