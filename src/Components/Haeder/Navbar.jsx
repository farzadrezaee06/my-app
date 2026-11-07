import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CreateContext } from '../../Context/contaxt';
import Search from './Search'
import { DARK_PRIMARY_COLOR, DARK_SECONDARY_BACKGROUND, DARK_BORDER_COLOR, DARK_SHADOW_COLOR } from '../../Helpers/DarkColor';
import ShoppingCart from './ShoppingCart.jsx';
import '../../Css/App.css';
const Navbar = () => {
    const { tem, toggleTheme, ShowShoppingCart, setShowShoppingCart, scrollProgress } = useContext(CreateContext);
    return (
        <>
            <div className='sticky-top' style={{ width: "100%", backgroundColor: DARK_SECONDARY_BACKGROUND, height: "60px", borderBottom: `1px solid ${DARK_BORDER_COLOR}`, boxShadow: `0px 0px 10px ${DARK_SHADOW_COLOR}` }}>
                <section className='container h-100'>
                    <section className='row align-items-center justify-content-between h-100 flex-nowrap'>
                        <section className='col-8 col-md-6'>
                            <span>
                                <Search />
                            </span>
                        </section>
                        <section className='col-3 nav-links-wrapper d-flex align-items-center justify-content-center gap-1'>
                            <Link to='/home' className='nav-link-fancy' style={{ color: DARK_PRIMARY_COLOR }}>خانه</Link>
                            <Link to='/products' className='nav-link-fancy' style={{ color: DARK_PRIMARY_COLOR }}>محصولات</Link>
                            <Link to='/contact' className='nav-link-fancy' style={{ color: DARK_PRIMARY_COLOR }}>تماس با ما</Link>
                        </section>
                        <section className='col-4 col-md-3 d-flex align-items-center justify-content-center gap-3'>
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
export default Navbar;