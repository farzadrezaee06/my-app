import { createContext } from "react";
// از اینجا کنترول میشه contacx هی رونالدو فن کل 
export const CreateContext = createContext({
    loading: false,
    setLoading: () => { },
    ShowShoppingCart: false,
    setShowShoppingCart: () => { },
    ShoppingCartEvent: () => { },
    goHome: () => { },
    current: 0,
    setCurrent: () => { },
    scrollProgress: 0,
    setScrollProgress: () => { },
    tem: false,
    setTem: () => { },
    cartItems: [],
    addToCart: () => { },
    removeFromCart: () => { },
    toast: null,
    setToast: () => { },
    toggleTheme: () => { },
    searchQuery: '',
    setSearchQuery: () => { },

})