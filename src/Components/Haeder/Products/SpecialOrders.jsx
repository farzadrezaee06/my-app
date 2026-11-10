import { useState, useContext } from "react";
import { CreateContext } from "../../../Context/contaxt";
import { DARK_PRIMARY_COLOR, DARK_SECONDARY_BACKGROUND, DARK_BORDER_COLOR } from "../../../Helpers/DarkColor";
import "../../../Css/App.css";

const SpecialOrders = () => {
    const { tem, setToast } = useContext(CreateContext);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        company: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // اعتبارسنجی ساده
        if (!formData.fullName || !formData.phone || !formData.description) {
            setToast({
                type: "error",
                message: "لطفاً فیلدهای ضروری را پر کنید.",
                id: Date.now(),
            });
            return;
        }

        setIsSubmitting(true);

        // شبیه‌سازی ارسال اطلاعات به سرور
        setTimeout(() => {
            setToast({
                type: "success",
                message: "درخواست سفارش ویژه شما با موفقیت ثبت شد. همکاران ما به زودی با شما تماس می‌گیرند.",
                id: Date.now(),
            });
            setIsSubmitting(false);
            setFormData({ fullName: "", phone: "", company: "", description: "" });
        }, 1500);
    };

    // استایل‌های متغیر بر اساس تم
    const inputStyle = {
        backgroundColor: tem ? "#fff" : DARK_SECONDARY_BACKGROUND,
        color: tem ? "#333" : "#fff",
        border: `1px solid ${tem ? "#ddd" : DARK_BORDER_COLOR}`,
        borderRadius: "8px",
        padding: "12px 15px",
        width: "100%",
        outline: "none",
        transition: "border-color 0.3s ease"
    };

    return (
        <section className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">

                    {/* هدر بخش سفارشات ویژه */}
                    <div className="text-center mb-5">
                        <i className="fa-solid fa-handshake-angle mb-3" style={{ fontSize: "3rem", color: "#ef394e" }}></i>
                        <h2 style={{ color: tem ? "#333" : DARK_PRIMARY_COLOR, fontWeight: "bold" }}>
                            سفارشات ویژه و سازمانی
                        </h2>
                        <p style={{ color: tem ? "#666" : "#aaa", marginTop: "10px", lineHeight: "1.8" }}>
                            برای خرید عمده، تامین هدایای سازمانی و یا سفارش کالاهایی که در سایت موجود نیستند،
                            فرم زیر را پر کنید تا کارشناسان فروش ما در اسرع وقت با شما تماس بگیرند.
                        </p>
                    </div>

                    {/* فرم ثبت درخواست */}
                    <div
                        className="p-4 p-md-5 shadow-sm rounded"
                        style={{
                            backgroundColor: tem ? "#fff" : DARK_SECONDARY_BACKGROUND,
                            border: `1px solid ${tem ? "#eee" : DARK_BORDER_COLOR}`
                        }}
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <label className="form-label" style={{ color: tem ? "#333" : "#ddd", fontSize: "0.9rem" }}>
                                        نام و نام خانوادگی <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        placeholder="مثال: علی احمدی"
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label" style={{ color: tem ? "#333" : "#ddd", fontSize: "0.9rem" }}>
                                        شماره تماس <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        placeholder="09123456789"
                                        dir="ltr"
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label" style={{ color: tem ? "#333" : "#ddd", fontSize: "0.9rem" }}>
                                        نام سازمان یا شرکت (اختیاری)
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        style={inputStyle}
                                        placeholder="در صورت خرید سازمانی وارد کنید"
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label" style={{ color: tem ? "#333" : "#ddd", fontSize: "0.9rem" }}>
                                        شرح درخواست و کالاهای مورد نیاز <span className="text-danger">*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        style={{ ...inputStyle, minHeight: "150px", resize: "vertical" }}
                                        placeholder="نام کالاها، تعداد درخواستی و توضیحات تکمیلی را اینجا بنویسید..."
                                    ></textarea>
                                </div>

                                <div className="col-12 mt-4 text-end">
                                    <button
                                        type="submit"
                                        className="btn w-100 w-md-auto px-5"
                                        style={{
                                            backgroundColor: "#ef394e",
                                            color: "#fff",
                                            padding: "12px 0",
                                            borderRadius: "8px",
                                            fontWeight: "bold"
                                        }}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <i className="fa-solid fa-spinner fa-spin ms-2"></i>
                                                در حال ثبت...
                                            </>
                                        ) : (
                                            "ثبت درخواست سفارش"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default SpecialOrders;