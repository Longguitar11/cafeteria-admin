'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Props } from './OrdersManagement.models';
import { Button } from '@/components/ui/button';
import { getValueString } from '@/utils/currency';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { OrderInterface, OrderedDishInterface } from '@/types/order';
import { deleteABill, getBills } from '@/apis/order';
import { AlertDialogCustom } from '@/components/AlertDialogCustom';
import { Badge } from '@/components/ui/badge';
import { OrderFilter } from '@/components/Filter';
import { paymentMethods } from '@/constants/paymentMethods';

const OrdersManagement = (props: Props) => {
  const { className } = props;

  const [allOrders, setAllOrders] = useState<OrderInterface[]>([]);
  const [isGettingOrders, setIsGettingOrders] = useState<boolean>(false);
  const [filteredOrders, setFilteredOrders] =
    useState<OrderInterface[]>(allOrders);
  const [isShowViewOrder, setIsShowViewOrder] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<number>(0);

  // useMemo
  const selectedOrder = useMemo(() => {
    const selectedOrder = allOrders.find((order) => order.id === orderId);
    if (selectedOrder) return selectedOrder;
  }, [orderId, allOrders]);

  // useCallback
  const fetchOrders = useCallback(() => {
    const res = getBills();

    setIsGettingOrders(true);
    res
      .then((res) => {
        setIsGettingOrders(false);
        setAllOrders(res);
      })
      .catch((error) => console.log(error));
  }, []);

  // set filtered orders when all orders updated
  useEffect(() => {
    setFilteredOrders(allOrders);
  }, [allOrders]);

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={className}>
      <p className='text-gray-700 text-3xl font-medium uppercase border-b-[0.5px] border-gray-400'>
        LỊCH SỬ GIAO DỊCH
      </p>

      {!isGettingOrders ? (
        allOrders.length > 0 ? (
          <div className='relative'>
            <OrderFilter
              allOrders={allOrders}
              orders={filteredOrders}
              setOrders={setFilteredOrders}
              className='mt-4'
            />

            <Table className='mt-10'>
              <TableHeader>
                <TableRow className='whitespace-nowrap'>
                  <TableHead>Id</TableHead>
                  <TableHead>Email NV</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>Tên KH</TableHead>
                  <TableHead>SĐT KH</TableHead>
                  <TableHead>Email KH</TableHead>
                  <TableHead>Chi tiết đơn hàng</TableHead>
                  <TableHead>Hình thức thanh toán</TableHead>
                  <TableHead>Thành tiền</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => {
                    const {
                      id,
                      uuid,
                      contactNumber,
                      createdBy,
                      createdAt,
                      email,
                      name,
                      paymentMethod,
                      total,
                    } = order;

                    const currentPaymentMethod = paymentMethods.find(
                      (pm) => pm.value === paymentMethod
                    )?.label;

                    return (
                      <TableRow key={uuid}>
                        <TableCell className='font-medium'>{id}</TableCell>
                        <TableCell>{createdBy}</TableCell>
                        <TableCell>{createdAt}</TableCell>
                        <TableCell>{name}</TableCell>
                        <TableCell>{contactNumber}</TableCell>
                        <TableCell>{email}</TableCell>
                        <TableCell>
                          <Button
                            variant='primary'
                            onClick={() => {
                              setIsShowViewOrder(true);
                              setOrderId(id);
                            }}
                          >
                            Xem chi tiết
                          </Button>
                        </TableCell>

                        <TableCell>
                          <Badge className='w-full'>
                            {currentPaymentMethod}
                          </Badge>
                        </TableCell>

                        <TableCell className='font-medium'>
                          {getValueString(total.toString())}
                        </TableCell>
                        <TableCell>
                          <AlertDialogCustom
                            buttonTitle='xóa'
                            onSubmit={async () => {
                              await deleteABill(id);
                              fetchOrders();
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={9}
                      className='text-red-500 text-xl text-center'
                    >
                      Không tìm ra đơn hàng!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-medium text-red-500'>
            Lịch sử giao dịch trống!
          </p>
        )
      ) : (
        <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-medium text-sky-500'>
          Đang tải...
        </p>
      )}

      <Dialog open={isShowViewOrder} onOpenChange={setIsShowViewOrder}>
        <DialogContent className='sm:min-w-[600px] sm:max-w-[800px]'>
          <DialogHeader>
            <DialogTitle className='text-3xl text-center text-green-600'>
              ĐƠN HÀNG - {selectedOrder?.uuid}
            </DialogTitle>
          </DialogHeader>

          {selectedOrder?.productDetail &&
          selectedOrder.productDetail.length > 0 ? (
            <>
              <Table>
                <TableHeader className='w-full table table-fixed'>
                  <TableRow>
                    <TableHead className='w-12'>STT</TableHead>
                    <TableHead className='w-24'>Tên</TableHead>
                    <TableHead className='w-24'>Số lượng</TableHead>
                    <TableHead className='w-24'>Giá</TableHead>
                    <TableHead className='w-24'>Tổng giá</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className='max-h-[314px] overflow-y-auto hidden-scrollbar block'>
                  {JSON.parse(selectedOrder.productDetail).map(
                    (dish: OrderedDishInterface, index: number) => (
                      <TableRow
                        className='w-full table table-fixed'
                        key={dish.id}
                      >
                        <TableCell className='font-medium w-12'>
                          {index + 1}
                        </TableCell>

                        <TableCell className='w-24'>{dish.name}</TableCell>

                        <TableCell className='w-24'>{dish.quantity}</TableCell>

                        <TableCell className='w-24'>
                          {getValueString(dish.price.toString())}
                        </TableCell>

                        <TableCell className='w-24'>
                          {getValueString(dish.total.toString())}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow className='w-full table table-fixed'>
                    <TableCell colSpan={7} className='text-end text-lg'>
                      Thành tiền:{' '}
                      <span className='text-red-500 font-medium'>
                        {getValueString(selectedOrder?.total.toString())}
                      </span>
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </>
          ) : (
            <p className='mt-10 text-2xl text-red-600'>
              Đơn hàng này không có món nào!
            </p>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default OrdersManagement;
