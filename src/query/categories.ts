import { Categories, ListCategoriesResponse } from "../model/categories";
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

const apiListCategories = async (): Promise<ListCategoriesResponse> => {
    return await instance.get(`${api}/api/v1/category`).then(resp => resp.data);
};

export const apiUpdateCategory = async (id: number, category: Categories): Promise<void> => {
    return instance.put(`${api}/api/v1/category/${id}`, category);
};
  
const apiDeleteCategory = (id: number): Promise<void> => {
    return instance.delete(`${api}/api/v1/category/${id}`);
};

export const apiCreateCategory = async (category: Categories): Promise<void> => {
    return instance.post(`${api}/api/v1/category`, category);
};

export const useListCategories = () => {
  return useQuery('categories', apiListCategories);
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, category }: { id: number; category: Categories }) => apiUpdateCategory(id, category),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
        notification.success({
          message: 'Cập nhật danh mục thành công',
        });
      },
      onError: () => {
        notification.error({
          message: 'Cập nhật danh mục thất bại',
        });
      },
    }
  );
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => apiDeleteCategory(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
      notification.success({
        message: 'Xóa danh mục thành công',
      });
    },
    onError: () => {
      notification.error({
        message: 'Xóa danh mục thất bại',
      });
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation((category: Categories) => apiCreateCategory(category), {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
      notification.success({
        message: 'Thêm danh mục thành công',
      });
    },
    onError: () => {
      notification.error({
        message: 'Thêm danh mục thất bại',
      });
    },
  });
};
