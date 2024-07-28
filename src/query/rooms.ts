import {CreateRoomsRequest, Rooms} from '../model/rooms';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import axios from 'axios';
import { notification } from 'antd';
import {API} from "../utils/config.tsx";

const token = localStorage.getItem("token");

const instance = axios.create({
  headers: {
    Authorization: `Bearer ${token}`
  }
})


const apiListRooms = async () => {
  const response = await instance.get(`${API}/api/v1/room`);
  return response.data;
};

const apiCreateRoom = (req: CreateRoomsRequest) => {
  return instance.post(`${API}/api/v1/room`, req);
};

const apiUpdateRoom = async ({ id, room }: { id: number; room: Rooms }) => {
  return await instance.put(`${API}/api/v1/room/${id}`, room);
};

const apiDeleteRoom = async (id: number) => {
  return await instance.delete(`${API}/api/v1/room/${id}`);
};

export const useListRooms = () => useQuery('rooms', apiListRooms);

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation( {
    mutationFn: (req: CreateRoomsRequest) => apiCreateRoom(req),
    onSuccess: () => {
      queryClient.invalidateQueries('rooms');
      notification.success({ message: 'Thêm phòng thành công' });
    },
    onError: () => {
      notification.error({ message: 'Thêm phòng thất bại' });
    },
  });
};

export const useUpdateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation(apiUpdateRoom, {
    onSuccess: () => {
      queryClient.invalidateQueries('rooms');
      notification.success({ message: 'Cập nhật phòng thành công' });
    },
    onError: () => {
      notification.error({ message: 'Cập nhật phòng thất bại' });
    },
  });
};

export const useDeleteRoom = () => {
  const queryClient = useQueryClient();
  return useMutation(apiDeleteRoom, {
    onSuccess: () => {
      queryClient.invalidateQueries('rooms');
      notification.success({ message: 'Xóa phòng thành công' });
    },
    onError: () => {
      notification.error({ message: 'Xóa phòng thất bại' });
    },
  });
};
