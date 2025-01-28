import React, { useState } from 'react';
import useAssets from '../../../hooks/useAssets';
import { FaBox } from 'react-icons/fa';
import { useContext } from 'react'; // Add this if you're using AuthContext
import { AuthContext } from '../../../providers/AuthProvider'; // Update path as needed
import Swal from 'sweetalert2';

const RequestAssets = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [stockFilter, setStockFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [requestNote, setRequestNote] = useState("");
    const [assets, loading] = useAssets(searchTerm, stockFilter, typeFilter);
    const { user } = useContext(AuthContext); // Assuming you have AuthContext for user info

    // Handle modal open
    const openModal = (asset) => {
        setSelectedAsset(asset);
        setModalOpen(true);
    };

    // Handle modal close
    const closeModal = () => {
        setSelectedAsset(null);
        setRequestNote("");
        setModalOpen(false);
    };

    const handleRequest = async () => {
        try {
            const requestData = {
                assetId: selectedAsset._id,
                assetName: selectedAsset.name,
                assetType: selectedAsset.type,
                requesterEmail: user.email,
                requesterName: user.displayName,
                requestDate: new Date().toISOString(),
                note: requestNote,
                status: 'pending'
            };

            const response = await fetch('http://localhost:5000/myAssets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                // Update the asset quantity in the assets collection
                await fetch(`http://localhost:5000/assets/${selectedAsset._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        quantity: selectedAsset.quantity - 1
                    }),
                });

                // Show success message (you can use a toast notification library here)
                Swal.fire("Request Send", "Asset request submitted successfully!", "success");
                closeModal();
            } else {
                throw new Error('Failed to submit request');
            }
        } catch (error) {
            // console.error('Error submitting request:', error);
            Swal.fire("Error", "Error submitting request", "error");
        }
    };

    // Rest of the component remains the same...
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center my-6">Request Assets</h1>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                <input
                    type="text"
                    placeholder="Search assets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full md:w-1/4"
                />
                <select
                    value={stockFilter}
                    onChange={(e) => setStockFilter(e.target.value)}
                    className="select select-bordered w-full md:w-1/4"
                >
                    <option value="">All Stock</option>
                    <option value="available">Available</option>
                    <option value="out-of-stock">Out of stock</option>
                </select>
                <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="select select-bordered w-full md:w-1/4"
                >
                    <option value="">All Types</option>
                    <option value="returnable">Returnable</option>
                    <option value="non-returnable">Non-returnable</option>
                </select>
            </div>

            {/* Loading or Asset Table */}
            {loading ? (
                <div className="flex justify-center items-center">
                    <button className="btn btn-primary loading">Loading...</button>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Table Header */}
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Asset Name</th>
                                <th>Asset Type</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {/* Table Body */}
                        <tbody>
                            {assets.map((asset, idx) => (
                                <tr key={asset._id}>
                                    <td>{idx + 1}</td>
                                    <td>{asset.name}</td>
                                    <td>{asset.type}</td>
                                    <td>
                                        <span
                                            className={`badge ${asset.quantity > 0 ? 'badge-success' : 'badge-error'
                                                }`}
                                        >
                                            {asset.quantity > 0 ? 'Available' : 'Unavailable'}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-primary flex items-center gap-2"
                                            disabled={asset.quantity === 0}
                                            onClick={() => openModal(asset)}
                                        >
                                            <FaBox />
                                            Request
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {modalOpen && selectedAsset && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h2 className="font-bold text-xl mb-4">
                            Request Asset: {selectedAsset.name}
                        </h2>
                        <textarea
                            placeholder="Add any additional notes..."
                            value={requestNote}
                            onChange={(e) => setRequestNote(e.target.value)}
                            className="textarea textarea-bordered w-full mb-4"
                        ></textarea>
                        <div className="modal-action">
                            <button
                                className="btn btn-primary"
                                onClick={handleRequest}
                            >
                                Submit Request
                            </button>
                            <button
                                className="btn"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestAssets;
