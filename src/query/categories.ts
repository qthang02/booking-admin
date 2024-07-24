import { useMutation, useQuery, useQueryClient } from "react-query";

import {Categories, ListCategoriesResponse} from "../model/categories";
import axios from "axios";

const api = `http://api.thangnq.studio:8080`;

const apiListCategories = async (): Promise<ListCategoriesResponse> => {
    return await axios.get(`${api}/api/v1/category`).then(resp => resp.data);
};

export const apiUpdateCategory = async (id: number, category: Categories): Promise<void> => {
    return axios.put(`${api}/api/v1/category/${id}`, category);
};
  
const apiDeleteCategory = (id: number): Promise<void> => {
    return axios.delete(`${api}/api/v1/category/${id}`)
};

export const apiCreateCategory = async (category: Categories): Promise<void> => {
    return axios.post(`${api}/api/v1/category`, category);
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
      },
    }
  );
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => apiDeleteCategory(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation((category: Categories) => apiCreateCategory(category), {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
    },
  });
};
