import { useState, useEffect } from "react";
import axios from "axios";

const useAssets = (searchTerm = "", stockFilter = "", typeFilter = "", sortOption = "") => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssets = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams({
                    ...(searchTerm && { search: searchTerm }),
                    ...(stockFilter && { stock: stockFilter }),
                    ...(typeFilter && { type: typeFilter }),
                    ...(sortOption && { sort: sortOption }),
                });

                const response = await axios.get(`https://asset-management-system-server-one.vercel.app/assets?${queryParams}`);
                setAssets(response.data);
            } catch (error) {
                // console.error("Error fetching assets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAssets();
    }, [searchTerm, stockFilter, typeFilter, sortOption]);

    return [assets, loading, setAssets];
};

export default useAssets;
