import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { FiCornerUpLeft } from "react-icons/fi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";
import SharedTitle from "../../../Shared/SharedTitle/SharedTitle";
import Loading from "../../../Shared/Loading/Loading";
import { FaNoteSticky } from "react-icons/fa6";

const MyAssets = () => {
  const [assets, setAssets] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    if (user && user.email) {
      axiosSecure
        .get("https://asset-management-system-server-one.vercel.app/myAssets")
        .then((response) => {
          const userAssets = response.data.filter(
            (asset) => asset.requesterEmail === user.email
          );
          setAssets(userAssets);
          setLoading(false);
        })
        .catch((error) => {
          console.error("There was an error fetching the assets!", error);
        });
    }
  }, [user]);

  const handleReturn = (id) => {
    setDisabledButtons((prevDisabled) => [...prevDisabled, id]);
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>Asset Management || My Assets</title>
      </Helmet>
      <SharedTitle heading="My Assets"></SharedTitle>

      <div className="overflow-x-auto">
        <table className="table w-full border table-auto">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="p-2 sm:p-3">#</th>
              <th className="p-2 sm:p-3 text-left">Assets Name</th>
              <th className="p-2 sm:p-3 text-left">Assets Type</th>
              <th className="p-2 sm:p-3 text-left">Request Date</th>
              <th className="p-2 sm:p-3 text-left">Status</th>
              <th className="p-2 sm:p-3 text-left">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {assets.length > 0 ? (
              assets.map((asset, idx) => (
                <tr key={asset._id} className="border-b">
                  <td className="p-2 sm:p-3">{idx + 1}</td>
                  <td className="p-2 sm:p-3">{asset.assetName}</td>
                  <td className="p-2 sm:p-3">{asset.assetType}</td>
                  <td className="p-2 sm:p-3">
                    {new Date(asset.requestDate).toLocaleDateString()}
                  </td>
                  <td className="p-2 sm:p-3">
                    <span
                      className={`badge ${
                        asset.status === "approved"
                          ? "badge-success"
                          : asset.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {asset.status}
                    </span>
                  </td>
                  <td className="p-2 sm:p-3 flex gap-3 border-2">
                    {/* Note Button */}
                    <button
                      onClick={() => setSelectedNote(asset.note)}
                      className="flex items-center text-blue-700"
                    >
                      <FaNoteSticky className="mr-2"></FaNoteSticky> Note
                    </button>

                    {asset.status === "approved" && (
                      <button
                        onClick={() => handleReturn(asset._id)}
                        disabled={disabledButtons.includes(asset._id)}
                        className={`py-2 px-4 rounded ${
                          disabledButtons.includes(asset._id)
                            ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-700 text-white"
                        }`}
                      >
                        <FiCornerUpLeft></FiCornerUpLeft>
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedNote !== null && (
        <dialog id="note-modal" className="modal" open>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Asset Note</h3>
            <p className="py-4">{selectedNote ? selectedNote : "No note available."}</p>
            <div className="modal-action">
              <button
                onClick={() => setSelectedNote(null)}
                className="items-center px-3 py-2 backdrop-blur-md text-blue-500 text-lg font-semibold rounded-lg 
                                             shadow-lg hover:bg-blue-500 hover:text-black border-2 border-blue-500 
                                             transition-all duration-300 hover:shadow-blue-500/50 
                                             active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyAssets;
