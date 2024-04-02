import { DishFormType } from '@/schemas/product';
import { DishType } from '@/types/dish';
import { Dispatch, SetStateAction } from 'react';

export interface Props {
  className?: string;
  open: boolean;
  title: string;
  selectedDish?: DishType;
  submitTitle?: string
  //
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (values: DishFormType) => void;
}
