import React, { useState, useEffect, useCallback } from 'react';
import { FaSearch } from 'react-icons/fa';
import { searchTrademarks } from '../services/api';

function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
    return (
      <div className="flex items-center space-x-4 w-full max-w-4xl mx-auto">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search Trademark Here eg. Mickey Mouse"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        </div>
        <button
          onClick={onSearch}
          className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
        >
          Search
        </button>
      </div>
    );
}

function Search({ onSearchResults }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCount, setSearchCount] = useState(0);
    const [relatedKeywords, setRelatedKeywords] = useState([]);

    const performSearch = useCallback(async () => {
        try {
            const searchParams = {
                input_query: searchTerm,
                input_query_type: '',
                sort_by: 'default',
                status: [],
                exact_match: false,
                date_query: false,
                owners: [],
                attorneys: [],
                law_firms: [],
                mark_description_description: [],
                classes: [],
                page: 1,
                rows: 10,
                sort_order: 'desc',
                states: [],
                counties: []
            };
            const response = await searchTrademarks(searchParams);
            const results = response.body.hits.hits;
            onSearchResults(results);
            setSearchCount(response.body.hits.total.value);
            generateRelatedKeywords(searchTerm);
        } catch (error) {
            console.error('Error performing search:', error);
        }
    }, [searchTerm, onSearchResults]);

    useEffect(() => {
        if (searchTerm) {
            performSearch();
        }
    }, [searchTerm, performSearch]);

    const generateRelatedKeywords = (term) => {
        const keywords = [];
        if (term.length > 1) {
            keywords.push(term + '*');
            keywords.push(term.slice(1));
        }
        setRelatedKeywords(keywords);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={performSearch} />
            {searchCount > 0 && (
                <p className="mt-4 text-gray-600 text-center">About {searchCount} Trademarks found for "{searchTerm}"</p>
            )}
            {relatedKeywords.length > 0 && (
                <div className="mt-4 text-center">
                    <p className="text-gray-600">Also try searching for</p>
                    <div className="flex justify-center gap-2 mt-2">
                        {relatedKeywords.map((keyword, index) => (
                            <button
                                key={index}
                                onClick={() => setSearchTerm(keyword)}
                                className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm hover:bg-orange-200"
                            >
                                {keyword}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Search;