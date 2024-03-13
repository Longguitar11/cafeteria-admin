import { CategoryType } from '@/types/category';
import { DishType } from '@/types/dish';
import { UserType } from '@/types/user';
import { escapeText } from '@/utils/text';
import { filter, isEqual } from 'lodash';

export const filterOptions = (
  allStaff: UserType[],
  options: { text?: string }
): UserType[] => {
  const { text = '' } = options;

  if (text === '') return allStaff;
  else {
    const textLowercase = escapeText(text).toLowerCase();

    return (
      filter(allStaff, (staff) => {
        const { name, contactNumber, email } = staff;
        const parsedName = escapeText(name).toLowerCase();

        return (
          isEqual(parsedName, text) ||
          parsedName.includes(textLowercase) ||
          isEqual(name, text) ||
          isEqual(contactNumber, text) ||
          contactNumber.includes(text) ||
          isEqual(contactNumber, text) ||
          isEqual(email, text) ||
          email.includes(text) ||
          isEqual(email, text)
        );
      }) || []
    );
  }
};
