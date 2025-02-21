"use client";

import { useState } from 'react';
import { FaUser, FaHistory, FaMapMarkerAlt } from 'react-icons/fa';
import UserDetails from './UserDetails';
import OrderHistory from './OrderHistory';
import SavedAddresses from './SavedAddresses';


type TabType = 'details' | 'orders' | 'addresses';

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState<TabType>('details');

  const tabs = [
    { id: 'details', label: 'Profile Details', icon: FaUser },
    { id: 'orders', label: 'Order History', icon: FaHistory },
    { id: 'addresses', label: 'Saved Addresses', icon: FaMapMarkerAlt },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-lg font-medium
              transition-colors duration-200
              ${activeTab === tab.id
                ? 'bg-orange-500 text-white'
                : 'bg-orange-100 text-orange-900 hover:bg-orange-200'
              }
            `}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'details' && <UserDetails />}
        {activeTab === 'orders' && <OrderHistory />}
        {activeTab === 'addresses' && <SavedAddresses />}
      </div>
    </div>
  );
}
