import React, { useContext } from 'react';
import { motion } from 'framer-motion';

// کامپوننت‌های اصلی خودت (با مسیرهای درست خودت چک کن)
import Banner from "./Baner";
import Stories from './Stories';
import Navbar from '../Haeder/Navbar';

// ایمپورت Context برای دارک مود
// تغییر یافته به دو تا نقطه-اسلش
import { CreateContext } from '../../Context/contaxt';
import { DARK_SECONDARY_BACKGROUND, DARK_BORDER_COLOR } from '../../Helpers/DarkColor';

import '../../Css/App.css';

const Home = () => {
  // استفاده از کانتکست برای هماهنگ شدن با تم سایت
  const { tem } = useContext(CreateContext);

  // استایل‌های پویا بر اساس دارک/لایت مود
  const containerStyle = {
    backgroundColor: tem ? "#f8f9fa" : "#121212",
    transition: "background-color 0.3s ease"
  };

  const cardStyle = {
    backgroundColor: tem ? "#ffffff" : DARK_SECONDARY_BACKGROUND,
    border: `1px solid ${tem ? "#e9ecef" : DARK_BORDER_COLOR}`,
    maxWidth: "900px" // محدود کردن عرض برای زیبایی در دسکتاپ
  };

  return (
    <div className="min-vh-100" style={containerStyle}>

      {/* کامپوننت‌های اصلی شما */}
      <Navbar />
      <Banner />
      <Stories />

      {/* ---------------- بخش کامپوننت‌های سه‌بعدی بصری هنگام اسکرول ---------------- */}
      <main className="container px-3 py-5 overflow-hidden">

        {/* ۱. گوشی موبایل - ورود سه‌بعدی از سمت چپ */}
        <motion.div
          initial={{ opacity: 0, x: -150, rotateY: -25, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.02, rotateX: 3, rotateY: -3 }}
          className="rounded-4 p-4 p-md-5 mx-auto d-flex flex-column flex-md-row align-items-center justify-content-between gap-4 mb-5 shadow-sm"
          style={cardStyle}
        >
          {/* المان تصویری */}
          <div
            className="w-100 rounded-4 d-flex align-items-center justify-content-center shadow"
            style={{
              height: "250px",
              background: "linear-gradient(to top right, #2563eb, #4f46e5, #9333ea)",
              fontSize: "4.5rem",
              flexBasis: "50%"
            }}
          >
            📱
          </div>
          <div className="w-100 text-center text-md-end" style={{ flexBasis: "50%" }}>
            <span className="fw-bold text-primary text-uppercase" style={{ letterSpacing: "1px", fontSize: "0.9rem" }}>تکنولوژی روز</span>
            <h2 className="fs-2 fw-bold mt-2 mb-4" style={{ color: tem ? "#212529" : "#f8f9fa" }}>گوشی‌های هوشمند</h2>
            <div className="rounded-pill mx-auto mx-md-0" style={{ width: "60px", height: "6px", backgroundColor: "#2563eb" }}></div>
          </div>
        </motion.div>

        {/* ۲. سبد کالا - ورود سه‌بعدی از سمت راست (جای تصویر و متن برعکس است) */}
        <motion.div
          initial={{ opacity: 0, x: 150, rotateY: 25, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.02, rotateX: 3, rotateY: 3 }}
          className="rounded-4 p-4 p-md-5 mx-auto d-flex flex-column flex-md-row-reverse align-items-center justify-content-between gap-4 mb-5 shadow-sm"
          style={cardStyle}
        >
          <div
            className="w-100 rounded-4 d-flex align-items-center justify-content-center shadow"
            style={{
              height: "250px",
              background: "linear-gradient(to top right, #059669, #0d9488, #0891b2)",
              fontSize: "4.5rem",
              flexBasis: "50%"
            }}
          >
            🛒
          </div>
          <div className="w-100 text-center text-md-end" style={{ flexBasis: "50%" }}>
            <span className="fw-bold text-success text-uppercase" style={{ letterSpacing: "1px", fontSize: "0.9rem" }}>خرید سریع و آسان</span>
            <h2 className="fs-2 fw-bold mt-2 mb-4" style={{ color: tem ? "#212529" : "#f8f9fa" }}>سبد خرید هوشمند</h2>
            <div className="rounded-pill mx-auto mx-md-0" style={{ width: "60px", height: "6px", backgroundColor: "#059669" }}></div>
          </div>
        </motion.div>

        {/* ۳. لوازم جانبی کامپیوتر - ورود سه‌بعدی از سمت چپ */}
        <motion.div
          initial={{ opacity: 0, x: -150, rotateY: -25, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.02, rotateX: 3, rotateY: -3 }}
          className="rounded-4 p-4 p-md-5 mx-auto d-flex flex-column flex-md-row align-items-center justify-content-between gap-4 mb-5 shadow-sm"
          style={cardStyle}
        >
          <div
            className="w-100 rounded-4 d-flex align-items-center justify-content-center shadow"
            style={{
              height: "250px",
              background: "linear-gradient(to top right, #9333ea, #db2777, #e11d48)",
              fontSize: "4.5rem",
              flexBasis: "50%"
            }}
          >
            💻
          </div>
          <div className="w-100 text-center text-md-end" style={{ flexBasis: "50%" }}>
            <span className="fw-bold text-uppercase" style={{ color: "#db2777", letterSpacing: "1px", fontSize: "0.9rem" }}>تجهیزات گیمینگ و اداری</span>
            <h2 className="fs-2 fw-bold mt-2 mb-4" style={{ color: tem ? "#212529" : "#f8f9fa" }}>لوازم جانبی کامپیوتر</h2>
            <div className="rounded-pill mx-auto mx-md-0" style={{ width: "60px", height: "6px", backgroundColor: "#db2777" }}></div>
          </div>
        </motion.div>

      </main>
    </div>
  );
}

export default Home;