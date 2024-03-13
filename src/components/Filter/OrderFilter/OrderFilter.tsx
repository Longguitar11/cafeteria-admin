import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Input } from '../../ui/input';
import { cn } from '@/lib/utils';
import { Props } from './OrderFilter.models';
import { filterOptions } from './OrderFilter.utils';
import { PaymentMethod } from '@/types/paymentMethod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { paymentMethods } from '@/constants/paymentMethods';

const OrderFilter = (props: Props) => {
  const { className = '', allOrders, setOrders, orders } = props;

  const [searchValue, setSearchValue] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | undefined>(
    undefined
  );
  const timerUpdateSearchText = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerUpdateSearchText.current !== null)
      clearTimeout(timerUpdateSearchText.current);

    timerUpdateSearchText.current = setTimeout(() => {
      const result = filterOptions(allOrders, {
        text: searchValue,
        paymentMethod,
      });

      if (result.toString() !== orders.toString()) {
        setOrders(result);
      }
    }, 800);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, paymentMethod]);

  return (
    <div className={cn('flex gap-3', className)}>
      <Input
        type='text'
        placeholder='Tìm đơn hàng (id, tên, email, sđt, email NV)'
        className='text-base'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />

      <Select onValueChange={(value: PaymentMethod) => setPaymentMethod(value)}>
        <SelectTrigger className='w-[300px]'>
          <SelectValue placeholder='Phương thức thanh toán' />
        </SelectTrigger>
        <SelectContent>
          {paymentMethods.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default OrderFilter;
