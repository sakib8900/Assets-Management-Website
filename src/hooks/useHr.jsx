import { useState, useEffect } from 'react';
import axios from 'axios';

const useHr = () => {
    const [hrData, setHrData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://asset-management-system-server-one.vercel.app/hrManager');
                setHrData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return { hrData, loading, error };
};

export default useHr;