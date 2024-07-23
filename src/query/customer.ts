import { CreateUserRequest, users } from "../model/user";
import { useMutation, useQuery, useQueryClient } from "react-query";

import axios from "axios";
import { notification } from "antd";

const api = `http://api.thangnq.studio:8080`;


// API call to get all users
const apiGetallUser = (): Promise<users[]> => {
  return axios.get(`${api}/api/v1/user`).then(response => response.data)
};

// Custom hook for getting all users
export const useGetallUser = () => {
  return useQuery<users[], Error>({
    queryKey: ["user"],
    queryFn: apiGetallUser,
    onError: (error: Error) => {
      notification.error({
        message: "Hiển thị thông tin người dùng thất bại",
        description: `Call api failed: ${error.message}`,
      });
    },
  });
};

// API call to get one user by ID
const apiGetOneUserById = (userId: number): Promise<users> => {
  return axios.get(`${api}/api/v1/user/${userId.toString()}`).then(response => response.data);
}

// Custom hook for getting one user by ID using mutation
export const useGetOneUserById = () => {
  return useMutation({
    mutationFn: (userId: number) => apiGetOneUserById(userId),
    onSuccess: () => {
      notification.success({
        message: "Lấy thông tin người dùng thành công!",
        description: "Call API success!",
      });
    },
    onError: (error: Error) => {
      notification.error({
        message: "Lấy thông tin người dùng thất bại!",
        description: `Call API failed: ${error.message}`,
      });
    },
  }); 
}

// API call to update user by ID
export const apiUpdateUserById = (userId: number, userData: Partial<users>): Promise<void> => {
  return axios.put(`${api}/api/v1/user/${userId}`, userData)
    .then(() => {
      notification.success({
        message: "Cập nhật thông tin người dùng thành công!",
        description: "Call API success!",
      });
    })
    .catch(error => {
      notification.error({
        message: "Cập nhật thông tin người dùng thất bại!",
        description: `Call API failed: ${error.message}`,
      });
    });
};

// Custom hook for updating user by ID
export const useUpdateUserById = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, userData }: { userId: number, userData: Partial<users> }) =>
      apiUpdateUserById(userId, userData),
    onSuccess: () => {
      client.invalidateQueries("user");
      notification.success({
        message: "Cập nhật thông tin người dùng thành công!",
      });
    },
    onError: (error: Error) => {
      notification.error({
        message: "Cập nhật thông tin người dùng thất bại!",
        description: error.message,
      });
    },
  });
};
 const apiDeleteUserById = (userId: number): Promise<void> => {
  return axios.delete(`${api}/api/v1/user/${userId}`)
    .then(() => {
      notification.success({
        message: "Xóa người dùng thành công!",
        description: "Call API success!",
      });
    })
    .catch(error => {
      notification.error({
        message: "Xóa người dùng thất bại!",
        description: `Call API failed: ${error.message}`,
      });
    });
};
export const useDeleteUserById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => apiDeleteUserById(userId),
    onSuccess: () => {
      // Invalidate queries to refresh data after deletion
      queryClient.invalidateQueries("user");
    },
  });
};
const apiCreateNewUser = (userData: CreateUserRequest): Promise<void> => {
  return axios.post(`${api}/api/v1/user`, userData)
    .then(() => {
      notification.success({
        message: "Tạo người dùng thành công!",
        description: "Call API success!",
      });
    })
    .catch(error => {
      console.error("API Error:", error.response?.data || error.message); // Hiển thị chi tiết lỗi từ server
      notification.error({
        message: "Tạo người dùng thất bại!",
        description: `Call API failed: ${error.message}`,
      });
    });
};


export const useCreateNewUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userData: CreateUserRequest) => apiCreateNewUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries("user");
      notification.success({
        message: "Tạo người dùng thành công!",
        description: "Call API success!",
      });
    },
    onError: (error: Error) => {
      notification.error({
        message: "Tạo người dùng thất bại!",
        description: `Call API failed: ${error.message}`,
      });
    },
  });
};

