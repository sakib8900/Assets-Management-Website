import React, { useEffect, useState } from "react";
import SharedTitle from "../../../Shared/SharedTitle/SharedTitle";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Helmet } from "react-helmet";
import useAssets from "../../../hooks/useAssets";
import Loading from "../../../Shared/Loading/Loading";

const AssetsList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [stockFilter, setStockFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [sortOption, setSortOption] = useState("");

    const { assets, loading, error } = useAssets(searchTerm, stockFilter, typeFilter, sortOption);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Helmet>
                <title>Asset Management || AssetsList</title>
            </Helmet>
            <div>
                <SharedTitle
                    heading={"Our Available Assets"}
                    subHeading={"Manage Your Resources"}
                />
            </div>

            {/* Search Section */}
            <div className="my-4">
                <input
                    type="text"
                    placeholder="Search by Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 rounded w-full"
                />
            </div>

            {/* Filter Section */}
            <div className="flex gap-4 my-4">
                <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Stock Status</option>
                    <option value="available">Available</option>
                    <option value="out-of-stock">Out of Stock</option>
                </select>
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Asset Type</option>
                    <option value="returnable">Returnable</option>
                    <option value="non-returnable">Non-Returnable</option>
                </select>
            </div>
            {/* Sorting */}
            <div className="my-4">
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Sort By</option>
                    <option value="quantity">Quantity</option>
                </select>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Product Type</th>
                            <th>Quantity</th>
                            <th>Date Added</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assets.map((asset, idx) => (
                            <tr key={asset._id}>
                                <td>{idx + 1}</td>
                                <td>{asset.name}</td>
                                <td>{asset.type}</td>
                                <td>{asset.quantity}</td>
                                <td>{asset.addedDate}</td>
                                <td>
                                    <button className="btn bg-blue-500 btn-sm mr-2">
                                        <FaEdit />
                                    </button>
                                    <button className="btn btn-error btn-sm">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssetsList;
