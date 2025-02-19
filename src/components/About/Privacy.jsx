import React from 'react';

const Privacy = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl">
                <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">
                    Privacy Policy
                </h1>
                
                <p className="text-gray-700 mb-4">
                    Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-4">1. Information We Collect</h2>
                <p className="text-gray-600 mb-3">
                    We collect personal information that you voluntarily provide to us, including your name, email address, and any other details submitted through forms on our website.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-4">2. How We Use Your Information</h2>
                <p className="text-gray-600 mb-3">
                    The collected information is used to:
                    <ul className="list-disc pl-5">
                        <li>Improve our services and user experience.</li>
                        <li>Respond to inquiries and support requests.</li>
                        <li>Provide relevant updates, notifications, and promotional offers.</li>
                    </ul>
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-4">3. Data Protection</h2>
                <p className="text-gray-600 mb-3">
                    We take appropriate security measures to protect your personal information from unauthorized access, modification, disclosure, or destruction.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-4">4. Third-Party Services</h2>
                <p className="text-gray-600 mb-3">
                    We may use third-party services for analytics and website improvements. These services are not allowed to use your data for any other purposes beyond what is stated in this policy.
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-4">5. Your Rights & Choices</h2>
                <p className="text-gray-600 mb-3">
                    You have the right to:
                    <ul className="list-disc pl-5">
                        <li>Access, update, or delete your personal information.</li>
                        <li>Opt out of receiving marketing communications.</li>
                        <li>Contact us for any concerns regarding your data.</li>
                    </ul>
                </p>

                <h2 className="text-xl font-semibold text-gray-800 mt-4">6. Changes to This Policy</h2>
                <p className="text-gray-600 mb-3">
                    We may update this Privacy Policy periodically. Please review it from time to time to stay informed about any changes.
                </p>
            </div>
        </div>
    );
};

export default Privacy;
