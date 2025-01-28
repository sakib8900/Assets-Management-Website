import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const UserText = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex justify-center items-center py-10">
      <div className="card w-full max-w-md bg-base-100 border-4">
        <div className="card-body text-center p-6">
          <h1 className="text-2xl font-bold text-primary">
            Hi, {user?.displayName || "User"}!
          </h1>
          <p className="mt-4 text-sm text-gray-600">
            It seems you are currently not part of any HR team. Don’t worry, please contact your HR department to add you to the team!
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserText;
