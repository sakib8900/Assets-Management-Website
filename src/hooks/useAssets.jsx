// useAssets.js - Custom Hook
import { useState, useEffect } from 'react';

const useAssets = (searchTerm = "", stockFilter = "", typeFilter = "", sortOption = "") => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssets = async () => {
            try {
                const queryParams = new URLSearchParams({
                    ...(searchTerm && { search: searchTerm }),
                    ...(stockFilter && { stock: stockFilter }),
                    ...(typeFilter && { type: typeFilter }),
                    ...(sortOption && { sort: sortOption })
                });

                const response = await fetch(`http://localhost:5000/assets?${queryParams}`);
                const data = await response.json();
                setAssets(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching assets:', error);
                setLoading(false);
            }
        };

        fetchAssets();
    }, [searchTerm, stockFilter, typeFilter, sortOption]);

    return [assets, loading, setAssets];
};

export default useAssets;