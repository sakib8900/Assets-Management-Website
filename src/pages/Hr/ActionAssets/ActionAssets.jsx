import React, { useState, useEffect } from 'react';
import SharedTitle from '../../../Shared/SharedTitle/SharedTitle';

const ActionAssets = () => {
    const [requests, setRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await fetch('https://asset-management-system-server-one.vercel.app/myAssets');
            const data = await response.json();
            setRequests(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching requests:', error);
            setLoading(false);
        }
    };

    const handleApprove = async (requestId) => {
        try {
            const response = await fetch(`https://asset-management-system-server-one.vercel.app/myAssets/${requestId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'approved' }),
            });

            if (response.ok) {
                fetchRequests();
            }
        } catch (error) {
            console.error('Error approving request:', error);
        }
    };

    const handleReject = async (requestId) => {
        try {
            const response = await fetch(`https://asset-management-system-server-one.vercel.app/myAssets/${requestId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'rejected' }),
            });

            if (response.ok) {
                fetchRequests();
            }
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    const filteredRequests = requests.filter((request) =>
        request.requesterName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.requesterEmail?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            {/* Card Header */}
            <SharedTitle heading={'Manage asset requests'} subHeading={'Approve Employee Request'}>Asset Requests

            </SharedTitle>

            {/* Search Section */}
            <div className="form-control mb-6">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full"
                />
            </div>

            {/* Requests List */}
            {loading ? (
                <div className="flex justify-center items-center">
                    <button className="btn btn-primary loading">Loading...</button>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-base-200">
                                <th>Asset Name</th>
                                <th>Asset Type</th>
                                <th>Requester</th>
                                <th>Request Date</th>
                                <th>Status</th>
                                <th>Note</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests.map((request) => (
                                <tr key={request._id}>
                                    <td>{request.assetName}</td>
                                    <td>{request.assetType}</td>
                                    <td>
                                        <div className="font-bold">{request.requesterName}</div>
                                        <div className="text-sm text-gray-500">
                                            {request.requesterEmail}
                                        </div>
                                    </td>
                                    <td>
                                        {new Date(request.requestDate).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <span
                                            className={`badge ${
                                                request.status === 'pending'
                                                    ? 'badge-warning'
                                                    : request.status === 'approved'
                                                    ? 'badge-success'
                                                    : 'badge-error'
                                            }`}
                                        >
                                            {request.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="truncate w-32">{request.note}</div>
                                    </td>
                                    <td>
                                        {request.status === 'pending' && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleApprove(request._id)}
                                                    className="btn btn-success btn-sm"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReject(request._id)}
                                                    className="btn btn-error btn-sm"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ActionAssets;
