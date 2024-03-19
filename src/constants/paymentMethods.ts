import { PaymentMethod } from '@/types/paymentMethod';

export const paymentMethods: { value: PaymentMethod; label: string }[] = [
  {
    value: 'ALL',
    label: 'Tất cả',
  },
  {
    value: 'CASH',
    label: 'Tiền mặt',
  },
  {
    value: 'TRANSFER',
    label: 'Chuyển khoản',
  },
  {
    value: 'CREDITCARD',
    label: 'Thẻ tín dụng',
  },
];
