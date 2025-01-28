// AssetsList.jsx - Updated Component
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Helmet } from "react-helmet";
import useAssets from "../../../hooks/useAssets";
import Loading from "../../../Shared/Loading/Loading";
import Swal from "sweetalert2";

const AssetsList = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [stockFilter, setStockFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [editData, setEditData] = useState(null);
    
    const [assets, loading, setAssets] = useAssets(
        searchTerm,
        stockFilter,
        typeFilter,
        sortOption
    );

    const handleEdit = async (asset) => {
        setEditData(asset);
        document.getElementById("edit-modal").checked = true;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:5000/assets/${editData._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: editData.name,
                    type: editData.type,
                    quantity: parseInt(editData.quantity)
                }),
            });

            const result = await response.json();

            if (result.modifiedCount > 0) {
                // Update local state
                setAssets(assets.map(asset => 
                    asset._id === editData._id ? { ...asset, ...editData } : asset
                ));
                
                Swal.fire('Success', 'Asset updated successfully!', 'success');
                document.getElementById("edit-modal").checked = false;
                setEditData(null);
            }
        } catch (error) {
            console.error("Error updating asset:", error);
            Swal.fire('Error', 'Failed to update asset', 'error');
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:5000/assets/${id}`, {
                    method: 'DELETE'
                });
                const data = await response.json();

                if (data.message === "Asset deleted successfully") {
                    // Update local state
                    setAssets(assets.filter(asset => asset._id !== id));
                    Swal.fire('Deleted!', 'Asset has been deleted.', 'success');
                }
            } catch (error) {
                console.error("Error deleting asset:", error);
                Swal.fire('Error', 'Failed to delete asset', 'error');
            }
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <Helmet>
                <title>Asset Management || AssetsList</title>
            </Helmet>
            
            <div>
                <h2 className="text-3xl font-bold text-center my-4">Our Available Assets</h2>
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

            {/* Filters */}
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

                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="">Sort By</option>
                    <option value="quantity">Quantity (Low to High)</option>
                    <option value="addedDate">Date Added (Newest First)</option>
                </select>
            </div>

            {/* Assets Table */}
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
                                <td className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(asset)}
                                        className="btn btn-primary btn-sm"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(asset._id)}
                                        className="btn btn-error btn-sm"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Edit Modal */}
            {editData && (
                <>
                    <input type="checkbox" id="edit-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Edit Asset</h3>
                            <form onSubmit={handleUpdate}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Product Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                        className="input input-bordered"
                                        required
                                    />
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Product Type</span>
                                    </label>
                                    <select
                                        value={editData.type}
                                        onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                                        className="select select-bordered"
                                        required
                                    >
                                        <option value="returnable">Returnable</option>
                                        <option value="non-returnable">Non-Returnable</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Quantity</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={editData.quantity}
                                        onChange={(e) => setEditData({ ...editData, quantity: parseInt(e.target.value) })}
                                        className="input input-bordered"
                                        min="0"
                                        required
                                    />
                                </div>

                                <div className="modal-action">
                                    <button type="submit" className="btn btn-primary">Update</button>
                                    <label htmlFor="edit-modal" className="btn">Cancel</label>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AssetsList;