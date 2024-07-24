import { useMutation, useQuery, useQueryClient } from "react-query";

import { Categories } from "../model/categories";
import axios from "axios";

const api = `http://api.thangnq.studio:8080/api/v1/category`;

// Lấy danh sách danh mục
const apiListCategories = async (): Promise<Categories[]> => {
    const response = await axios.get(api);
    return response.data.categories; // Trích xuất danh sách từ phản hồi
};

// Cập nhật danh mục
export const apiUpdateCategory = async (id: number, category: Categories): Promise<void> => {
    try {
      await axios.put(`${api}/${id}`, category);
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };
  
// Xóa danh mục
const apiDeleteCategory = (id: number): Promise<void> => {
    if (isNaN(id)) {
      return Promise.reject(new Error("Invalid ID"));
    }
    return axios.delete(`${api}/${id}`).then(() => {});
  };

// Tạo danh mục
export const apiCreateCategory = async (category: Categories): Promise<void> => {
    try {
      await axios.post(`${api}`, category);
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  };

// Hook để lấy danh sách danh mục
export const useListCategories = () => {
  return useQuery('categories', apiListCategories);
};

// Hook để cập nhật danh mục
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, category }: { id: number; category: Categories }) => apiUpdateCategory(id, category),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('categories');
      },
    }
  );
};

// Hook để xóa danh mục
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => apiDeleteCategory(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    },
  });
};

// Hook để tạo danh mục
export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation((category: Categories) => apiCreateCategory(category), {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    },
  });
};
