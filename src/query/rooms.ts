import { useMutation, useQuery, useQueryClient } from 'react-query';

import { Rooms } from '../model/rooms';
import axios from 'axios';
import { notification } from 'antd';

const api = `http://api.thangnq.studio:8080`;

const apiListRooms = async () => {
  const response = await axios.get(`${api}/api/v1/room`);
  return response.data;
};

const apiCreateRoom = async (room: Rooms) => {
  await axios.post(`${api}/api/v1/room`, room);
};

const apiUpdateRoom = async ({ id, room }: { id: number; room: Rooms }) => {
  await axios.put(`${api}/api/v1/room/${id}`, room);
};

const apiDeleteRoom = async (id: number) => {
  await axios.delete(`${api}/api/v1/room/${id}`);
};

export const useListRooms = () => useQuery('rooms', apiListRooms);

export const useCreateRoom = () => {
  const queryClient = useQueryClient();
  return useMutation(apiCreateRoom, {
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
