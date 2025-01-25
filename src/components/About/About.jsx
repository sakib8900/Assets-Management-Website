import React from 'react';
import { FaLightbulb, FaLock, FaUsers, FaRocket } from 'react-icons/fa';
import SharedTitle from '../../Shared/SharedTitle/SharedTitle';

const AboutSection = () => {
    return (
        <div className="py-16">
            <div className="max-w-6xl mx-auto px-4">
                <SharedTitle  heading={"About Us"} subHeading={"Our platform is designed to provide users with the best services and solutions"}>
                </SharedTitle>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* 1 */}
                    <div className="flex flex-col items-center text-center border-2 border-blue-500 p-6 rounded-lg shadow-md">
                        <FaLightbulb className="text-4xl text-blue-500 mb-4" />
                        <h3 className="text-xl font-semibold">Innovative Solutions</h3>
                        <p className="text-gray-600">We bring cutting-edge technology to solve real-world problems.</p>
                    </div>
                    {/* 2 */}
                    <div className="flex flex-col items-center text-center border-2 border-blue-500 p-6 rounded-lg shadow-md">
                        <FaLock className="text-4xl text-blue-500 mb-4" />
                        <h3 className="text-xl font-semibold">Secure System</h3>
                        <p className="text-gray-600">Your data is always safe with us, thanks to our top-notch security.</p>
                    </div>
                    {/* 3 */}
                    <div className="flex flex-col items-center text-center border-2 border-blue-500 p-6 rounded-lg shadow-md">
                        <FaUsers className="text-4xl text-blue-500 mb-4" />
                        <h3 className="text-xl font-semibold">User-Centric Design</h3>
                        <p className="text-gray-600">We prioritize user experience to ensure satisfaction.</p>
                    </div>
                    {/* 4 */}
                    <div className="flex flex-col items-center text-center border-2 border-blue-500 p-6 rounded-lg shadow-md">
                        <FaRocket className="text-4xl text-blue-500 mb-4" />
                        <h3 className="text-xl font-semibold">Fast Performance</h3>
                        <p className="text-gray-600">Experience seamless and quick services every time.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;
