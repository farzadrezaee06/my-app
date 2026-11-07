import { useContext, useEffect } from 'react';
import { CreateContext } from '../../Context/contaxt.js'
import '../../Css/App.css'

const Toast = () => {
    const { toast, setToast } = useContext(CreateContext);

    useEffect(() => {
        if (!toast) return;
        const timer = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(timer);
    }, [toast, setToast]);

    if (!toast) return null;

    const isSuccess = toast.type === 'success';

    return (
        <div key={toast.id} className={`toast-box ${isSuccess ? 'toast-success' : 'toast-error'}`} role='status'>
            <i className={`fa-solid ${isSuccess ? 'fa-circle-check' : 'fa-circle-xmark'}`}></i>
            <span>{toast.message}</span>
            <button type='button' className='toast-close' aria-label='بستن' onClick={() => setToast(null)}>
                <i className='fa-solid fa-xmark'></i>
            </button>
            <div className='toast-timer' />
        </div>
    );
};
export default Toast;