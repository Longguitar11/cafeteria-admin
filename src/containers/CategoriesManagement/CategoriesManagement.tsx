'use client';

import React, { useEffect, useState } from 'react';
import { Props } from './CategoriesManagement.models';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  addACategory,
  deleteACategory,
  editACategory,
  getAllCategories,
} from '@/apis/category';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AlertDialogCustom } from '@/components/AlertDialogCustom';
import { Button } from '@/components/ui/button';
import { CreateACategory } from './CreateACategory';
import { CategoryForm } from '@/schemas/category';
import { EditACategory } from './EditACategory';
import { CategoryType } from '@/types/category';
import { CategoryFilter } from '@/components/Filter';
import { escapeText } from '@/utils/text';
import { toast } from 'react-toastify';

const CategoriesManagement = (props: Props) => {
  const { className = '' } = props;

  const dispatch = useAppDispatch();

  const categories = useAppSelector((state) => state.categoryStore.categories);

  const [filteredCategories, setFilteredCategories] =
    useState<CategoryType[]>(categories);
  const [isAddCateOpen, setIsAddCateOpen] = useState<boolean>(false);
  const [isEditCateOpen, setIsEditCateOpen] = useState<boolean>(false);
  const [idCate, setIdCate] = useState<number>(0);

  console.log({ categories });

  const onCreateACategorySubmit = ({ name }: CategoryForm) => {
    const categoyNames = categories.map(({ name }: CategoryType) =>
      escapeText(name).toLowerCase()
    );

    if (!categoyNames.includes(escapeText(name).toLowerCase())) {
      addACategory({ name }, dispatch);
      setIsAddCateOpen(false);
    } else toast.error('Tên loại đã tồn tại!');
  };

  const onEditACategorySubmit = ({ name }: CategoryForm) => {
    console.log({ name });
    if (name !== '') {
      editACategory({ id: idCate, name }, dispatch);
      setIsEditCateOpen(false);
    }
  };

  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

  useEffect(() => {
    getAllCategories(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={className}>
      <p className='text-gray-700 text-3xl font-medium uppercase border-b-[0.5px] border-gray-400'>
        QUẢN LÝ LOẠI
      </p>

      <Button
        variant='success'
        className='float-right my-4'
        onClick={() => setIsAddCateOpen(true)}
      >
        Thêm loại
      </Button>

      {categories.length > 0 ? (
        <>
          <CategoryFilter
            className='mt-20 mb-4'
            allCategories={categories}
            categories={filteredCategories}
            setCategories={setFilteredCategories}
          />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead className='text-center'>Thao tác</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cate, index) => (
                  <TableRow key={cate.id}>
                    <TableCell className='font-medium'>{index + 1}</TableCell>

                    <TableCell>{cate.id}</TableCell>
                    <TableCell>{cate.name}</TableCell>

                    <TableCell>
                      <div className='flex justify-center gap-3'>
                        <AlertDialogCustom
                          buttonTitle='Xóa'
                          onSubmit={() => deleteACategory(cate.id, dispatch)}
                        />

                        <Button
                          variant='primary'
                          onClick={() => {
                            setIsEditCateOpen(true);
                            setIdCate(cate.id);
                          }}
                        >
                          Sửa
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className='text-red-500 text-xl text-center'
                  >
                    Không tìm ra loại!
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      ) : (
        <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl text-red-500 font-medium'>
          Chưa có loại!
        </p>
      )}

      {isAddCateOpen && (
        <CreateACategory
          open={isAddCateOpen}
          setOpen={setIsAddCateOpen}
          onSubmit={onCreateACategorySubmit}
        />
      )}

      {isEditCateOpen && (
        <EditACategory
          idCate={idCate}
          categories={categories}
          open={isEditCateOpen}
          setOpen={setIsEditCateOpen}
          onSubmit={onEditACategorySubmit}
        />
      )}
    </div>
  );
};

export default CategoriesManagement;
