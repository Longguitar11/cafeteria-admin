import { OrderInterface } from '@/types/order';

export interface Props {
  className?: string;
  orders: OrderInterface[];
  allOrders: OrderInterface[];
  //
  setOrders: (orders: OrderInterface[]) => void;
}

export type DayType = '1' | '7' | '30';

export interface DayFilterType {
  value: DayType;
  text: string;
}
