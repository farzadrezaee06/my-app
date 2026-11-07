import { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CreateContext } from './Context/contaxt';
import useLocalStorage from './Hooks/useLocalStorage';
import Products from './Components/Haeder/Products/Products';
import Home from './Components/Home/Home';
import Toast from './Components/Haeder/Toast';

const MAX_QTY = 10;

// کلیدهای نسخه‌دار: اگه ساختار داده عوض شد، v1 رو به v2 تغییر بده تا داده‌ی قدیمی مشکل نسازه
const CART_KEY = 'digikala:cart:v1';
const THEME_KEY = 'digikala:theme:v1';

// اعتبارسنجی داده‌ی سبد (محافظت در برابر داده‌ی خراب یا دستکاری‌شده)
const isValidCart = (data) =>
  Array.isArray(data) &&
  data.every(
    (item) =>
      item &&
      typeof item.id !== 'undefined' &&
      typeof item.title === 'string' &&
      typeof item.price === 'number' &&
      Number.isInteger(item.qty) &&
      item.qty > 0 &&
      item.qty <= MAX_QTY
  );

const isValidTheme = (data) => typeof data === 'boolean';

const App = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [ShowShoppingCart, setShowShoppingCart] = useState(false);
  const [current, setCurrent] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [toast, setToast] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');


  // ذخیره‌شده توی لوکال‌استوریج
  const [tem, setTem] = useLocalStorage(THEME_KEY, false, isValidTheme);
  const [cartItems, setCartItems] = useLocalStorage(CART_KEY, [], isValidCart);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tem ? 'light' : 'dark');
  }, [tem]);

  const toggleTheme = () => setTem((prev) => !prev);

  // بدون رفرش صفحه
  const goHome = () => {
    setShowShoppingCart(false);
    navigate('/home');
  };

  const showToast = (type, message) => {
    setToast({ type, message, id: Date.now() });
  };

  const addToCart = (product) => {
    try {
      if (!product || !product.id) {
        throw new Error('invalid product');
      }

      const existing = cartItems.find((item) => item.id === product.id);

      if (existing && existing.qty >= MAX_QTY) {
        showToast('error', `حداکثر ${MAX_QTY} عدد از هر محصول قابل افزودن است`);
        return;
      }

      setCartItems((prev) =>
        existing
          ? prev.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
          : [...prev, { ...product, qty: 1 }]
      );

      showToast('success', 'محصول با موفقیت به سبد خرید اضافه شد');
    } catch (error) {
      showToast('error', 'محصول به سبد خرید اضافه نشد');
    }
  };

  const removeFromCart = (id) => {
    try {
      const exists = cartItems.some((item) => item.id === id);

      if (!exists) {
        throw new Error('item not found');
      }

      setCartItems((prev) => prev.filter((item) => item.id !== id));
      showToast('success', 'محصول با موفقیت از سبد خرید حذف شد');
    } catch (error) {
      showToast('error', 'محصول از سبد خرید حذف نشد');
    }
  };

  return (
    <div className=''>
      {/* Routes for the entire project */}
      <div >
        <CreateContext.Provider value={{
          loading,
          setLoading,
          ShowShoppingCart,
          setShowShoppingCart,
          goHome,
          current,
          setCurrent,
          scrollProgress,
          setScrollProgress,
          tem,
          setTem,
          toggleTheme,
          cartItems,
          addToCart,
          removeFromCart,
          toast,
          setToast,
          searchQuery,
          setSearchQuery
        }}>
          <Toast />
          <Routes>
            <Route path='/' element={<Navigate to="/home" />} />
            <Route path='/home' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='*' element={<Navigate to="/home" replace />} />
          </Routes>
        </CreateContext.Provider>
      </div>
    </div>
  )
}
export default App;