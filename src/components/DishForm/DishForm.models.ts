import { DishForm } from '@/schemas/product';
import { Dispatch, SetStateAction } from 'react';

export interface Props {
  className?: string;
  open: boolean;
  //
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (values: DishForm) => void;
}
