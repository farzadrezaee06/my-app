import { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreateContext } from '../../Context/contaxt';
import { DARK_SURFACE, DARK_PRIMARY_COLOR, DARK_BORDER_COLOR } from '../../Helpers/DarkColor'
import '../../Css/App.css';

const Search = () => {
    const { searchQuery, setSearchQuery } = useContext(CreateContext);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // اگه کاربر توی صفحه‌ی دیگه‌ای باشه، برای دیدن نتیجه به محصولات می‌ره
    const goToProducts = () => {
        if (pathname !== '/products') navigate('/products');
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value.trim()) goToProducts();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        goToProducts();
    };

    return (
        <form role='search' onSubmit={handleSubmit} className=' d-flex  text-center  justify-content-center  align-items-center w-100'>
            <div className='search-box'>
                <input
                    className=' py-1  text-end  fw-bold flex-grow-1 w-100'
                    type="search"
                    value={searchQuery}
                    onChange={handleChange}
                    onKeyDown={(e) => { if (e.key === 'Escape') setSearchQuery(''); }}
                    aria-label='جستجوی محصول'
                    placeholder='محصول مورد نظرتان را جستجو کنید'
                    style={{ paddingRight: "5px", paddingLeft: "30px", minWidth: 0, backgroundColor: "var(--input-bg)", color: "var(--input-text)", borderTopRightRadius: "5px", borderBottomRightRadius: "5px" }}
                />

                {searchQuery && (
                    <button type='button' className='search-clear' aria-label='پاک کردن جستجو' onClick={() => setSearchQuery('')}>
                        <i className='fa-solid fa-xmark'></i>
                    </button>
                )}
            </div>

            <button
                type='submit'
                aria-label='جستجو'
                className='fas fa-search  d-flex align-items-center justify-content-center flex-shrink-0'
                style={{ borderTopLeftRadius: "5px", borderBottomLeftRadius: "5px", backgroundColor: DARK_SURFACE, opacity: "0.8", width: "50px", height: "32px", color: DARK_PRIMARY_COLOR, borderRight: `1px solid ${DARK_BORDER_COLOR} `, cursor: "pointer" }}
            />
        </form>
    )
}
export default Search