import React from 'react';
import { motion } from 'framer-motion';

// کامپوننت‌های اصلی خودت (کاملاً دست‌نخورده)
import Banner from "./Baner";
import Stories from './Stories';
import Navbar from '../Haeder/Navbar';

// ایمپورت فایل استایل جداگانه
import '../../Css/App.css';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 perspective-container">
      
      {/* کامپوننت‌های اصلی شما */}
      <Navbar />
      <Banner />
      <Stories />
     

      {/* ---------------- بخش کامپوننت‌های سه‌بعدی بصری هنگام اسکرول ---------------- */}
      <main className="container mx-auto px-4 py-16 space-y-16 overflow-hidden">
        
        {/* ۱. گوشی موبایل - ورود سه‌بعدی از سمت چپ */}
        <motion.div
          initial={{ opacity: 0, x: -150, rotateY: -25, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.02, rotateX: 3, rotateY: -3 }}
          className="card-3d-effect card-theme-box rounded-3xl p-6 md:p-8 w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* المان تصویری سه‌بعدی (بدون متن اضافی) */}
          <div className="w-full md:w-1/2 h-64 md:h-72 bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-7xl shadow-xl shadow-blue-500/20">
            📱
          </div>
          <div className="w-full md:w-1/2 text-center md:text-right">
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">تکنولوژی روز</span>
            <h2 className="text-3xl font-extrabود text-gray-900 dark:text-white mt-2 mb-4">گوشی‌های هوشمند</h2>
            <div className="w-16 h-1.5 bg-blue-600 rounded-full mx-auto md:mx-0"></div>
          </div>
        </motion.div>


        {/* ۲. سبد کالا - ورود سه‌بعدی از سمت راست */}
        <motion.div
          initial={{ opacity: 0, x: 150, rotateY: 25, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.02, rotateX: 3, rotateY: 3 }}
          className="card-3d-effect card-theme-box rounded-3xl p-6 md:p-8 w-full max-w-4xl mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-6"
        >
          {/* المان تصویری سه‌بعدی (بدون متن اضافی) */}
          <div className="w-full md:w-1/2 h-64 md:h-72 bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl flex items-center justify-center text-7xl shadow-xl shadow-emerald-500/20">
            🛒
          </div>
          <div className="w-full md:w-1/2 text-center md:text-right">
            <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">خرید سریع و آسان</span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-2 mb-4">سبد خرید هوشمند</h2>
            <div className="w-16 h-1.5 bg-emerald-600 rounded-full mx-auto md:mx-0"></div>
          </div>
        </motion.div>


        {/* ۳. لوازم جانبی کامپیوتر - ورود سه‌بعدی از سمت چپ */}
        <motion.div
          initial={{ opacity: 0, x: -150, rotateY: -25, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.02, rotateX: 3, rotateY: -3 }}
          className="card-3d-effect card-theme-box rounded-3xl p-6 md:p-8 w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* المان تصویری سه‌بعدی (بدون متن اضافی) */}
          <div className="w-full md:w-1/2 h-64 md:h-72 bg-gradient-to-tr from-purple-600 via-pink-600 to-rose-600 rounded-2xl flex items-center justify-center text-7xl shadow-xl shadow-purple-500/20">
            💻
          </div>
          <div className="w-full md:w-1/2 text-center md:text-right">
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">تجهیزات گیمینگ و اداری</span>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-2 mb-4">لوازم جانبی کامپیوتر</h2>
            <div className="w-16 h-1.5 bg-purple-600 rounded-full mx-auto md:mx-0"></div>
          </div>
        </motion.div>

      </main>
    </div>
  );
}

export default Home;