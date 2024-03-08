import { CategoryForm } from '@/schemas/category';
import {
  Dispatch,
  SetStateAction,
} from 'react';

export interface Props {
  className?: string;
  open: boolean;
  //
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: (value: CategoryForm) => void;
}
