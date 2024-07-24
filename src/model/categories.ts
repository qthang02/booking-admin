export interface Categories {
  id: number;
  name: string;
  description: string;
  image_link: string;
  price: number;
  available_rooms: number;
  type: string;
  updated_at: string;
  created_at: string;
  deleted_at: string | null;
}
export interface CreateCategoryRequest {
  category: Categories;
}

export interface ListCategoriesResponse {
  categories: Categories[]; // Danh sách danh mục
  paging: {
    page: number;
    limit: number;
    total: number;
  }; // Thông tin phân trang
}

export interface UpdatecategoryRequest {
  id: number;
  category: Categories;
}