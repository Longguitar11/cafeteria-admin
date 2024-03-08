'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Props } from './EditACategory.models';
import { CategoryForm, CategorySchema } from '@/schemas/category';
import { useEffect, useMemo } from 'react';

const EditACategory = (props: Props) => {
  const { className = '', open, idCate, categories, setOpen, onSubmit } = props;

  const form = useForm<CategoryForm>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: '',
    },
  });

  const { control, handleSubmit, setValue } = form;

  const selectedCate = useMemo(() => {
    const selectedCate = categories.find((cate) => cate.id === idCate);

    return selectedCate;
  }, [categories, idCate]);

  useEffect(() => {
    if (selectedCate) setValue('name', selectedCate?.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCate]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn('min-w-[500px]', className)}>
        <DialogHeader>
          <DialogTitle className='text-3xl text-center'>SỬA LOẠI</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className={cn('space-y-2', className)}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên loại</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập tên loại...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-between'>
              <DialogClose asChild>
                <Button variant='secondary' className='flex-1'>
                  Hủy bỏ
                </Button>
              </DialogClose>

              <Button variant='primary' type='submit' className='flex-1'>
                Sửa
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditACategory;
