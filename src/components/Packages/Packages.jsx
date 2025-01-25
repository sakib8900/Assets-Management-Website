import React from 'react';
import SharedTitle from '../../Shared/SharedTitle/SharedTitle';

const Packages = () => {
    return (
        <div className="py-16">
            <div className="max-w-6xl mx-auto px-4">
                <SharedTitle heading={"Our Packages"} subHeading={"Choose the perfect package that suits your company's needs"}></SharedTitle>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Package 1 */}
                    <div className="border-2 border-blue-500 p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-semibold mb-4 text-blue-500">
                            Maximum 5 employees
                        </h3>
                        <p className="text-gray-600 text-2xl font-bold">$5</p>
                    </div>
                    {/* Package 2 */}
                    <div className="border-2 border-blue-500 p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-semibold mb-4 text-blue-500">
                            Maximum 10 employees
                        </h3>
                        <p className="text-gray-600 text-2xl font-bold">$8</p>
                    </div>
                    {/* Package 3 */}
                    <div className="border-2 border-blue-500 p-6 rounded-lg shadow-md text-center">
                        <h3 className="text-xl font-semibold mb-4 text-blue-500">
                            Maximum 20 employees
                        </h3>
                        <p className="text-gray-600 text-2xl font-bold">$15</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Packages;