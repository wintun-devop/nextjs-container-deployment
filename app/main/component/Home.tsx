"use client";
import React from 'react';
import AuthHeader from '@/app/components/header';



const UserProfile = () => {

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <AuthHeader />
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                {/* Profile Header */}
                <div className="flex items-center space-x-4">
                    <img
                        src="/profile-placeholder.png"
                        alt="Profile"
                        className="w-20 h-20 rounded-full border"
                    />
                    <div>
                        <h2 className="text-xl font-semibold">John Doe</h2>
                        <p className="text-gray-600">johndoe@example.com</p>
                    </div>
                </div>

                {/* Account Details */}
                <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg font-semibold">Account Details</h3>
                    <p className="text-gray-700">Membership: Prime Member</p>
                    <p className="text-gray-700">Address: 123 Main St, City, Country</p>
                </div>

                {/* Order History */}
                <div className="mt-6 border-t pt-4">
                    <h3 className="text-lg font-semibold">Order History</h3>
                    <div className="space-y-4">
                        <div className="p-4 border rounded-md">
                            <p className="font-medium">Order #12345</p>
                            <p className="text-gray-600">Status: Delivered</p>
                            <p className="text-gray-600">Total: $99.99</p>
                        </div>
                        <div className="p-4 border rounded-md">
                            <p className="font-medium">Order #67890</p>
                            <p className="text-gray-600">Status: Shipped</p>
                            <p className="text-gray-600">Total: $49.99</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;