import React from 'react';

const ResultCardComponent = ({ trademark, viewMode }) => {
  const {
    mark_identification,
    status_type,
    current_owner,
    law_firm,
    attorney_name,
    registration_date,
  } = trademark._source;

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md ${viewMode === 'list' ? 'flex gap-4' : ''}`}>
      <h2 className="text-xl font-semibold mb-2">{mark_identification}</h2>
      <div className={viewMode === 'list' ? 'flex-grow' : ''}>
        <div className="flex items-center mb-2">
          <div className={`w-3 h-3 rounded-full mr-2 ${
            status_type === 'registered' ? 'bg-green-500' : 'bg-red-500'
          }`}></div>
          <span>{status_type}</span>
        </div>
        <div className={`grid ${viewMode === 'list' ? 'grid-cols-4' : 'grid-cols-2'} gap-2`}>
          <div>
            <p className="font-semibold">Owner:</p>
            <p>{current_owner}</p>
          </div>
          <div>
            <p className="font-semibold">Law Firm:</p>
            <p>{law_firm}</p>
          </div>
          <div>
            <p className="font-semibold">Attorney:</p>
            <p>{attorney_name}</p>
          </div>
          <div>
            <p className="font-semibold">Registration Date:</p>
            <p>{new Date(registration_date * 1000).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCardComponent;