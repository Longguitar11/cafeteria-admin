'use client';

import React, { useEffect, useState } from 'react';
import { Props } from './DishesManagement.models';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getValueString } from '@/utils/currency';
import { CreateADish } from './CreateADish';
import { AlertDialogCustom } from '@/components/AlertDialogCustom';
import { EditADish } from './EditADish';
import { DishForm } from '@/schemas/product';
// import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  addADish,
  deleteADish,
  editADish,
  getAllDishes,
  updateDishStatus,
} from '@/apis/dish';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DishType } from '@/types/dish';
import { escapeText } from '@/utils/text';
import { toast } from 'react-toastify';
import { DishFilter } from '@/components/Filter/DishFilter';

const DishesManagement = (props: Props) => {
  const { className } = props;

  const dispatch = useAppDispatch();

  const allDishes = useAppSelector((state) => state.dishStore.dishes);

  const [dishId, setDishId] = useState<number>(0);
  const [dishes, setDishes] = useState<DishType[]>(allDishes);
  const [isCreateDishOpen, setIsCreateDishOpen] = useState<boolean>(false);
  const [isEditDishOpen, setIsEditDishOpen] = useState<boolean>(false);

  const onCreateADishSubmit = (values: DishForm) => {
    console.log({ values });

    const { categoryId, name, price, description } = values;
    const dishNames = dishes.map(({ name }: DishType) => escapeText(name));

    if (!dishNames.includes(escapeText(name))) {
      addADish(
        {
          categoryId,
          name,
          price,
          description,
        },
        dispatch
      );

      setIsCreateDishOpen(false);
    } else toast.error('Tên món đã tồn tại! Hãy chọn tên khác!');
  };

  const onEditADishSubmit = (values: DishForm) => {
    console.log({ values });

    if (values) {
      const { categoryId, name, description, price } = values;

      editADish({ id: dishId, categoryId, name, description, price }, dispatch);

      setIsEditDishOpen(false);
    }
  };

  useEffect(() => {
    getAllDishes(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={className}>
      <p className='text-gray-700 text-3xl font-medium uppercase border-b-[0.5px] border-gray-400'>
        QUẢN LÝ MÓN
      </p>

      <Button
        variant='primary'
        className='my-4 float-right'
        onClick={() => setIsCreateDishOpen(true)}
      >
        Tạo món
      </Button>

      {allDishes.length > 0 ? (
        <>
          <DishFilter
            allDishes={allDishes}
            dishes={dishes}
            setDishes={setDishes}
            className='mt-20'
          />
          {dishes.length > 0 ? (
            <div className='mt-4'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>STT</TableHead>
                    <TableHead>Tên</TableHead>
                    <TableHead>Loại</TableHead>
                    {/* <TableHead>Ảnh</TableHead> */}
                    <TableHead>Giá</TableHead>
                    <TableHead>Mô tả</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className='text-center'>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {dishes.map((dish, index) => (
                    <TableRow key={dish.id}>
                      <TableCell className='font-medium'>{index + 1}</TableCell>

                      <TableCell>{dish.name}</TableCell>

                      {/* <TableCell> */}
                      {/* <ImageCustom thumbnail={dish.thumbnail} /> */}
                      {/* <div className={cn('relative w-14 h-14', className)}>
                      <Image src={dish.thumbnail} alt='thumbnail' fill />
                    </div>
                  </TableCell> */}

                      <TableCell>{dish.categoryName}</TableCell>
                      <TableCell>
                        {getValueString(dish.price.toString())}
                      </TableCell>
                      <TableCell>{dish.description}</TableCell>
                      <TableCell>
                        <Select
                          value={dish.status}
                          onValueChange={(value) =>
                            updateDishStatus(
                              { id: dish.id!, dishStatus: value },
                              dispatch
                            )
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='true'>Hoạt động</SelectItem>
                            <SelectItem value='false'>
                              Ngưng hoạt động
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className='flex justify-center gap-3'>
                          <AlertDialogCustom
                            buttonTitle='Xóa'
                            onSubmit={() => deleteADish(dish.id!, dispatch)}
                          />

                          <Button
                            variant='success'
                            onClick={() => {
                              setIsEditDishOpen(true);
                              setDishId((pre) =>
                                dish?.id && pre !== dish.id ? dish.id : pre
                              );
                            }}
                          >
                            Chỉnh sửa
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-red-500 font-medium'>
              Không tìm ra món nào!
            </p>
          )}
        </>
      ) : (
        <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-red-500 font-medium'>
          Danh sách món trống!
        </p>
      )}

      {isCreateDishOpen && (
        <CreateADish
          open={isCreateDishOpen}
          setOpen={setIsCreateDishOpen}
          onSubmit={onCreateADishSubmit}
        />
      )}

      {isEditDishOpen && (
        <EditADish
          open={isEditDishOpen}
          setOpen={setIsEditDishOpen}
          dishes={dishes}
          dishId={dishId}
          onSubmit={onEditADishSubmit}
        />
      )}
    </section>
  );
};

export default DishesManagement;
