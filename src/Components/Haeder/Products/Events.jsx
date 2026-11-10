import { useState, useContext, useEffect } from "react";
import { CreateContext } from "../../../Context/contaxt";
import { DARK_PRIMARY_COLOR, DARK_SECONDARY_BACKGROUND, DARK_BORDER_COLOR } from "../../../Helpers/DarkColor";
import "../../../Css/App.css";

const PRIZES = [
    { type: "discount", text: "کد تخفیف ۲۰٪ خریدهای سوپرمارکتی", code: "SUPER20" },
    { type: "free-shipping", text: "ارسال رایگان سفارش بعدی", code: "FREE-SHIP" },
    { type: "points", text: "۵۰ امتیاز دیجی‌کلاب", code: null },
    { type: "empty", text: "پوچ! فردا دوباره شانست رو امتحان کن.", code: null },
    { type: "discount", text: "کد تخفیف ۵۰ هزار تومانی", code: "DK-50K" },
];

const Events = () => {
    // گرفتن loading و setLoading از کانتکست
    const { tem, setToast, loading, setLoading } = useContext(CreateContext);

    const [isOpening, setIsOpening] = useState(false);
    const [selectedBox, setSelectedBox] = useState(null);
    const [result, setResult] = useState(null);
    const [hasPlayedToday, setHasPlayedToday] = useState(false);

    // مدیریت لودینگ ۳ ثانیه‌ای هنگام ورود به صفحه
    useEffect(() => {
        // ۱. به محض ورود، لودینگ روشن می‌شود
        setLoading(true);

        // ۲. تنظیم تایمر برای ۳ ثانیه (۳۰۰۰ میلی‌ثانیه)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        // بررسی بازی کردن کاربر در امروز
        const lastPlayed = window.localStorage.getItem("digikala:events:lastPlayed");
        if (lastPlayed === new Date().toDateString()) {
            setHasPlayedToday(true);
        }

        // ۳. تابع پاکسازی: اگر کاربر قبل از ۳ ثانیه صفحه را بست یا تغییر داد، تایمر لغو و لودینگ خاموش شود
        return () => {
            clearTimeout(timer);
            setLoading(false);
        };
    }, [setLoading]);

    const handleBoxClick = (index) => {
        if (hasPlayedToday) {
            setToast({ type: "error", message: "شما شانس امروزتون رو استفاده کردید. فردا دوباره سر بزنید!", id: Date.now() });
            return;
        }
        if (isOpening) return;

        setSelectedBox(index);
        setIsOpening(true);

        setTimeout(() => {
            const randomPrize = PRIZES[Math.floor(Math.random() * PRIZES.length)];
            setResult(randomPrize);
            setIsOpening(false);
            setHasPlayedToday(true);
            window.localStorage.setItem("digikala:events:lastPlayed", new Date().toDateString());

            if (randomPrize.type !== "empty") {
                setToast({ type: "success", message: "تبریک! شما برنده شدید.", id: Date.now() });
            }
        }, 2000);
    };

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        setToast({ type: "success", message: "کد تخفیف کپی شد", id: Date.now() });
    };

    const boxStyle = {
        backgroundColor: tem ? "#fff" : DARK_SECONDARY_BACKGROUND,
        border: `2px dashed ${tem ? "#ccc" : DARK_BORDER_COLOR}`,
        borderRadius: "15px",
        height: "150px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: hasPlayedToday ? "not-allowed" : "pointer",
        transition: "all 0.3s ease",
        position: "relative",
    };

    // اگر لودینگ فعال است، فقط این بخش رندر می‌شود
    if (loading) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
                <div
                    className="spinner-border"
                    style={{ width: "4rem", height: "4rem", color: "#ef394e" }}
                    role="status"
                >
                    <span className="visually-hidden">در حال بارگذاری...</span>
                </div>
                <h5 className="mt-4 fw-bold" style={{ color: tem ? "#333" : "#fff", letterSpacing: "1px" }}>
                    در حال آماده‌سازی جعبه‌های شانس...
                </h5>
                <p className="mt-2 text-muted" style={{ fontSize: "0.9rem" }}>
                    لطفاً چند لحظه صبر کنید
                </p>
            </div>
        );
    }

    // بعد از ۳ ثانیه که لودینگ false شد، محتوای اصلی نمایش داده می‌شود
    return (
        <section className="container mt-5 mb-5">
            <div className="text-center mb-5">
                <i className="fa-solid fa-gamepad mb-3" style={{ fontSize: "3rem", color: "#ef394e" }}></i>
                <h2 style={{ color: tem ? "#333" : DARK_PRIMARY_COLOR, fontWeight: "bold" }}>
                    دیجی‌کلاب - جعبه شانس روزانه
                </h2>
                <p style={{ color: tem ? "#666" : "#aaa", marginTop: "10px" }}>
                    هر روز یک جعبه را انتخاب کنید و شانس خود را امتحان کنید!
                </p>
            </div>

            <div className="row justify-content-center g-4 mt-2">
                {[0, 1, 2].map((index) => (
                    <div className="col-4 col-md-3" key={index}>
                        <div
                            style={{
                                ...boxStyle,
                                transform: selectedBox === index && isOpening ? "scale(0.95)" : "scale(1)",
                                borderColor: selectedBox === index ? "#ef394e" : boxStyle.border,
                                opacity: hasPlayedToday && selectedBox !== index ? 0.5 : 1
                            }}
                            onClick={() => handleBoxClick(index)}
                            className={selectedBox === index && isOpening ? "box-shake" : "box-hover"}
                        >
                            <i
                                className={`fa-solid ${selectedBox === index && !isOpening && result ? "fa-box-open" : "fa-gift"}`}
                                style={{
                                    fontSize: "4rem",
                                    color: selectedBox === index ? "#ef394e" : (tem ? "#ccc" : "#555"),
                                    transition: "all 0.3s"
                                }}
                            ></i>
                        </div>
                    </div>
                ))}
            </div>

            {result && !isOpening && (
                <div className="row justify-content-center mt-5">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div
                            className="p-4 text-center rounded shadow-sm"
                            style={{
                                backgroundColor: tem ? "#f8f9fa" : DARK_SECONDARY_BACKGROUND,
                                border: `1px solid ${result.type === "empty" ? "#6c757d" : "#198754"}`
                            }}
                        >
                            <h4 style={{ color: result.type === "empty" ? (tem ? "#666" : "#aaa") : "#198754", marginBottom: "15px" }}>
                                {result.text}
                            </h4>

                            {result.code && (
                                <div className="d-flex justify-content-center align-items-center mt-3 gap-2">
                                    <span
                                        className="px-4 py-2 rounded"
                                        style={{ backgroundColor: tem ? "#e9ecef" : "#222", color: tem ? "#333" : "#fff", letterSpacing: "2px", fontWeight: "bold" }}
                                        dir="ltr"
                                    >
                                        {result.code}
                                    </span>
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => copyToClipboard(result.code)}
                                    >
                                        <i className="fa-regular fa-copy"></i>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .box-hover:hover { border-color: #ef394e !important; box-shadow: 0 5px 15px rgba(239, 57, 78, 0.2); }
                .box-shake { animation: shake 0.5s infinite; }
                @keyframes shake {
                    0% { transform: translate(1px, 1px) rotate(0deg); }
                    20% { transform: translate(-3px, 0px) rotate(1deg); }
                    40% { transform: translate(1px, -1px) rotate(1deg); }
                    60% { transform: translate(-3px, 1px) rotate(0deg); }
                    80% { transform: translate(-1px, -1px) rotate(1deg); }
                    100% { transform: translate(1px, -2px) rotate(-1deg); }
                }
            `}</style>
        </section>
    );
};

export default Events;