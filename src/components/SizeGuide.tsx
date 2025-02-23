import React from 'react';

const SizeGuide = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Size Guide</h2>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Size</th>
              <th className="border px-4 py-2">Chest (inches)</th>
              <th className="border px-4 py-2">Waist (inches)</th>
              <th className="border px-4 py-2">Length (inches)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">S</td>
              <td className="border px-4 py-2">34-36</td>
              <td className="border px-4 py-2">28-30</td>
              <td className="border px-4 py-2">28</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">M</td>
              <td className="border px-4 py-2">38-40</td>
              <td className="border px-4 py-2">30-32</td>
              <td className="border px-4 py-2">29</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">L</td>
              <td className="border px-4 py-2">42-44</td>
              <td className="border px-4 py-2">34-36</td>
              <td className="border px-4 py-2">30</td>
            </tr>
            {/* Add more sizes as needed */}
          </tbody>
        </table>
        <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded" onClick={() => window.location.reload()}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SizeGuide; 