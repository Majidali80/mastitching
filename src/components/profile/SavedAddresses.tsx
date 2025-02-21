"use client";

import { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { showNotification } from '../ui/Notifications';

interface Address {
  id: string;
  title: string;
  fullAddress: string;
  city: string;
  isDefault: boolean;
}

export default function SavedAddresses() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      title: 'Home',
      fullAddress: '123 Main Street',
      city: 'Lahore',
      isDefault: true,
    },
    // Add more addresses as needed
  ]);

  const [isAddingNew, setIsAddingNew] = useState<boolean>(false);

  const handleDelete = async (id: string) => {
    try {
      // API call to delete address
      setAddresses(addresses.filter(addr => addr.id !== id));
      showNotification.success('Address deleted successfully');
    } catch {
      showNotification.error('Failed to delete address');
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      // API call to set default address
      setAddresses(addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      })));
      showNotification.success('Default address updated');
    } catch {
      showNotification.error('Failed to update default address');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Saved Addresses</h2>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors"
        >
          <FaPlus className="w-4 h-4" />
          Add New Address
        </button>
      </div>

      <div className="grid gap-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`
              p-6 rounded-lg border-2
              ${address.isDefault ? 'border-orange-500' : 'border-gray-200'}
            `}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {address.title}
                  {address.isDefault && (
                    <span className="ml-2 text-sm text-orange-600">(Default)</span>
                  )}
                </h3>
                <p className="text-gray-600 mt-2">{address.fullAddress}</p>
                <p className="text-gray-600">{address.city}</p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(address.id)}
                  className="p-2 text-gray-600 hover:text-red-600"
                >
                  <FaTrash className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!address.isDefault && (
              <button
                onClick={() => handleSetDefault(address.id)}
                className="mt-4 text-sm text-orange-600 hover:text-orange-700"
              >
                Set as Default
              </button>
            )}
          </div>
        ))}
      </div>

      {addresses.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No saved addresses
        </div>
      )}
    </div>
  );
}