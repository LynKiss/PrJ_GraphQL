export interface IdArgs {
  id: string;
}

export interface SortArgs {
  filterKey?: string;
  filterValue?: string;
  sortKey?: string;
  sortValue?: string;
  page?: number;
  limit?: number;
  keyword?: string;
}

export interface ArticleInput {
  title?: string;
  avatar?: string;
  description?: string;
  categoryId?: string;
}

export interface CreateArticleArgs {
  article: ArticleInput;
}

export interface UpdateArticleArgs {
  id: string;
  article: ArticleInput;
}

export interface CategoryInput {
  title?: string;
  avatar?: string;
}

export interface CreateCategoryArgs {
  category: CategoryInput;
}

export interface UpdateCategoryArgs {
  id: string;
  category: CategoryInput;
}

export interface ArticleParent {
  categoryId?: string;
}
