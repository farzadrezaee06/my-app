import { useContext } from "react";
import { CreateContext } from "../../Context/contaxt";
import { DARK_SECONDARY_BACKGROUND, DARK_BORDER_COLOR, DARK_PRIMARY_COLOR } from "../../Helpers/DarkColor";
import '../../Css/App.css'

const ShoppingCart = () => {
    const { setShowShoppingCart, goHome, cartItems, removeFromCart } = useContext(CreateContext);
    const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <>
            <div className="cart-backdrop" onClick={() => setShowShoppingCart(false)} />

            <div
                className="cart-panel"
                style={{
                    border: `1px solid ${DARK_BORDER_COLOR}`,
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                    color: DARK_PRIMARY_COLOR,
                    width: "300px",
                    maxWidth: "90vw",
                    backgroundColor: DARK_SECONDARY_BACKGROUND,
                    height: "80vh",
                }}
            >
                <section className="shopping-cart-content">
                    <section className="shopping-cart-heading">
                        <section className="shopping-cart-title">
                            <span
                                className="shopping-cart-text"
                                style={{ color: DARK_PRIMARY_COLOR }}
                            >
                                سبد خرید
                            </span>

                            <button
                                type="button"
                                onClick={goHome}
                                aria-label="بازگشت به صفحه اصلی"
                                title="بازگشت به صفحه اصلی"
                                className="d-inline-flex align-items-center justify-content-center gap-2 flex-shrink-0"
                                style={{
                                    color: DARK_PRIMARY_COLOR,
                                    background: "none",
                                    border: "none",
                                    padding: 0,
                                    cursor: "pointer",
                                    minWidth: "40px",
                                    minHeight: "40px",
                                }}
                            >
                                <i className="fa-solid fa-house" style={{ fontSize: "clamp(1rem, 4vw, 1.4rem)" }}></i>
                                <span style={{ fontSize: "0.85rem" }}>صفحه اصلی</span>
                            </button>
                        </section>
                    </section>

                    <section className="cart-items">
                        {cartItems.length === 0 ? (
                            <p className="cart-empty">سبد خرید شما خالی است</p>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.img} alt={item.title} className="cart-item-img" />
                                    <div className="cart-item-info">
                                        <span className="cart-item-title">{item.title}</span>
                                        <small>{item.qty.toLocaleString('fa-IR')} × {item.price.toLocaleString('fa-IR')} تومان</small>
                                    </div>
                                    <button
                                        type="button"
                                        className="cart-item-remove"
                                        aria-label="حذف"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            ))
                        )}
                    </section>

                    {cartItems.length > 0 && (
                        <section className="cart-total">
                            <span>جمع کل:</span>
                            <strong>{total.toLocaleString('fa-IR')} تومان</strong>
                        </section>
                    )}
                </section>
            </div>
        </>
    );
}
export default ShoppingCart;