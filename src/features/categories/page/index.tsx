import { Button, Drawer, Modal, Table } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useCreateCategory, useDeleteCategory, useListCategories, useUpdateCategory } from '../../../query/categories';

import { Categories } from '../../../model/categories';
import CategoryForm from '../components/CategoryForm';
import { ColumnsType } from 'antd/es/table';
import { EventClick } from '../../../utils/type.ts';

interface categoryTableProps {
  handleEdit: (category: Categories) => void;
  handleDelete: (id: number) => void;
}

const newCategoryTable = (props: categoryTableProps): ColumnsType<Categories> => [
  {
    title: 'STT',
    key: 'id',
    render: (_text: string, _record: Categories, index: number) => index + 1,
  },
  {
    title: 'Tên danh mục',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Mô tả',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Giá',
    dataIndex: 'price',
    key: 'price',
    render: (text: number) => `$${text}`,
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'image_link',
    key: 'image_link',
    render: (image_link: string) => (
      <img src={image_link} alt="Category" style={{ width: '50px', height: '50px' }} />
    ),
  },
  {
    title: 'Hành động',
    key: 'actions',
    render: (_text, record: Categories) => (
      <div>
        <Button
          icon={<EditOutlined />}
          onClick={() => props.handleEdit(record)}
          style={{ marginRight: '8px', backgroundColor: '#663366', borderColor: '#663366', color: '#fff' }}
        />
        <Button
          icon={<DeleteOutlined />}
          onClick={() => props.handleDelete(record.ID)}
          danger
          style={{ backgroundColor: '#663366', borderColor: '#663366', color: '#fff' }}
        />
      </div>
    ),
  },
];

const CategoryPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Categories | undefined>(undefined);
  const [event, setEvent] = useState<EventClick>('EVT_NONE');

  const categories = useListCategories();

  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const handleEdit = (category: Categories) => {
    setEvent('EVT_UPDATE');
    setSelectedCategory(category);
    setDrawerOpen(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa danh mục',
      content: 'Bạn có chắc chắn muốn xóa danh mục này?',
      onOk: () => {
        deleteCategoryMutation.mutate(id);
      },
    });
  };

  const handleCreate = () => {
    setEvent('EVT_CREATE');
    setSelectedCategory(undefined);
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleFormSubmit = (values: Categories) => {
    if (event === 'EVT_UPDATE' && selectedCategory) {
      updateCategoryMutation.mutate({ id: selectedCategory.ID, category: values });
    } else {
      createCategoryMutation.mutate(values);
    }
    setDrawerOpen(false); // Đóng Drawer sau khi submit form
  };

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleCreate}
        style={{ marginBottom: '16px', backgroundColor: '#663366', borderColor: '#663366', color: '#fff' }}
      >
        Thêm danh mục
      </Button>

      {categories.isSuccess && categories.data && (
        <Table
          columns={newCategoryTable({
            handleEdit,
            handleDelete,
          })}
          dataSource={categories.data.categories}
          rowKey="id"
          loading={categories.isLoading}
        />
      )}

      <Drawer
        title={event === 'EVT_UPDATE' ? 'Cập nhật danh mục' : 'Tạo danh mục'}
        visible={drawerOpen}
        onClose={handleDrawerClose}
        width={720}
      >
        <CategoryForm category={selectedCategory} onSubmit={handleFormSubmit} />
      </Drawer>
    </div>
  );
};

export default CategoryPage;
