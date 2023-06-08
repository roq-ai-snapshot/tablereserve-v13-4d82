import axios from 'axios';
import queryString from 'query-string';
import { TableConfigurationInterface } from 'interfaces/table-configuration';
import { GetQueryInterface } from '../../interfaces';

export const getTableConfigurations = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/table-configurations${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createTableConfiguration = async (tableConfiguration: TableConfigurationInterface) => {
  const response = await axios.post('/api/table-configurations', tableConfiguration);
  return response.data;
};

export const updateTableConfigurationById = async (id: string, tableConfiguration: TableConfigurationInterface) => {
  const response = await axios.put(`/api/table-configurations/${id}`, tableConfiguration);
  return response.data;
};

export const getTableConfigurationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/table-configurations/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteTableConfigurationById = async (id: string) => {
  const response = await axios.delete(`/api/table-configurations/${id}`);
  return response.data;
};
