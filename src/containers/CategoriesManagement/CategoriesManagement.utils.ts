import { CategoryType } from '@/types/category';
import { escapeText } from '@/utils/text';

export const storeCategories = (categories: CategoryType[]) => {
  categories = categories.map((cate) => ({
    ...cate,
    value: escapeText(cate.name).toLowerCase(),
  }));

  
  localStorage.setItem('categories', JSON.stringify(categories));
};
