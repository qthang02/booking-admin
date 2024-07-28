import { CreateUserRequest, ListUsersResponse, UpdateUserRequest, User } from "../model/user";
import { useMutation, useQuery, useQueryClient } from "react-query";

import axios from "axios";
import { notification } from "antd";
import {API} from "../utils/config.tsx";

const token = localStorage.getItem("token");

const instance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`
  }
})

const apiListCustomers = async (page: number, limit: number): Promise<ListUsersResponse> => {
  return await instance.get(`${API}/api/v1/user`, {
    params: { page, limit }
  }).then(resp => resp.data);
};
const apiGetCustomer = async (userId: number): Promise<User> => {
  return await instance.get(`${API}/api/v1/user/${userId}`).then(response => response.data);
};

const apiUpdateCustomers = (req: UpdateUserRequest): Promise<void> => {
  return instance.put(`${API}/api/v1/user/${req.id}`, req.user);
};

const apiDeleteCustomer = (userId: number): Promise<void> => {
  return instance.delete(`${API}/api/v1/user/${userId}`);
};

const apiCreateCustomer = (req: CreateUserRequest): Promise<void> => {
  return instance.post(`${API}/api/v1/user`, req.user);
};

export const useListCustomers = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => apiListCustomers(page, limit ),
    onError: (error: Error) => {
      notification.error({
        message: "Hiển thị thông tin người dùng thất bại: " + error.message,
      });
    },


  });
};

export const useGetCustomer = () => {
  return useMutation({
    mutationFn: (userId: number) => apiGetCustomer(userId),
    onError: (error: Error) => {
      notification.error({
        message: "Lấy thông tin người dùng thất bại: " + error.message,
      });
    },
  });
};

export const useUpdateCustomer = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (req: UpdateUserRequest) => apiUpdateCustomers(req),
    onSuccess: () => {
      client.invalidateQueries("users");
      notification.success({
        message: "Cập nhật thông tin người dùng thành công!",
      });
    },
    onError: (error: Error) => {
      notification.error({
        message: "Cập nhật thông tin người dùng thất bại: " + error.message,
      });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => apiDeleteCustomer(userId),
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      notification.success({
        message: "Xóa người dùng thành công!",
      });
    },
    onError: (error: Error) => {
      notification.error({
        message: "Xóa người dùng thất bại: " + error.message,
      });
    },
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: CreateUserRequest) => apiCreateCustomer(req),
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      notification.success({
        message: "Tạo người dùng thành công!",
      });
    },
    onError: (error: Error) => {
      notification.error({
        message: "Tạo người dùng thất bại: " + error.message,
      });
    },
  });
};
