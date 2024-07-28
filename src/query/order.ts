import { CreateOrdersRequest, ListOrdersResponse, UpdateOrdersRequest } from '../model/orders';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import axios from 'axios';
import {API} from "../utils/config.tsx";

const token = localStorage.getItem("token");

const instance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`
  }
})


// Fetch orders
export const fetchOrders = async (): Promise<ListOrdersResponse> => {
  const response = await instance.get<ListOrdersResponse>(`${API}/api/v1/order`);
  return response.data;
};

// Create order
export const createOrder = async (orderRequest: CreateOrdersRequest): Promise<void> => {
  await instance.post(`${API}/api/v1/order`, orderRequest);
};

// Update order
export const updateOrder = async (updateRequest: UpdateOrdersRequest): Promise<void> => {
  await instance.put(`${API}/api/v1/order/${updateRequest.id}`, updateRequest.orders);
};

// Delete order
export const deleteOrder = async (id: number): Promise<void> => {
  await instance.delete(`${API}/api/v1/order/${id}`);
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
