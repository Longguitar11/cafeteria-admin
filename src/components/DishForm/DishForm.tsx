import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import Image from 'next/image';
import { CategorySelect } from '../CategorySelect';
import { PriceInput } from '../InputCustom';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { DishFormType, DishSchema } from '@/schemas/product';
import { zodResolver } from '@hookform/resolvers/zod';
import { Props } from './DishForm.models';

const DishForm = (props: Props) => {
  const {
    className = '',
    selectedDish,
    title,
    open,
    setOpen,
    onSubmit,
  } = props;

  const [image, setImage] = useState<File | null>(null);

  console.log({ image });

  const form = useForm<DishFormType>({
    resolver: zodResolver(DishSchema),
    defaultValues: {
      name: '',
      price: 10000,
      categoryId: undefined,
      description: '',
      thumbnail: undefined,
    },
  });

  const {
    control,
    formState: { isSubmitSuccessful, isValid },
    handleSubmit,
    setValue,
    reset,
  } = form;

  const onResetClick = (e: any) => {
    e.preventDefault();
    if (isValid) {
      reset();
      // setImage(null);
    }
  };

  const onThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // You can perform any additional actions with the file here
      // For example, you can display a preview of the image
      console.log('File uploaded:', reader.result);

      // Now, you can move the file to the public folder
      moveFileToPublic(reader.result as string);
    };

    reader.readAsDataURL(file);
    setImage(e.target.files[0]);
  };

  const moveFileToPublic = (dataUrl: string) => {
    console.log({imageName: image?.name })
    // Create a virtual link element to download the file
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = image?.name || 'image.jpg'; // Set the file name here
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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
    //reset
    if (isSubmitSuccessful) {
      // setImage(null);
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn(
          'min-w-[500px] bg-sky-300 bg-opacity-80 border-none',
          className
        )}
      >
        <DialogHeader>
          <DialogTitle className='text-3xl text-center text-white'>
            {title}
          </DialogTitle>
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

            <FormField
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
                        // setImage(e.target.files?.[0] || null);
                        onThumbnailChange(e);
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

export default DishForm;
