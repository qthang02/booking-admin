import {CreateUserRequest, ListUsersResponse, UpdateUserRequest, User} from "../model/user";
import { useMutation, useQuery, useQueryClient } from "react-query";

import axios from "axios";
import { notification } from "antd";

const api = `http://api.thangnq.studio:8080`;


const apiListCustomers = async (): Promise<ListUsersResponse> => {
  return await axios.get(`${api}/api/v1/user`).then(resp => resp.data)
};

const apiGetCustomer = async (userId: number): Promise<User> => {
  return await axios.get(`${api}/api/v1/user/${userId}`).then(response => response.data);
};

export const apiUpdateCustomers = (req: UpdateUserRequest): Promise<void> => {
  return axios.put(`${api}/api/v1/user/${req.id}`, req)
};

const apiDeleteCustomer = (userId: number): Promise<void> => {
  return axios.delete(`${api}/api/v1/user/${userId}`)
};

const apiCreateCustomer = (req: CreateUserRequest): Promise<void> => {
  return axios.post(`${api}/api/v1/user`, req)
};


export const useListCustomers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: apiListCustomers,
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
}

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
      queryClient.invalidateQueries("users")
      notification.success({
        message: "Xóa người dùng thành công!",
      });
    },
    onError: (error: Error) => {
      notification.error({
        message: "Xóa người dùng thất bại!" + error.message,
      });
    }
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
        message: "Tạo người dùng thất bại!" + error.message,
      });
    },
  });
};

