export interface Categories {
  ID: number;
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
  categories: Categories[];
}

export interface UpdateCategoryRequest {
  id: number;
  category: Categories;
}