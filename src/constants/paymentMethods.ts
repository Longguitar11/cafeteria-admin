import { PaymentMethod } from '@/types/paymentMethod';

export const paymentMethods: { value: PaymentMethod; label: string }[] = [
  {
    value: 'CASH',
    label: 'Tiền mặt',
  },
  {
    value: 'TRANSFER',
    label: 'Chuyển khoản',
  },
];
