"use client";

import Link from 'next/link';
import { format } from 'date-fns';

interface Order {
  id: string;
  date: Date;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  total: number;
  items: number;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: new Date(),
    status: 'completed',
    total: 2500,
    items: 2,
  },
  // Add more mock orders as needed
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function OrderHistory() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order History</h2>
      
      <div className="space-y-4">
        {mockOrders.map((order) => (
          <Link
            key={order.id}
            href={`/orders/${order.id}`}
            className="block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Order #{order.id}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {format(order.date, 'PPP')}
                </p>
              </div>
              <span
                className={`
                  px-3 py-1 rounded-full text-sm font-medium capitalize
                  ${statusColors[order.status]}
                `}
              >
                {order.status}
              </span>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-sm">
              <span className="text-gray-600">
                {order.items} {order.items === 1 ? 'item' : 'items'}
              </span>
              <span className="font-medium text-gray-900">
                Rs. {order.total.toLocaleString()}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {mockOrders.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No orders found
        </div>
      )}
    </div>
  );
} 