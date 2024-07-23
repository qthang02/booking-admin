import { useMutation, useQuery, useQueryClient } from "react-query";

import axios from "axios";
import { notification } from "antd";
import { users } from "../model/user";

const api = `http://api.thangnq.studio:8080`;

// API call to get all users
const apiGetallEmployee = (): Promise<users[]> => {
  return axios.get(`${api}/api/v1/user`).then(response => response.data);
};

// Custom hook for getting all users
export const useGetallEmployee = () => {
  return useQuery<users[], Error>({
    queryKey: ["user"],
    queryFn: apiGetallEmployee,
    onError: (error: Error) => {
      notification.error({
        message: "Hiển thị thông tin người dùng thất bại",
        description: `Call api failed: ${error.message}`,
      });
    },
  });
};

// API call to get one user by ID
const apiGetOneEmployeeById = (userId: number): Promise<users> => {
  return axios.get(`${api}/api/v1/user/${userId.toString()}`).then(response => response.data);
}

// Custom hook for getting one user by ID using mutation
export const useGetOneEmployeeById = () => {
  return useMutation({
    mutationFn: (userId: number) => apiGetOneEmployeeById(userId),
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
export const apiUpdateEmployeeById = (userId: number, userData: Partial<users>): Promise<void> => {
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
export const useUpdateEmployeeById = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, userData }: { userId: number, userData: Partial<users> }) =>
      apiUpdateEmployeeById(userId, userData),
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
 const apiDeleteEmployeeById = (userId: number): Promise<void> => {
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
export const useDeleteEmployeeById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => apiDeleteEmployeeById(userId),
    onSuccess: () => {
      // Invalidate queries to refresh data after deletion
      queryClient.invalidateQueries("user");
    },
  });
};

const apiCreateNewUser = (req: users): Promise<void> => {
    return axios.post(`${api}/api/v1/auth/register`, req);
}

export const useCreateNewUser = () => {
    return useMutation({
        mutationFn: (req: users) => apiCreateNewUser(req),
        onSuccess: () => {
            notification.success({
                message: "Tạo user thành công!",
                description: "Call api success!",
              });
        },
        onError: () => {
            notification.error({
              message: "Tạo user thất bại!",
              description: "Call api failed!",
            });
          },
    })
}


