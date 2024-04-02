import { CategoryType } from '@/types/category';
import { UseFormReturn } from 'react-hook-form';

export interface Props {
  className?: string;
  form: UseFormReturn<
    {
      name: string;
      price: number;
      categoryId: number;
      description: string;
    },
    any,
    undefined
  >;
}
