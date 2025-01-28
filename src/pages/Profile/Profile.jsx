import React, { useContext, useState } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';
import { FaEdit } from 'react-icons/fa';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState(user?.displayName || '');

    const handleEdit = () => {
        setEditMode(true);
    };
    // console.log(user);
    const handleSave = async () => {
        if (user) {
            try {
                await updateProfile(user, { displayName: newName });
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Name updated successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setEditMode(false);
            } catch (error) {
                console.error('Failed to update name:', error.message);
                Swal.fire('Error', 'Failed to update name. Please try again.', 'error');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
                {/* <img
                    src={user?.photoURL || 'https://via.placeholder.com/150'}
                    alt="User Profile"
                    className="w-32 h-32 rounded-full mx-auto mb-4"
                /> */}
                {editMode ? (
                    <div>
                        <input
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
                            placeholder="Enter new name"
                        />
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        {/* <h2 className="text-xl font-bold text-blue-600 text-center mb-2">
                            Company Image
                        </h2> */}
                        <h2 className="text-xl font-semibold text-center mb-2">
                            Your Name: {user?.displayName || "Anonymous User"}
                        </h2>
                        <p className="text-gray-600 text-center mb-4">
                            Email: {user?.email || "Not available"}
                        </p>
                        <div className="w-full flex justify-end">
                            <button
                                onClick={handleEdit}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex justify-center items-center gap-3">
                                Edit Name <FaEdit className='text-xl'></FaEdit>
                            </button>
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
};

export default Profile;
