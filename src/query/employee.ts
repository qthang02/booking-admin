import { CreateUserRequest, ListUsersResponse, UpdateUserRequest, User } from "../model/user";
import { useMutation, useQuery, useQueryClient } from "react-query";

import axios from "axios";
import { notification } from "antd";

const api = `http://api.thangnq.studio:8080`;

const apiListEmployees = async (page: number, limit: number): Promise<ListUsersResponse> => {
  return await axios.get(`${api}/api/v1/user`, {
    params: { page, limit }
  }).then(resp => resp.data);
};
const apiGetEmployee = async (userId: number): Promise<User> => {
  return await axios.get(`${api}/api/v1/user/${userId}`).then(response => response.data);
};

const apiUpdateEmployees = (req: UpdateUserRequest): Promise<void> => {
  return axios.put(`${api}/api/v1/user/${req.id}`, req.user);
};

const apiDeleteEmployee = (userId: number): Promise<void> => {
  return axios.delete(`${api}/api/v1/user/${userId}`);
};

const apiCreateEmployee = (req: CreateUserRequest): Promise<void> => {
  return axios.post(`${api}/api/v1/user`, req.user);
};

export const useListEmployees = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => apiListEmployees(page, limit ),
    onError: (error: Error) => {
      notification.error({
        message: "Hiển thị thông tin người dùng thất bại: " + error.message,
      });
    },


  });
};

export const useGetEmployee = () => {
  return useMutation({
    mutationFn: (userId: number) => apiGetEmployee(userId),
    onError: (error: Error) => {
      notification.error({
        message: "Lấy thông tin người dùng thất bại: " + error.message,
      });
    },
  });
};

export const useUpdateEmployee = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (req: UpdateUserRequest) => apiUpdateEmployees(req),
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

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => apiDeleteEmployee(userId),
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

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (req: CreateUserRequest) => apiCreateEmployee(req),
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
