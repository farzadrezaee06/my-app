import { useContext, useEffect, useMemo, useState, useCallback } from "react";
import { CreateContext } from "../../../Context/contaxt";
import ProductsNavbar from "./ProductNavbar";
import Stories from "../../Home/Stories";
import "../../../Css/App.css";

const API_URL = "https://dummyjson.com/products?limit=0";
const DOLLAR_RATE = 50000; // فقط برای تمرین: قیمت دلاری رو به تومان تبدیل می‌کنه

// کش: اگه DOLLAR_RATE، ترجمه‌ها یا ساختار محصولات عوض شد، v3 رو به v4 تغییر بده
const CACHE_KEY = "digikala:products:v6";
const CACHE_TTL = 10 * 60 * 1000; // ۱۰ دقیقه
const SEARCH_DELAY = 250; // میلی‌ثانیه

/* ======================= نام فارسی دسته‌ها ======================= */
const CATEGORY_FA = {
    beauty: "لوازم آرایشی",
    fragrances: "عطر و ادکلن",
    furniture: "مبلمان",
    groceries: "خوراکی",
    "home-decoration": "دکوری منزل",
    "kitchen-accessories": "لوازم آشپزخانه",
    laptops: "لپ‌تاپ",
    "mens-shirts": "پیراهن مردانه",
    "mens-shoes": "کفش مردانه",
    "mens-watches": "ساعت مچی مردانه",
    "mobile-accessories": "لوازم جانبی موبایل",
    motorcycle: "موتورسیکلت",
    "skin-care": "محصول مراقبت پوست",
    smartphones: "گوشی موبایل",
    "sports-accessories": "لوازم ورزشی",
    sunglasses: "عینک آفتابی",
    tablets: "تبلت",
    tops: "تاپ زنانه",
    vehicle: "خودرو",
    "womens-bags": "کیف زنانه",
    "womens-dresses": "پیراهن زنانه",
    "womens-jewellery": "زیورآلات زنانه",
    "womens-shoes": "کفش زنانه",
    "womens-watches": "ساعت مچی زنانه",
};

/* ======================= نام فارسی محصولات =======================
   کلید = عنوان انگلیسی API. هر محصولی که اینجا باشه، نام فارسی کامل می‌گیره.
   برای بقیه، نام فارسی ساده از روی دسته ساخته می‌شه (پایین‌تر).
   برای افزودن محصول جدید فقط یه خط به این لیست اضافه کن. */
const TITLE_FA = {
    // لوازم آرایشی
    "Essence Mascara Lash Princess": "ریمل اسنس مدل لش پرنسس",
    "Eyeshadow Palette with Mirror": "پالت سایه چشم همراه آینه",
    "Powder Canister": "پودر فیکس قوطی‌ای",
    "Red Lipstick": "رژ لب قرمز",
    "Red Nail Polish": "لاک ناخن قرمز",

    // عطر
    "Calvin Klein CK One": "ادکلن کالوین کلاین سی‌کی وان",
    "Chanel Coco Noir Eau De": "ادو پرفیوم شنل کوکو نوآر",
    "Dior J'adore": "ادو پرفیوم دیور ژادور",
    "Dolce Shine Eau de": "ادو پرفیوم دولچه شاین",
    "Gucci Bloom Eau de": "ادو پرفیوم گوچی بلوم",

    // مبلمان
    "Annibale Colombo Bed": "تخت‌خواب آنیبال کولومبو",
    "Annibale Colombo Sofa": "مبل آنیبال کولومبو",
    "Bedside Table African Cherry": "پاتختی چوب آلبالوی آفریقایی",
    "Knoll Saarinen Executive Conference Chair":
        "صندلی کنفرانس مدیریتی نول سارینن",
    "Wooden Bathroom Sink With Mirror": "روشویی چوبی حمام همراه آینه",

    // خوراکی
    Apple: "سیب",
    "Beef Steak": "استیک گوشت گاو",
    "Cat Food": "غذای گربه",
    "Chicken Meat": "گوشت مرغ",
    "Cooking Oil": "روغن پخت‌وپز",
    Cucumber: "خیار",
    "Dog Food": "غذای سگ",
    Eggs: "تخم‌مرغ",
    "Fish Steak": "استیک ماهی",
    "Green Bell Pepper": "فلفل دلمه‌ای سبز",
    "Green Chili Pepper": "فلفل تند سبز",
    "Honey Jar": "شیشه عسل",
    "Ice Cream": "بستنی",
    Juice: "آبمیوه",
    Kiwi: "کیوی",
    Lemon: "لیمو",
    Milk: "شیر",
    Mulberry: "توت",
    "Nescafe Coffee": "قهوه نسکافه",
    Potatoes: "سیب‌زمینی",
    "Protein Powder": "پودر پروتئین",
    "Red Onions": "پیاز قرمز",
    Rice: "برنج",
    "Soft Drinks": "نوشابه",
    Strawberry: "توت‌فرنگی",
    "Tissue Paper Box": "جعبه دستمال کاغذی",
    Water: "آب معدنی",

    // دکوری منزل
    "Decoration Swing": "تاب تزئینی",
    "Family Tree Photo Frame": "قاب عکس درخت خانواده",
    "House Showpiece Plant": "گیاه تزئینی منزل",
    "Plant Pot": "گلدان",
    "Table Lamp": "چراغ رومیزی",

    // لوازم آشپزخانه
    "Bamboo Spatula": "کفگیر بامبو",
    "Black Aluminium Cup": "لیوان آلومینیومی مشکی",
    "Black Whisk": "همزن دستی مشکی",
    "Boxed Blender": "مخلوط‌کن",
    "Carbon Steel Wok": "ووک فولاد کربنی",
    "Chopping Board": "تخته خردکن",
    "Citrus Squeezer Yellow": "آب‌مرکبات‌گیر زرد",
    "Egg Slicer": "تخم‌مرغ‌خردکن",
    "Electric Stove": "اجاق برقی",
    "Fine Mesh Strainer": "آبکش توری ریز",
    Fork: "چنگال",
    Glass: "لیوان شیشه‌ای",
    "Grater Black": "رنده مشکی",
    "Hand Blender": "مخلوط‌کن دستی",
    "Ice Cube Tray": "قالب یخ",
    "Kitchen Sieve": "الک آشپزخانه",
    Knife: "چاقوی آشپزخانه",
    "Lunch Box": "ظرف غذا",
    "Microwave Oven": "مایکروویو",
    "Mug Tree Stand": "جالیوانی درختی",
    Pan: "تابه",
    Plate: "بشقاب",
    "Red Tongs": "انبر قرمز",
    "Silver Pot With Glass Cap": "قابلمه نقره‌ای با درب شیشه‌ای",
    "Slotted Turner": "کفگیر سوراخ‌دار",
    "Spice Rack": "جا ادویه‌ای",
    Spoon: "قاشق",
    Tray: "سینی",
    "Wooden Rolling Pin": "وردنه چوبی",
    "Yellow Peeler": "پوست‌کن زرد",

    // لپ‌تاپ
    "Apple MacBook Pro 14 Inch Space Grey":
        "لپ‌تاپ اپل مک‌بوک پرو ۱۴ اینچ خاکستری",
    "Asus Zenbook Pro Dual Screen Laptop":
        "لپ‌تاپ ایسوس زن‌بوک پرو دو صفحه‌نمایش",
    "Huawei Matebook X Pro": "لپ‌تاپ هوآوی میت‌بوک ایکس پرو",
    "Lenovo Yoga 920": "لپ‌تاپ لنوو یوگا ۹۲۰",
    "New DELL XPS 13 9300 Laptop": "لپ‌تاپ جدید دل ایکس‌پی‌اس ۱۳ مدل ۹۳۰۰",
};

// کلمه‌های رنگ و جنس برای ساخت نام فارسی محصولاتی که ترجمه‌ی کامل ندارن
const WORDS_FA = [
    [/\bblack\b/i, "مشکی"],
    [/\bwhite\b/i, "سفید"],
    [/\bblue\b/i, "آبی"],
    [/\bred\b/i, "قرمز"],
    [/\bgreen\b/i, "سبز"],
    [/\b(grey|gray)\b/i, "طوسی"],
    [/\bbrown\b/i, "قهوه‌ای"],
    [/\bpink\b/i, "صورتی"],
    [/\bgold(en)?\b/i, "طلایی"],
    [/\bsilver\b/i, "نقره‌ای"],
    [/\byellow\b/i, "زرد"],
    [/\bpurple\b/i, "بنفش"],
    [/\bleather\b/i, "چرمی"],
    [/\bcotton\b/i, "نخی"],
    [/\bwood(en)?\b/i, "چوبی"],
    [/\bsteel\b/i, "استیل"],
];

// نام فارسی ساده برای محصولاتی که توی TITLE_FA نیستن (بدون هیچ کلمه‌ی لاتین)
const buildFallbackTitle = (product, index) => {
    const base = CATEGORY_FA[product.category] || "محصول";
    const words = WORDS_FA.filter(([pattern]) => pattern.test(product.title))
        .map(([, fa]) => fa)
        .slice(0, 2);

    return [base, ...words, `مدل ${index.toLocaleString("fa-IR")}`].join(" ");
};

const formatPrice = (price) => price.toLocaleString("fa-IR");



// یکسان‌سازی متن برای جستجو:
// حروف عربی به فارسی، حذف نیم‌فاصله (تا «لپتاپ» و «لپ‌تاپ» یکی باشن)، بزرگ/کوچک
const normalize = (text) =>
    String(text)
        .toLowerCase()
        .replace(/ي/g, "ی")
        .replace(/ك/g, "ک")
        .replace(/\u200c/g, "")
        .trim();

const isValidProducts = (data) =>
    Array.isArray(data) &&
    data.length > 0 &&
    data.every(
        (p) =>
            p &&
            typeof p.id !== "undefined" &&
            typeof p.title === "string" &&
            typeof p.price === "number" &&
            typeof p.img === "string",
    );

const readCache = () => {
    try {
        const raw = window.localStorage.getItem(CACHE_KEY);
        if (!raw) return null;

        const { savedAt, data } = JSON.parse(raw);
        if (typeof savedAt !== "number" || !isValidProducts(data)) return null;

        return { data, isFresh: Date.now() - savedAt < CACHE_TTL };
    } catch (error) {
        return null;
    }
};

const writeCache = (data) => {
    try {
        window.localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ savedAt: Date.now(), data }),
        );
    } catch (error) {
        // حافظه پر یا Private Mode: بدون کش ادامه می‌دیم
    }
};

const Products = ({ onlyDiscount = false }) => {
    const { addToCart, setToast, searchQuery, setSearchQuery } =
        useContext(CreateContext);

    const [cached] = useState(readCache);
    const [products, setProducts] = useState(cached ? cached.data : []);
    const [loading, setLoading] = useState(!cached);
    const [error, setError] = useState(false);

    // جستجو با تأخیر کوتاه، تا با هر حرف کل لیست دوباره فیلتر نشه
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery || "");




    useEffect(() => {
        const timer = setTimeout(
            () => setDebouncedQuery(searchQuery || ""),
            SEARCH_DELAY,
        );
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const isSearching = normalize(debouncedQuery) !== "";

    // همه‌ی کلمه‌های جستجو باید توی عنوان باشن
    // (عنوان انگلیسی فقط برای جستجو نگه داشته می‌شه و هیچ‌جا نمایش داده نمی‌شه)
    const filteredProducts = useMemo(() => {
        const tokens = normalize(debouncedQuery).split(/\s+/).filter(Boolean);
        if (tokens.length === 0) return products;

        return products.filter((p) => {
            const haystack = normalize(`${p.title} ${p.titleEn || ""}`);
            return tokens.every((token) => haystack.includes(token));
        });

    }, [products, debouncedQuery]);


    // الگوریتم Fisher-Yates: بُر زدن درست و بدون سوگیری
    const shuffle = (array) => {
        const result = [...array];
        for (let i = result.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [result[i], result[j]] = [result[j], result[i]];
        }
        return result;
    };


    {
        /* برای نشون دادن کاپوننت محصولات دارای تخفیف */
    }

    const discountedProducts = useMemo(() => {
        return shuffle(filteredProducts).slice(0, 12);
    }, [filteredProducts]);

    const [discountLoading, setDiscountLoading] = useState(onlyDiscount);

    useEffect(() => {
        if (!onlyDiscount) return;

        setDiscountLoading(true);
        const timer = setTimeout(() => setDiscountLoading(false), 500);

        return () => clearTimeout(timer);
    }, [onlyDiscount]);



    const fetchProducts = useCallback(
        async (signal, silent = false) => {
            if (!silent) {
                setLoading(true);
                setError(false);
            }

            try {
                const res = await fetch(API_URL, { signal });
                if (!res.ok) throw new Error("bad response");

                const data = await res.json();

                // شمارنده‌ی هر دسته، برای ساخت «مدل ۱»، «مدل ۲» و ...
                const counters = {};

                const mapped = data.products.map((p) => {
                    counters[p.category] = (counters[p.category] || 0) + 1;
                    const basePrice = Math.round(p.price * DOLLAR_RATE);
                    const discount = Math.round(p.discountPercentage || 0);

                    return {
                        id: p.id,
                        title:
                            TITLE_FA[p.title] || buildFallbackTitle(p, counters[p.category]),
                        titleEn: p.title,
                        category: p.category,
                        price: basePrice,    // قیمت اصلی
                        discount,    // درصد تخفیف (عدد صحیح)
                        finalPrice: Math.round(basePrice * (1 - discount / 100)), // قیمت نهایی,
                        img: p.thumbnail,

                    };
                });

                setProducts(mapped);
                setError(false);
                writeCache(mapped);
            } catch (err) {
                if (err.name === "AbortError") return;

                console.error("خطا در دریافت محصولات:", err);

                if (!silent) {
                    setError(true);
                    setToast({
                        type: "error",
                        message: "دریافت محصولات با خطا مواجه شد",
                        id: Date.now(),
                    });
                }
            } finally {
                setLoading(false);
            }
        },
        [setToast],
    );
    const displayedProducts = onlyDiscount ? discountedProducts : filteredProducts;

    useEffect(() => {
        const current = readCache();

        if (current && current.isFresh) return;

        const controller = new AbortController();
        fetchProducts(controller.signal, Boolean(current));
        return () => controller.abort();
    }, [fetchProducts]);


    return (

        <>

            <ProductsNavbar />
            {!onlyDiscount && <Stories />}

            <section className="container mt-4 mb-5">
                <h2 className="products-heading">
                    {isSearching
                        ? `نتایج جستجو برای «${debouncedQuery.trim()}»`
                        : onlyDiscount
                            ? "محصولات تخفیف دار"
                            : "محصولات پیشنهادی"}
                </h2>

                {isSearching && !loading && !error && displayedProducts.length > 0 && (
                    <p className="products-count">
                        {displayedProducts.length.toLocaleString("fa-IR")} محصول پیدا شد
                    </p>
                )}

                {loading || discountLoading ? (
                    <div className="products-state">
                        <div className="products-spinner" />
                        <p>در حال دریافت محصولات...</p>
                    </div>
                ) : error ? (
                    <div className="products-state">
                        <p>مشکلی در دریافت محصولات پیش آمد.</p>
                        <button
                            type="button"
                            className="product-btn products-retry"
                            onClick={() => fetchProducts()}
                        >
                            تلاش دوباره
                        </button>
                    </div>
                ) : displayedProducts.length === 0 ? (
                    <div className="products-state">
                        <i className="fa-solid fa-magnifying-glass products-state-icon"></i>
                        <p>محصولی با این عنوان پیدا نشد.</p>
                        <button
                            type="button"
                            className="product-btn products-retry"
                            onClick={() => setSearchQuery("")}
                        >
                            پاک کردن جستجو
                        </button>
                    </div>
                ) : (
                    <div className="row g-3">
                        {displayedProducts.map((product) => (
                            <div key={product.id} className="col-6 col-md-4 col-lg-3">
                                <article className="product-card">
                                    <div className="product-img-wrap">
                                        <img
                                            src={product.img}
                                            alt={product.title}
                                            className="product-img"
                                            loading="lazy"
                                        />
                                        {onlyDiscount && product.discount > 0 && (
                                            <span className="product-badge">
                                                {product.discount.toLocaleString("fa-IR")}٪
                                            </span>
                                        )}
                                    </div>

                                    <div className="product-body">
                                        <h5> نام محصول :</h5>
                                        <h3 className="product-title">{product.title}</h3>

                                        <div className="product-price">
                                            {onlyDiscount && product.discount > 0 ? (
                                                <>
                                                    <div className="price-old-row">
                                                        <del className="price-old">
                                                            {formatPrice(product.price)}
                                                        </del>
                                                        <span className="price-off">
                                                            {product.discount.toLocaleString("fa-IR")}٪ تخفیف
                                                        </span>
                                                    </div>
                                                    <div className="price-final-row">
                                                        <span>{formatPrice(product.finalPrice)}</span>
                                                        <small>تومان</small>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="price-final-row">
                                                    <span>{formatPrice(product.price)}</span>
                                                    <small>تومان</small>
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            type="button"
                                            className="product-btn"
                                            onClick={() =>
                                                addToCart(
                                                    onlyDiscount
                                                        ? { ...product, price: product.finalPrice }
                                                        : product
                                                )
                                            }
                                        >
                                            <i className="fa-solid fa-cart-plus"></i>
                                            <span>افزودن به سبد</span>
                                        </button>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </>


    );

};
export default Products;
