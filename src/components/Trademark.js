import React, { useState, useEffect } from 'react';
import FilterBar from './FilterBar';
import ResultCardComponent from './Resultcard';
import Search from './Search';
import { getAvailableFilters, searchTrademarks } from '../services/api';

const TrademarkSearch = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [trademarks, setTrademarks] = useState([]);
  const [filteredTrademarks, setFilteredTrademarks] = useState([]);
  const [availableFilters, setAvailableFilters] = useState({
    owners: [],
    lawfirms: [],
    attorneys: [],
  });
  const [activeFilters, setActiveFilters] = useState({
    status: 'all',
    owners: [],
    lawfirms: [],
    attorneys: [],
  });

  useEffect(() => {
    const fetchAvailableFilters = async () => {
      try {
        const filters = await getAvailableFilters();
        setAvailableFilters({
          owners: filters.current_owner.buckets.map(bucket => bucket.key),
          lawfirms: filters.law_firm.buckets.map(bucket => bucket.key),
          attorneys: filters.attorney_name.buckets.map(bucket => bucket.key),
        });
      } catch (error) {
        console.error('Error fetching available filters:', error);
      }
    };
    fetchAvailableFilters();
  }, []);

  const handleSearchResults = (results) => {
    setTrademarks(results);
    setFilteredTrademarks(results);
  };

  const applyFilters = (filters, trademarks) => {
    return trademarks.filter(trademark => {
      const { status_type, current_owner, law_firm, attorney_name } = trademark._source;
      
      if (filters.status !== 'all' && status_type !== filters.status) {
        return false;
      }
      
      if (filters.owners.length > 0 && !filters.owners.includes(current_owner)) {
        return false;
      }
      
      if (filters.lawfirms.length > 0 && !filters.lawfirms.includes(law_firm)) {
        return false;
      }
      
      if (filters.attorneys.length > 0 && !filters.attorneys.includes(attorney_name)) {
        return false;
      }
      
      return true;
    });
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    const newFilteredTrademarks = applyFilters(filters, trademarks);
    setFilteredTrademarks(newFilteredTrademarks);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <Search onSearchResults={handleSearchResults} />
      </div>
      <div className="flex">
        <div className="w-2/3 pr-4">
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2' : 'flex flex-col'} gap-4`}>
            {filteredTrademarks.map(trademark => (
              <ResultCardComponent
                key={trademark._id}
                trademark={trademark}
                viewMode={viewMode}
              />
            ))}
          </div>
        </div>
        <div className="w-1/3">
          <FilterBar
            onFilterChange={handleFilterChange}
            availableFilters={availableFilters}
            activeFilters={activeFilters}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </div>
      </div>
    </div>
  );
};

export default TrademarkSearch;