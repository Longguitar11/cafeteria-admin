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
import { Props } from './EditADish.models';
import { useEffect, useMemo, useState } from 'react';
import { DishFormType, DishSchema } from '@/schemas/product';
import { CategorySelect } from '@/components/CategorySelect';
import { PriceInput } from '@/components/InputCustom';

const EditADish = (props: Props) => {
  const { className = '', dishId, dishes, open, setOpen, onSubmit } = props;

  // const [image, setImage] = useState<File | null>(null);

  const selectedDish = useMemo(() => {
    const dish = dishes.find((dish) => dish.id === dishId);
    if (dish) return dish;
  }, [dishId, dishes]);

  const form = useForm<DishFormType>({
    resolver: zodResolver(DishSchema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
      price: 10000,
      categoryId: undefined,
      description: '',
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors, isSubmitSuccessful, isValid },
  } = form;

  const onResetClick = (e: any) => {
    e.preventDefault();
    if (isValid) {
      reset();
      // setImage(null);
    }
  };

  useEffect(() => {
    if (selectedDish) {
      const { categoryId, name, price, description } = selectedDish;
      setValue('name', name);
      setValue('price', price);
      setValue('categoryId', categoryId);
      setValue('description', description);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDish]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      // setImage(null);
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn('min-w-[500px] bg-teal-400 border-none', className)}>
        <DialogHeader>
          <DialogTitle className='text-3xl text-center'>SỬA MÓN</DialogTitle>
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
                  <FormLabel>Tên món</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập tên món ăn...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={control}
              name='thumbnail'
              render={({ field: { name, ref, onBlur, onChange } }) => (
                <FormItem>
                  <FormLabel>Ảnh nền</FormLabel>
                  <FormControl>
                    <Input
                      type='file'
                      placeholder='Chọn ảnh nền cho món...'
                      ref={ref}
                      name={name}
                      onBlur={onBlur}
                      onChange={(e) => {
                        onChange(e.target.files?.[0]);
                        setImage(e.target.files?.[0] || null);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 

            {image && (
              <div className='md:max-w-[200px]'>
                <Image
                  src={URL.createObjectURL(image)}
                  alt='selected image'
                  width={60}
                  height={60}
                />
              </div>
            )}
            */}

            <CategorySelect form={form} />

            <PriceInput form={form} />

            <FormField
              control={control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập mô tả...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-between'>
              <Button variant='destructive' onClick={(e) => onResetClick(e)}>
                Reset
              </Button>
              <div className='flex gap-3'>
                <DialogClose asChild>
                  <Button variant='secondary'>Hủy bỏ</Button>
                </DialogClose>

                <Button variant='primary' type='submit'>
                  Sửa
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditADish;
