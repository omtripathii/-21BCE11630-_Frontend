import axios from 'axios';

const API_URL = 'https://vit-tm-task.api.trademarkia.app/api/v3/us';

const headers = {
  'accept': 'application/json, text/plain, */*',
  'content-type': 'application/json',
};

export const searchTrademarks = async (searchParams) => {
  try {
    // Remove empty arrays from searchParams
    Object.keys(searchParams).forEach(key => 
      Array.isArray(searchParams[key]) && searchParams[key].length === 0 && delete searchParams[key]
    );

    const response = await axios.post(API_URL, searchParams, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching trademarks:', error);
    throw error;
  }
};

export const getAvailableFilters = async () => {
  try {
    const response = await axios.post(API_URL, {
      input_query: '',
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
      rows: 1,
      sort_order: 'desc',
      states: [],
      counties: []
    }, { headers });
    return response.data.body.aggregations;
  } catch (error) {
    console.error('Error fetching available filters:', error);
    throw error;
  }
};