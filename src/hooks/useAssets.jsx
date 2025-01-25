import React, { useEffect, useState } from 'react';

const useAssets = (searchTerm, stockFilter, typeFilter, sortOption) => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const queryParams = new URLSearchParams();
                if (searchTerm) queryParams.append('search', searchTerm);
                if (stockFilter) queryParams.append('stock', stockFilter);
                if (typeFilter) queryParams.append('type', typeFilter);
                if (sortOption) queryParams.append('sort', sortOption);

                const response = await fetch(`http://localhost:5000/assets?${queryParams.toString()}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch assets');
                }
                const data = await response.json();
                setAssets(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAssets();
    }, [searchTerm, stockFilter, typeFilter, sortOption]);

    return { assets, loading, error };
};

export default useAssets;
