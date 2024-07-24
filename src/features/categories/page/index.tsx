import { Button, Drawer, Modal, Table, notification } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useCreateCategory, useDeleteCategory, useListCategories, useUpdateCategory } from '../../../query/categories';

import { Categories } from '../../../model/categories';
import CategoryForm from '../components/CategoryForm';

const CategoryPage: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Categories | undefined>(undefined);
  const [event, setEvent] = useState<'EVT_CREATE' | 'EVT_UPDATE'>('EVT_UPDATE');

  // Fetch categories
  const { data: categoriesData = [], isLoading, refetch } = useListCategories();

  // Mutations
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  // Handle category edit
  const handleEdit = (category: Categories) => {
    setEvent('EVT_UPDATE');
    setSelectedCategory(category);
    setDrawerOpen(true);
  };

  // Handle category delete
  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Xác nhận xóa danh mục',
      content: 'Bạn có chắc chắn muốn xóa danh mục này?',
      onOk: () => {
        deleteCategoryMutation.mutate(id, {
          onSuccess: () => {
            notification.success({ message: 'Xóa danh mục thành công!' });
            refetch(); // Refetch categories after deletion
          },
          onError: (error: unknown) => {
            notification.error({ message: 'Xóa danh mục thất bại!' });
          }
        });
      },
    });
  };

  // Handle category creation
  const handleCreate = () => {
    setEvent('EVT_CREATE');
    setSelectedCategory(undefined);
    setDrawerOpen(true);
  };

  // Handle drawer close
  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  // Handle form submit
  const handleFormSubmit = (values: Categories) => {
    console.log('Submitting form with values:', values); // Log dữ liệu submit
    if (event === 'EVT_UPDATE' && selectedCategory) {
      updateCategoryMutation.mutate(
        { id: selectedCategory.id, category: values },
        {
          onSuccess: () => {
            notification.success({ message: 'Cập nhật danh mục thành công!' });
            setDrawerOpen(false);
            refetch(); // Refetch categories after update
          },
          onError: (error: unknown) => {
            console.error('Error updating category:', error);
            notification.error({ message: 'Cập nhật danh mục thất bại!' });
          },
        }
      );
    } else {
      createCategoryMutation.mutate(values, {
        onSuccess: () => {
          notification.success({ message: 'Tạo danh mục thành công!' });
          setDrawerOpen(false);
          refetch(); // Refetch categories after creation
        },
        onError: (error: unknown) => {
          console.error('Error creating category:', error);
          notification.error({ message: 'Tạo danh mục thất bại!' });
        },
      });
    }
  };

  // Table columns
  const columns = [
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
      render: (_text: string, record: Categories) => (
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            style={{ marginRight: '8px' }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            danger
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleCreate}
        style={{ marginBottom: '16px' }}
      >
        Thêm danh mục
      </Button>
      <Table
        columns={columns}
        dataSource={categoriesData}
        rowKey="id"
        loading={isLoading}
      />
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
