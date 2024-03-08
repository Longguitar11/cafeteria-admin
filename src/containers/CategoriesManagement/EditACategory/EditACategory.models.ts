import { CategoryForm } from '@/schemas/category';
import { CategoryType } from '@/types/category';
import { Dispatch, SetStateAction } from 'react';

export interface Props {
  className?: string;
  open: boolean;
  idCate: number;
  categories: CategoryType[]
  //
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (value: CategoryForm) => void;
}
