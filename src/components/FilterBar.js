import React, { useState } from 'react';
import { FaFilter, FaShare, FaBars } from 'react-icons/fa';
import FilterAndShareComponent from './Filter';

const FilterBar = ({ onFilterChange, availableFilters, activeFilters, viewMode, setViewMode }) => {
  const [activeComponent, setActiveComponent] = useState('filter');

  const toggleComponent = (component) => {
    setActiveComponent(activeComponent === component ? null : component);
  };

  return (
    <div>
      <div className="flex justify-end space-x-2 mb-4">
        <button
          onClick={() => toggleComponent('filter')}
          className={`p-2 rounded-full transition-colors ${activeComponent === 'filter' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          <FaFilter />
        </button>
        <button
          onClick={() => toggleComponent('share')}
          className={`p-2 rounded-full transition-colors ${activeComponent === 'share' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          <FaShare />
        </button>
        <button
          onClick={() => toggleComponent('menu')}
          className={`p-2 rounded-full transition-colors ${activeComponent === 'menu' ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
        >
          <FaBars />
        </button>
      </div>
      {activeComponent === 'filter' && (
        <FilterAndShareComponent
          viewMode={viewMode}
          setViewMode={setViewMode}
          onFilterChange={onFilterChange}
          availableFilters={availableFilters}
          activeFilters={activeFilters}
        />
      )}
      {activeComponent === 'share' && (
        <div>Share component placeholder</div>
      )}
      {activeComponent === 'menu' && (
        <div>Menu component placeholder</div>
      )}
    </div>
  );
};

export default FilterBar;