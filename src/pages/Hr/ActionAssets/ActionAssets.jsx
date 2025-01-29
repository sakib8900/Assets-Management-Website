import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import SharedTitle from '../../../Shared/SharedTitle/SharedTitle';
import Loading from '../../../Shared/Loading/Loading';
import { Helmet } from 'react-helmet';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

const ActionAssets = () => {
    const [requests, setRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10; // Show 10 items per page

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
                headers: { 'Content-Type': 'application/json' },
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'rejected' }),
            });

            if (response.ok) {
                fetchRequests();
            }
        } catch (error) {
            console.error('Error rejecting request:', error);
        }
    };

    // Filtered Data Based on Search
    const filteredRequests = requests.filter((request) =>
        request.requesterName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.requesterEmail?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination Logic
    const pageCount = Math.ceil(filteredRequests.length / itemsPerPage);
    const handlePageClick = ({ selected }) => setCurrentPage(selected);
    const startIndex = currentPage * itemsPerPage;
    const paginatedRequests = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="container mx-auto p-4">
            <Helmet>
                <title>Asset Management || Approve / Reject Assets</title>
            </Helmet>

            <SharedTitle heading={'Manage asset requests'} subHeading={'Approve Employee Request'} />

            {/* Search Input */}
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
                <Loading />
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-base-200">
                                <th>#</th>
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
                            {paginatedRequests.map((request, idx) => (
                                <tr key={request._id}>
                                    <td>{startIndex + idx + 1}</td>
                                    <td>{request.assetName}</td>
                                    <td>{request.assetType}</td>
                                    <td>
                                        <div className="font-bold">{request.requesterName}</div>
                                        <div className="text-sm text-gray-500">{request.requesterEmail}</div>
                                    </td>
                                    <td>{new Date(request.requestDate).toLocaleDateString()}</td>
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
                                                    <AiOutlineCheck></AiOutlineCheck>
                                                </button>
                                                <button
                                                    onClick={() => handleReject(request._id)}
                                                    className="btn btn-error btn-sm"
                                                >
                                                    <AiOutlineClose></AiOutlineClose>
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-6">
                        <ReactPaginate
                            previousLabel={'←'}
                            nextLabel={'→'}
                            breakLabel={'...'}
                            pageCount={pageCount}
                            marginPagesDisplayed={1}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={'flex space-x-2'}
                            pageClassName={'px-3 py-2 rounded-lg border bg-gray-200 hover:bg-gray-300 cursor-pointer'}
                            previousClassName={'px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600'}
                            nextClassName={'px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600'}
                            breakClassName={'px-3 py-2'}
                            disabledClassName={'opacity-50 cursor-not-allowed'}
                            activeClassName={'bg-blue-500 text-white'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActionAssets;
