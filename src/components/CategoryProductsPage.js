import React, { useState, useEffect } from "react";
import "./CategoryProductsPage.css";
import { useLoader } from "../context/LoaderContext";


// استيراد المكونات
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CategoryProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
    const { setLoading } = useLoader();
  

  // جلب البيانات من الـ API العام
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch("https://menu.teknova-sy.com/api/categories"),
          fetch("https://menu.teknova-sy.com/api/products"),
        ]);

        const categoriesData = await categoriesResponse.json();
        const productsData = await productsResponse.json();

        if (categoriesData.data) {
          setCategories(categoriesData.data);

          if (categoriesData.data.length > 0) {
            setActiveCategory(categoriesData.data[0].id);
          }
        }

        if (productsData.data) {
          setAllProducts(productsData.data);
        }
      } catch (error) {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // فلترة المنتجات
const filteredProducts = allProducts
  .filter((product) => product.category_id === activeCategory)
  .map((product) => ({
    ...product,
    category_name:
      categories.find(
        (cat) => cat.id === product.category_id
      )?.name || "",
  }));

  return (
    <>
      <Navbar />

      
        <>
          <Categories
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />

          <section className="category-products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div
                style={{
                  textAlign: "center",
                  gridColumn: "1 / -1",
                  padding: "40px",
                  color: "var(--text-gray)",
                }}
              >
                لا توجد منتجات في هذا التصنيف حالياً.
              </div>
            )}
          </section>
        </>

      <div className="desktop-footer">
  <Footer />
</div>
    </>
  );
};

export default CategoryProductsPage;