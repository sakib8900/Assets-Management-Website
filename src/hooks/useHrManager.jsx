import { useState, useEffect } from 'react';

const useHrManager = (role) => {
    const [hrManager, setHrManager] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (role === 'hr') {
            fetch('https://asset-management-system-server-one.vercel.app/hrManager')
                .then(response => response.json())
                .then(data => {
                    setHrManager(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError(err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [role]);

    return { hrManager, loading, error };
};

export default useHrManager;