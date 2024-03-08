import { DishForm } from '@/schemas/product';
import { DishType } from '@/types/dish';
import { Dispatch, SetStateAction } from 'react';

export interface Props {
  className?: string;
  dishId: number;
  open: boolean;
  dishes: DishType[]
  //
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (values: DishForm) => void;
}
