import React, { useContext, useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Helmet } from "react-helmet";
import useAssets from "../../../hooks/useAssets";
import Loading from "../../../Shared/Loading/Loading";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";

const AssetsList = () => {
    // const { user } = useContext(AuthContext);
    // console.log(user);
    const [assets, loading] = useAssets();
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [stockFilter, setStockFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [editData, setEditData] = useState(null);
    // Apply Filters and Sorting
    const applyFiltersAndSort = (data) => {
        let filteredData = [...data];
        if (sortOption === "quantity") {
            filteredData.sort((a, b) => a.quantity - b.quantity);
        }
        setFilteredAssets(filteredData);
    };

    useEffect(() => {
        const filtered = assets.filter((asset) => {
            const matchesSearch = asset.name.toLowerCase().includes(searchTerm);
            const matchesStock =
                stockFilter === "" ||
                (asset.quantity > 0 && stockFilter === "available") ||
                (asset.quantity === 0 && stockFilter === "out-of-stock");
            const matchesType =
                typeFilter === "" || asset.type.toLowerCase() === typeFilter;

            return matchesSearch && matchesStock && matchesType;
        });

        applyFiltersAndSort(filtered);
    }, [searchTerm, stockFilter, typeFilter, sortOption, assets]);

    const handleEdit = (asset) => {
        setEditData(asset); // Set the asset data for editing
        document.getElementById("edit-modal").checked = true; // Open the modal
    };


    const handleDelete = async (id) => {
        const confirmDelete = await Swal.fire({
            title: 'Are you sure you want to delete this asset?',
            text: "This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel',
        });
    
        if (confirmDelete.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:5000/assets/${id}`, {
                    method: "DELETE",
                });
                const data = await response.json();
                if (data.message) {
                    Swal.fire(
                        'Deleted!',
                        'Asset deleted successfully!',
                        'success'
                    );
                    window.location.reload(); // Refresh to reflect the changes
                }
            } catch (error) {
                console.error("Error deleting asset:", error);
                Swal.fire(
                    'Error!',
                    'There was an issue deleting the asset.',
                    'error'
                );
            }
        }
    };
    
    const handleUpdate = async (e) => {
        e.preventDefault();
        const updatedData = {
            ...editData,
            updatedDate: new Date().toISOString(), // Automatically set the updated date
        };
    
        try {
            const response = await fetch(`http://localhost:5000/assets/${editData._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });
            const data = await response.json();
            if (data.message) {
                Swal.fire(
                    'Updated!',
                    'Asset updated successfully!',
                    'success'
                );
                setEditData(null);
                window.location.reload();
            }
        } catch (error) {
            console.error("Error updating asset:", error);
            Swal.fire(
                'Error!',
                'There was an issue updating the asset.',
                'error'
            );
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
                    onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                    className="border p-2 rounded w-full"
                />
            </div>
            {/* Filter */}
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
                    onChange={(e) => setTypeFilter(e.target.value.toLowerCase())}
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
                        {filteredAssets.map((asset, idx) => (
                            <tr key={asset._id}>
                                <td>{idx + 1}</td>
                                <td>{asset.name}</td>
                                <td>{asset.type}</td>
                                <td>{asset.quantity}</td>
                                <td>{asset.addedDate}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm mr-2"
                                        onClick={() => handleEdit(asset)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        className="btn btn-error btn-sm"
                                        onClick={() => handleDelete(asset._id)}
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
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Product Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={editData.name}
                                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Product Type</span>
                                    </label>
                                    <select
                                        value={editData.type}
                                        onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                                        className="select select-bordered"
                                    >
                                        <option value="returnable">Returnable</option>
                                        <option value="non-returnable">Non-Returnable</option>
                                    </select>
                                </div>
                                <div className="form-control mb-4">
                                    <label className="label">
                                        <span className="label-text">Quantity</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={editData.quantity}
                                        onChange={(e) =>
                                            setEditData({ ...editData, quantity: parseInt(e.target.value) })
                                        }
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="modal-action">
                                    <button type="submit" className="btn btn-primary">
                                        Update
                                    </button>
                                    <label htmlFor="edit-modal" className="btn btn-error">
                                        Cancel
                                    </label>
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
