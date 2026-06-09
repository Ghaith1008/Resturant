import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logos/logo1.svg";
import logInImage from "../assets/images/login.jpg"; // مسار الشعار
import "./Login.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://menu.teknova-sy.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );

      const result = await response.json();
      console.log(result);
      if (result.data && result.data.access_token) {

  localStorage.removeItem("myAppToken");
  localStorage.removeItem("token");

  localStorage.setItem("myAppToken", result.data.access_token);

  localStorage.setItem(
  "adminData",
  JSON.stringify(result.data.user)
);

  window.location.href = "/";
} else {
        setError(
          result.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
        );
      }
    } catch (err) {
      setError("حدث خطأ في الاتصال بالخادم. يرجى المحاولة لاحقاً.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
    <div className="login-page-container" dir="rtl">
      {/* ===== القسم الأيمن: نموذج تسجيل الدخول ===== */}
      <div className="login-form-side">
        <div className="login-box">
          {/* الشعار */}
          <div className="logo-container">
            <img
              src={logo}
              alt="الشعار"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/100x50";
              }}
            />
          </div>

          <h2 className="welcome-text">أهلاً بعودتك</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleLogin} className="login-form">
            {/* حقل الإيميل */}
            <div className="input-group">
              <label>ادخل اسمك او البريد الالكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ادخل الايميل"
              />
            </div>

            {/* حقل كلمة المرور */}
            <div className="input-group">
              <label>ادخل كلمة المرور</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="ادخل كلمة المرور"
                />
                {/* أيقونة العين لتبديل الرؤية */}
                <button
                  type="button"
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#9ca3af"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#cd9d7b"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* نسيت كلمة المرور */}
            <div className="forgot-password">
              <a href="#">هل نسيت كلمة المرور؟</a>
            </div>

            {/* خط المتابعة باستخدام */}
            <div className="divider-container">
              <hr />
              <span>المتابعة باستخدام</span>
              <hr />
            </div>

            {/* أزرار السوشيال ميديا */}
            <div className="social-login-row">
              <button type="button" className="social-btn icon-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000">
                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.43.987 3.96.948 1.567-.025 2.558-1.498 3.562-2.964.88-1.282 1.243-2.525 1.258-2.589-.028-.013-2.42-1.055-2.446-3.83-.025-2.316 1.89-3.42 1.947-3.454-1.084-1.583-2.766-1.796-3.376-1.821-2.127-.184-4.103 1.25-5.11 1.25-1.018 0-2.613-1.155-4.12-1.134zM15.545 4.535c.844-1.022 1.413-2.443 1.258-3.861-1.218.049-2.705.811-3.578 1.832-.705.816-1.34 2.274-1.155 3.655 1.36.105 2.738-.707 3.475-1.626z" />
                </svg>
              </button>
              <button type="button" className="social-btn icon-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button type="button" className="social-btn google-btn">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>

            {/* إنشاء حساب */}
            <div className="register-link">
              ليس لديك حساب؟ <a href="#">انشاء حساب</a>
            </div>

            {/* زر تسجيل الدخول */}
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? "جاري التحقق..." : "تسجيل الدخول"}
            </button>
          </form>
        </div>
      </div>

      {/* ===== القسم الأيسر: صورة البيتزا ===== */}
      <div className="login-image-side">
        {/* يمكنك تغيير مسار الصورة هنا بمسار صورة البيتزا الحقيقية من مجلد assets */}
        <img src={logInImage} alt="بيتزا شهية" />
      </div>
    </div>
    <Footer/>
</>
  );
};


export default Login;

