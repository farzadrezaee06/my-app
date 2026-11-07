import { DARK_PRIMARY_COLOR } from '../../../Helpers/DarkColor'
const StoriesProducts = () => {
  //  ممد دست انزن اینو خودم درستش میکنم 
    const stories = [
        { id: 1, title: 'تخفیف‌ها', img: 'https://picsum.photos/id/1011/200/200' },
        { id: 2, title: 'جدیدترین‌ها', img: 'https://picsum.photos/id/1025/200/200' },
        { id: 3, title: 'پرفروش‌ها', img: 'https://picsum.photos/id/1035/200/200' },
        { id: 4, title: 'موبایل', img: 'https://picsum.photos/id/1043/200/200' },
        { id: 5, title: 'لپ‌تاپ', img: 'https://picsum.photos/id/1050/200/200' },
        { id: 6, title: 'مد و پوشاک', img: 'https://picsum.photos/id/1062/200/200' },
        { id: 7, title: 'لوازم خانگی', img: 'https://picsum.photos/id/1074/200/200' },
        { id: 8, title: 'کتاب', img: 'https://picsum.photos/id/1080/200/200' },
        { id: 9, title: 'ورزش', img: 'https://picsum.photos/id/1084/200/200' },
        { id: 10, title: 'زیبایی', img: 'https://picsum.photos/id/1027/200/200' },
        { id: 11, title: 'اسباب‌بازی', img: 'https://picsum.photos/id/1005/200/200' },
        { id: 12, title: 'سوپرمارکت', img: 'https://picsum.photos/id/1039/200/200' },
    ];

    return (
        <section className='container mt-3'>
            <div className='stories-marquee'>
                <div className='stories-track '>
                    {[...stories, ...stories].map((story, index) => (
                        <button key={index} className='story-item' aria-hidden={index >= stories.length}>
                            <div className='btn w-100 text-center d-flex align-items-center justify-content-center fw-bold' style={{ backgroundColor: DARK_PRIMARY_COLOR }}>
                                <span className='story-title' >
                                    <span >{story.title}</span>
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

        </section>
    )
}
export default StoriesProducts; 