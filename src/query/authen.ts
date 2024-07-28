import { LoginRequest, LoginResponse } from "../model/authen";
import { useMutation, useQuery } from "react-query";

import { User } from "../model/user";
import axios from "axios";
import { notification } from "antd";

const api = `http://api.thangnq.studio:8080`;

const token = localStorage.getItem("token");

const instance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const apiLogin = (req: LoginRequest): Promise<LoginResponse> => {
  return instance.post(`${api}/api/v1/auth/login`, req).then((resp) => resp.data);
};
const apiProfile = (): Promise<User> => {
  return instance.get(`${api}/api/v1/auth/profile`).then(resp => resp.data);
};
export const useGetProfile = () => {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: () => apiProfile(),
    onError: (error: Error) => {
      notification.error({
        message: "Hiển thị thông tin người dùng thất bại: " + error.message,
      });
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (req: LoginRequest) => apiLogin(req),
    onSuccess: (resp: LoginResponse) => {
      notification.success({
        message: "Đăng nhập thành công!",
      });

      if (resp.token) {
        localStorage.setItem("token", resp.token);
      }
    },
    onError: () => {
      notification.error({
        message: "Đăng nhập thất bại!",
      });
    },
  });
};
