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
import { toast } from 'react-toastify';
import { Props } from './CreateADish.models';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { DishForm, DishSchema } from '@/schemas/product';
import { CategorySelect } from '@/components/CategorySelect';
import { PriceInput } from '@/components/InputCustom';

const CreateADish = (props: Props) => {
  const { className = '', open, setOpen, onSubmit } = props;

  // const [image, setImage] = useState<File | null>(null);

  // console.log({ image });
  const form = useForm<DishForm>({
    resolver: zodResolver(DishSchema),
    defaultValues: {
      name: '',
      price: 10000,
      categoryId: undefined,
      description: '',
    },
  });

  const {
    control,
    formState: { isSubmitSuccessful, isValid },
    handleSubmit,
    reset,
  } = form;

  const onResetClick = (e: any) => {
    e.preventDefault();
    if (isValid) {
      reset();
      // setImage(null);
    }
  };

  useEffect(() => {
    //reset
    if (isSubmitSuccessful) {
      // setImage(null);
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn('min-w-[500px] bg-teal-400 border-none', className)}>
        <DialogHeader>
          <DialogTitle className='text-3xl text-center'>TẠO MÓN</DialogTitle>
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
                  Tạo
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateADish;
