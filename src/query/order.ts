import { CreateOrdersRequest, ListOrdersResponse, UpdateOrdersRequest } from '../model/orders';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import axios from 'axios';

// API URL
const API_URL = 'http://api.thangnq.studio:8080/api/v1/order';

// Fetch orders
export const fetchOrders = async (): Promise<ListOrdersResponse> => {
  const response = await axios.get<ListOrdersResponse>(API_URL);
  return response.data;
};

// Create order
export const createOrder = async (orderRequest: CreateOrdersRequest): Promise<void> => {
  await axios.post(API_URL, orderRequest);
};

// Update order
export const updateOrder = async (updateRequest: UpdateOrdersRequest): Promise<void> => {
  await axios.put(`${API_URL}/${updateRequest.id}`, updateRequest.orders);
};

// Delete order
export const deleteOrder = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

// Custom hooks for data fetching and mutation
export const useListOrders = () => useQuery('orders', fetchOrders);

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(createOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries('orders');
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(updateOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries('orders');
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries('orders');
    },
  });
};