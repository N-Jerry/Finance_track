import axios from 'axios';

const API_URL = 'http://localhost:8000/api/finance/';

export const getFinance = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createFinance = async (finance) => {
  const response = await axios.post(API_URL, finance);
  return response.data;
};

export const updateFinance = async (id, finance) => {
  const response = await axios.put(`${API_URL}${id}/`, finance);
  return response.data;
};

export const deleteFinance = async (id) => {
  await axios.delete(`${API_URL}${id}/`);
};
