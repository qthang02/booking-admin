import { CreateUserRequest, ListUsersResponse, UpdateUserRequest, User } from "../model/user";
import { useMutation, useQuery, useQueryClient } from "react-query";

import axios from "axios";
import { notification } from "antd";

const api = `http://api.thangnq.studio:8080`;
const token = localStorage.getItem("token");

const instance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`
  }
})

const apiListEmployees = async (): Promise<ListUsersResponse> => {
  return await instance.get(`${api}/api/v1/employee`).then(resp => resp.data);
}
const apiGetEmployee = async (userId: number): Promise<User> => {
  return await instance.get(`${api}/api/v1/employee/${userId}`).then(response => response.data);
};

const apiUpdateEmployees = (req: UpdateUserRequest): Promise<void> => {
  return instance.put(`${api}/api/v1/employee/${req.id}`, req.user);
};

const apiDeleteEmployee = (userId: number): Promise<void> => {
  return instance.delete(`${api}/api/v1/employee/${userId}`);
};

const apiCreateEmployee = (req: CreateUserRequest): Promise<void> => {
  return instance.post(`${api}/api/v1/employee`, req.user);
};

export const useListEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: () => apiListEmployees(),
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
      client.invalidateQueries("employees");
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
