import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate(); // ใช้ useNavigate แทน Navigate

    // ใช้ useEffect เพื่อเริ่มการนับถอยหลัง
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => {
                if (currentCount === 1) {
                    clearInterval(interval);
                    setRedirect(true); // อัปเดตสถานะ redirect เมื่อถึงเวลานับถอยหลัง
                }
                return currentCount - 1;
            });
        }, 1000);

        return () => clearInterval(interval); // ทำความสะอาดเมื่อคอมโพเนนต์ถูกทำลาย
    }, []);

    // ใช้ useEffect ที่สองสำหรับการเปลี่ยนเส้นทางเมื่อสถานะ redirect เป็น true
    useEffect(() => {
        if (redirect) {
            navigate('/'); // ทำการเปลี่ยนเส้นทางหลังจากสถานะ redirect เป็น true
        }
    }, [redirect, navigate]); // ใช้ `redirect` เป็น dependency

    return <div>Loading to redirect in {count} seconds</div>;
};

export default LoadingToRedirect;
