'use client';

import React, { useEffect, useMemo, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '@/redux/hook';
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

const OrdersManagement = (props: Props) => {
  const { className } = props;

  const dispatch = useAppDispatch();

  const allOrders = useAppSelector((state) => state.orderStore.allOrders);

  const [filteredOrders, setFilteredOrders] = useState<OrderInterface[]>([]);
  const [isShowViewOrder, setIsShowViewOrder] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<number>(0);

  const sortedAllOrders: OrderInterface[] = useMemo(() => {
    const copiedArr = JSON.parse(JSON.stringify(allOrders));
    return copiedArr.reverse();
  }, [allOrders]);

  const selectedOrder = useMemo(() => {
    const selectedOrder = allOrders.find((order) => order.id === orderId);
    if (selectedOrder) return selectedOrder;
  }, [orderId, allOrders]);

  // set filtered orders when all orders updated
  useEffect(() => {
    setFilteredOrders(allOrders);
  }, [allOrders]);

  useEffect(() => {
    getBills(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={className}>
      <p className='text-gray-700 text-3xl font-medium uppercase border-b-[0.5px] border-gray-400'>
        LỊCH SỬ GIAO DỊCH
      </p>

      {sortedAllOrders.length > 0 ? (
        <>
          <OrderFilter
            allOrders={allOrders}
            orders={filteredOrders}
            setOrders={setFilteredOrders}
            className='mt-4'
          />

          <Table className='mt-10'>
            <TableHeader>
              <TableRow className='whitespace-nowrap'>
                <TableHead className=''>Id</TableHead>
                <TableHead>Email NV</TableHead>
                <TableHead>Tên KH</TableHead>
                {/* <TableHead className='w-20'>Ảnh</TableHead> */}
                <TableHead className=''>SĐT KH</TableHead>
                <TableHead className=''>Email KH</TableHead>
                <TableHead className=''>Chi tiết đơn hàng</TableHead>
                <TableHead className=''>Hình thức thanh toán</TableHead>
                <TableHead className=''>Thành tiền</TableHead>
                <TableHead className=''>Thao tác</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className=''>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => {
                  const {
                    id,
                    uuid,
                    contactNumber,
                    createdBy,
                    email,
                    name,
                    paymentMethod,
                    total,
                  } = order;

                  return (
                    <TableRow key={uuid}>
                      <TableCell className='font-medium'>{id}</TableCell>
                      <TableCell>{createdBy}</TableCell>
                      <TableCell>{name}</TableCell>

                      {/* <TableCell className='w-20'>
                        <div className='relative w-14 h-14'>
                          <Image src={dish.thumbnail} alt='thumbnail' fill />
                        </div>
                      </TableCell> */}

                      <TableCell className=''>{contactNumber}</TableCell>

                      <TableCell className=''>{email}</TableCell>

                      <TableCell className=''>
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

                      <TableCell className=''>
                        <Badge
                          className='w-full'
                          variant={
                            paymentMethod === 'CASH' ? 'destructive' : 'default'
                          }
                        >
                          {paymentMethod === 'CASH'
                            ? 'Tiền mặt'
                            : 'Chuyển khoản'}
                        </Badge>
                      </TableCell>

                      <TableCell className='font-medium'>
                        {getValueString(total.toString())}
                      </TableCell>
                      <TableCell>
                        <AlertDialogCustom
                          buttonTitle='xóa'
                          onSubmit={() => deleteABill(id, dispatch)}
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
        </>
      ) : (
        <p>Lịch sử giao dịch trống!</p>
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
                    {/* <TableHead className='w-20'>Ảnh</TableHead> */}
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

                        {/* <TableCell className='w-20'>
                        <div className='relative w-14 h-14'>
                          <Image src={dish.thumbnail} alt='thumbnail' fill />
                        </div>
                      </TableCell> */}

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
