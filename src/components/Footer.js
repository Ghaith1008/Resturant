import logo from "../assets/logos/Logo.svg";
import facebook from "../assets/icons/Facebook.svg";
import instagram from "../assets/icons/Instgram.svg";
import youtube from "../assets/icons/Youtube.svg";
import whatsapp from "../assets/icons/Whatsapp.svg";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="admin-footer">
      <div className="admin-footer-content">
        <img src={logo} className="admin-footer-logo" alt="Logo" />

        <p>نقدم لك تجربة طعام مميزة بنكهات دافئة وجودة عالية.</p>

        <div className="admin-socials">
          <img src={facebook} alt="Facebook" />
          <img src={instagram} alt="Instagram" />
          <img src={youtube} alt="YouTube" />
          <img src={whatsapp} alt="WhatsApp" />
        </div>

        <div className="admin-footer-links">
          <a href="#">القائمة</a>
          <a href="#">الأصناف</a>
          <a href="#">الأكثر طلباً</a>
          <a href="#">تواصل معنا</a>
        </div>

        <div className="admin-copyright">
          © 2025 اسم المطعم - جميع الحقوق محفوظة
        </div>
      </div>
    </footer>
  );
}