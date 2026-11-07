import { useEffect, useContext } from 'react';
import { CreateContext } from '../../Context/contaxt';
import '../../Css/App.css';
import img1 from '../../IMG/img1.png';
import img2 from '../../IMG/img2.png';
import img3 from '../../IMG/img3.png';
import img4 from '../../IMG/img4.png';
const images = [img1, img2, img3, img4];
const Banner = () => {
    const { current, setCurrent } = useContext(CreateContext)
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [current]);
    return (
        <section className='container mt-3'>
            <div className='banner-border rounded'>
                <div className='banner-slider rounded'>
                    {images.map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`تبلیغ ${index + 1}`}
                            className={`banner-slide ${index === current ? 'active' : ''}`}
                        />
                    ))}

                    <div className='banner-dots'>
                        {images.map((_, index) => (
                            <button
                                key={index}
                                type='button'
                                aria-label={`نمایش تبلیغ ${index + 1}`}
                                className={`banner-dot ${index === current ? 'active' : ''}`}
                                onClick={() => setCurrent(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Banner;
