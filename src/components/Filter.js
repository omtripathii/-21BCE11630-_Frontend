import React, { useState, useEffect } from 'react';
import { FaThList, FaThLarge } from 'react-icons/fa';

const FilterAndShareComponent = ({ viewMode, setViewMode, onFilterChange, availableFilters, activeFilters }) => {
  const [filters, setFilters] = useState(activeFilters);

  const [searchTerms, setSearchTerms] = useState({
    owners: '',
    lawfirms: '',
    attorneys: '',
  });

  useEffect(() => {
    setFilters(activeFilters);
  }, [activeFilters]);

  const handleStatusChange = (status) => {
    const newFilters = { ...filters, status };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: [...filters[field], value] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const removeFilter = (field, value) => {
    const newFilters = { ...filters, [field]: filters[field].filter(item => item !== value) };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleInputChange = (field, value) => {
    setSearchTerms({ ...searchTerms, [field]: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Display</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out ${
              viewMode === 'grid' 
                ? 'bg-white text-black shadow-md' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            <FaThLarge className="inline-block mr-2" /> Grid View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ease-in-out ${
              viewMode === 'list' 
                ? 'bg-white text-black shadow-md' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            <FaThList className="inline-block mr-2" /> List View
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Status</h3>
        <div className="flex space-x-2">
          {['all', 'registered', 'unregistered'].map((status) => (
            <button
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`px-3 py-1 rounded-full ${
                filters.status === status
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {['Owners', 'Law Firms', 'Attorneys'].map((field) => (
        <div key={field} className="mb-4">
          <h3 className="font-semibold mb-2">{field}</h3>
          <div className="relative">
            <input
              type="text"
              placeholder={`Search ${field.toLowerCase()}`}
              value={searchTerms[field.toLowerCase().replace(' ', '')]}
              onChange={(e) => handleInputChange(field.toLowerCase().replace(' ', ''), e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {filters[field.toLowerCase().replace(' ', '')].map((item) => (
              <span key={item} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center">
                {item}
                <button onClick={() => removeFilter(field.toLowerCase().replace(' ', ''), item)} className="ml-2 text-blue-800 hover:text-blue-600">
                  &times;
                </button>
              </span>
            ))}
          </div>
          <div className="mt-2">
            {availableFilters[field.toLowerCase().replace(' ', '')]
              .filter(item => item.toLowerCase().includes(searchTerms[field.toLowerCase().replace(' ', '')].toLowerCase()))
              .slice(0, 5)
              .map(item => (
                <button
                  key={item}
                  onClick={() => handleFilterChange(field.toLowerCase().replace(' ', ''), item)}
                  className="block w-full text-left px-2 py-1 hover:bg-gray-100"
                >
                  {item}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterAndShareComponent;