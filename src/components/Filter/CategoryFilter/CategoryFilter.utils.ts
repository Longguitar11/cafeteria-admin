import { CategoryType } from '@/types/category';
import { escapeText } from '@/utils/text';
import { filter, isEqual } from 'lodash';

export const filterOptions = (
  allCategories: CategoryType[],
  options: { text?: string }
): CategoryType[] => {
  const { text = '' } = options;

  if (text === '') return allCategories;
  else {
    const textLowercase = escapeText(text).toLowerCase();

    return (
      filter(allCategories, (cate) => {
        const { id, name } = cate;
        const parsedName = escapeText(name).toLowerCase();

        return (
          isEqual(parsedName, text) ||
          parsedName.includes(textLowercase) ||
          isEqual(name, text) ||
          //
          isEqual(id, parseInt(text))
        );
      }) || []
    );
  }
};
