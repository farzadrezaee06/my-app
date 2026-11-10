import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CreateContext } from '../../../Context/contaxt';
import Search from '../Search'
import { DARK_PRIMARY_COLOR, DARK_SECONDARY_BACKGROUND, DARK_BORDER_COLOR, DARK_SHADOW_COLOR } from '../../../Helpers/DarkColor';
import ShoppingCart from '../ShoppingCart';
import '../../../Css/App.css';

// فعلاً هر سه به /products می‌رن؛ وقتی صفحه‌هاشون ساخته شد، فقط مقدار to رو عوض کن
const NAV_LINKS = [
    { to: '/discounts', label: 'تخفیف‌ها' },
    { to: '/events', label: 'رویدادها' },
    { to: '/special-orders', label: 'سفارشات ویژه' },
];

const ProductsNavbar = () => {
    const { tem, toggleTheme, ShowShoppingCart, setShowShoppingCart, scrollProgress } = useContext(CreateContext);
    return (
        <>
            <div className='sticky-top' style={{ width: "100%", backgroundColor: DARK_SECONDARY_BACKGROUND, height: "60px", borderBottom: `1px solid ${DARK_BORDER_COLOR}`, boxShadow: `0px 0px 10px ${DARK_SHADOW_COLOR}` }}>
                <section className='container h-100'>
                    <section className='row align-items-center justify-content-between h-100 flex-nowrap'>
                        <section className='col-7 col-md-8 col-lg-6'>
                            <Search />
                        </section>

                        {/* لینک‌ها فقط از lg به بالا جا دارن */}
                        <section className='col-lg-3 d-none d-lg-flex align-items-center justify-content-center gap-1'>
                            {NAV_LINKS.map((link) => (
                                <Link key={link.label} to={link.to} className='nav-link-fancy' style={{ color: DARK_PRIMARY_COLOR }}>
                                    {link.label}
                                </Link>
                            ))}
                        </section>

                        <section className='col-5 col-md-4 col-lg-3 d-flex align-items-center justify-content-center gap-2 gap-md-3'>
                            <Link to='/home' className='nav-link-fancy' style={{ color: DARK_PRIMARY_COLOR }} aria-label='خانه' title='خانه'>
                                <i className='fa-solid fa-house d-md-none'></i>
                                <span className='d-none d-md-inline'>خانه</span>
                            </Link>
                            <button type='button' className='btn-mod' onClick={toggleTheme} aria-label='تغییر تم' title='تغییر تم'>
                                <i className={`fa-solid ${tem ? 'fa-sun' : 'fa-moon'}`}></i>
                            </button>
                            <button
                                type='button'
                                onClick={() => setShowShoppingCart(!ShowShoppingCart)}
                                aria-label='سبد خرید'
                                title='سبد خرید'
                                className="fa-solid fa-cart-shopping"
                                style={{ color: DARK_PRIMARY_COLOR, cursor: "pointer" }}
                            />
                        </section>
                    </section>
                    {
                        ShowShoppingCart && (<ShoppingCart />)
                    }
                </section>
                <div className='scroll-progress' style={{ width: `${scrollProgress}%` }} />
            </div>
        </>
    )
}
export default ProductsNavbar;