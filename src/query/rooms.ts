import { useMutation, useQuery, useQueryClient } from "react-query";

import { Rooms } from "../model/rooms";
import axios from "axios";
import { notification } from "antd";

const api = `https://3586-113-161-37-63.ngrok-free.app`;

const apiGetAllRooms = (): Promise<void> => {
  return axios.get(`${api}/api/v1/rooms`);
};

const apiDeleteRoom = (id: number): Promise<void> => {
  return axios.delete(`${api}/api/v1/rooms/${id}`);
};

const apiUpdateRoom = (id: number, data: Partial<Rooms>): Promise<void> => {
  return axios.put(`${api}/api/v1/rooms/${id}`, data);
};

const apiGetRoomById = (id: number): Promise<void> => {
  return axios.get(`${api}/api/v1/rooms/${id}`);
};

export const useGetAllRooms = () => {
  return useQuery({
    queryKey: ["Rooms"],
    queryFn: apiGetAllRooms,
    onError: () => {
      notification.error({
        message: "Hiển thị danh sách phòng thất bại",
        description: "Call api failed!",
      });
    },
  });
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  return useMutation(apiDeleteRoom, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Rooms"]);
      notification.success({
        message: "Xóa phòng thành công",
      });
    },
    onError: () => {
      notification.error({
        message: "Xóa phòng thất bại",
        description: "Call api failed!",
      });
    },
  });
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation(apiUpdateRoom, {
    onSuccess: () => {
      queryClient.invalidateQueries(["Rooms"]);
      notification.success({
        message: "Cập nhật phòng thành công",
      });
    },
    onError: () => {
      notification.error({
        message: "Cập nhật phòng thất bại",
        description: "Call api failed!",
      });
    },
  });
};

export const useGetRoomById = (id: number) => {
  return useQuery(["Room", id], () => apiGetRoomById(id), {
    onError: () => {
      notification.error({
        message: "Lấy thông tin phòng thất bại",
        description: "Call api failed!",
      });
    },
  });
};
