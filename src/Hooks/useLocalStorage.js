import { useState, useEffect, useRef } from 'react';

// خوندن امن از لوکال‌استوریج: خرابی JSON، داده‌ی نامعتبر یا بسته بودن حافظه سایت رو کرش نمی‌ده
const readValue = (key, initialValue, validate) => {
    try {
        const raw = window.localStorage.getItem(key);
        if (raw === null) return initialValue;

        const parsed = JSON.parse(raw);
        if (validate && !validate(parsed)) return initialValue;

        return parsed;
    } catch (error) {
        return initialValue;
    }
};

const useLocalStorage = (key, initialValue, validate) => {
    // مقدار اولیه مستقیم از لوکال‌استوریج خونده می‌شه (بدون فلش بعد از اولین رندر)
    const [value, setValue] = useState(() => readValue(key, initialValue, validate));

    // برای اینکه effect با هر رندر دوباره ساخته نشه
    const initialRef = useRef(initialValue);
    const validateRef = useRef(validate);

    // ذخیره با هر تغییر
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            // حافظه پر یا Private Mode: سایت بدون ذخیره‌سازی به کارش ادامه می‌ده
        }
    }, [key, value]);

    // همگام‌سازی بین تب‌ها
    useEffect(() => {
        const onStorage = (event) => {
            if (event.storageArea !== window.localStorage) return;
            if (event.key !== null && event.key !== key) return;
            setValue(readValue(key, initialRef.current, validateRef.current));
        };

        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, [key]);

    return [value, setValue];
};

export default useLocalStorage;