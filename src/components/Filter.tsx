import React from 'react';

interface FilterProps {
  categories: string[]; // Define the type for categories
  onFilterChange: (value: string) => void; // Define the type for the onFilterChange function
}

const Filter: React.FC<FilterProps> = ({ categories, onFilterChange }) => {
  return (
    <div className="mb-4">
      <h3 className="font-bold">Filter by Category</h3>
      <select onChange={(e) => onFilterChange(e.target.value)} className="border rounded p-2">
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter; 