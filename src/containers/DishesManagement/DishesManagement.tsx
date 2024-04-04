'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Props } from './DishesManagement.models';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getValueString } from '@/utils/currency';
import { AlertDialogCustom } from '@/components/AlertDialogCustom';
import { DishFormType } from '@/schemas/product';
import { Button } from '@/components/ui/button';
import {
  addADishV2,
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
import { DishForm } from '@/components/DishForm';
import { ImageCustom } from '@/components/ImageCustom';

const DishesManagement = (props: Props) => {
  const { className } = props;

  const [allDishes, setAllDishes] = useState<DishType[]>([]);
  const [isGettingDishes, setIsGettingDishes] = useState<boolean>(false);
  const [dishId, setDishId] = useState<number>(0);
  const [dishes, setDishes] = useState<DishType[]>(allDishes);
  const [isCreateDishOpen, setIsCreateDishOpen] = useState<boolean>(false);
  const [isEditDishOpen, setIsEditDishOpen] = useState<boolean>(false);

  console.log(isGettingDishes);

  // useMemo
  const selectedDish = useMemo(() => {
    const dish = dishes.find((dish) => dish.id === dishId);
    if (dish) return dish;
  }, [dishId, dishes]);

  // useCallback
  const fetchDishes = useCallback(() => {
    const res = getAllDishes();

    setIsGettingDishes(true);
    res
      .then((res) => {
        setIsGettingDishes(false);
        setAllDishes(res);
      })
      .catch((error) => console.log(error));
  }, []);

  const onCreateADishSubmit = async (values: DishFormType) => {
    console.log({ values });

    const { categoryId, name, price, description, thumbnail } = values;
    const dishNames = dishes.map(({ name }: DishType) =>
      escapeText(name).toLowerCase()
    );

    if (!dishNames.includes(escapeText(name).toLowerCase())) {
      await addADishV2({
        name,
        categoryId,
        price,
        description,
        imageProduct: thumbnail,
      });

      fetchDishes();

      setIsCreateDishOpen(false);
    } else toast.error('Tên món đã tồn tại! Hãy chọn tên khác!');
  };

  const onEditADishSubmit = async (values: DishFormType) => {
    console.log({ values });

    if (values) {
      const { categoryId, name, description, price, thumbnail } = values;

      await editADish({
        id: dishId,
        name,
        categoryId,
        description,
        price,
        imageProduct: thumbnail,
      });

      fetchDishes();

      setIsEditDishOpen(false);
    }
  };

  // set dish when all dishes updated
  useEffect(() => {
    setDishes(allDishes);
  }, [allDishes]);

  useEffect(() => {
    fetchDishes();
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

      {!isGettingDishes ? (
        allDishes.length > 0 ? (
          <>
            <DishFilter
              allDishes={allDishes}
              dishes={dishes}
              setDishes={setDishes}
              className='mt-20'
            />

            <div className='mt-4'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>STT</TableHead>
                    <TableHead>Tên</TableHead>
                    <TableHead>Ảnh</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>Giá</TableHead>
                    <TableHead>Mô tả</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className='text-center'>Thao tác</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {dishes.length > 0 ? (
                    dishes.map((dish, index) => (
                      <TableRow key={dish.id}>
                        <TableCell className='font-medium'>
                          {index + 1}
                        </TableCell>

                        <TableCell>{dish.name}</TableCell>

                        <TableCell>
                          <ImageCustom thumbnail={dish.imageProduct} />
                        </TableCell>

                        <TableCell>{dish.categoryName}</TableCell>
                        <TableCell>
                          {getValueString(dish.price.toString())}
                        </TableCell>
                        <TableCell>{dish.description}</TableCell>
                        <TableCell>
                          <Select
                            value={dish.status}
                            onValueChange={async (value) => {
                              await updateDishStatus({
                                id: dish.id!,
                                dishStatus: value,
                              });
                              fetchDishes();
                            }}
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
                              onSubmit={async () => {
                                await deleteADish(dish.id!);
                                fetchDishes();
                              }}
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
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className='text-red-500 text-xl text-center'
                      >
                        Không tìm ra món!
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </>
        ) : (
          <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-red-500 font-medium'>
            Danh sách món trống!
          </p>
        )
      ) : (
        <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-sky-500 font-medium'>
          Đang tải...
        </p>
      )}

      {isCreateDishOpen && (
        <DishForm
          onSubmit={onCreateADishSubmit}
          open={isCreateDishOpen}
          setOpen={setIsCreateDishOpen}
          title='TẠO MÓN'
        />
      )}

      {isEditDishOpen && (
        <DishForm
          onSubmit={onEditADishSubmit}
          open={isEditDishOpen}
          submitTitle='Sửa'
          setOpen={setIsEditDishOpen}
          selectedDish={selectedDish}
          title='SỬA MÓN'
        />
      )}
    </section>
  );
};

export default DishesManagement;
