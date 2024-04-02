import React, { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
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
import { decodeBase64String } from '@/utils/image';
import { DishType } from '@/types/dish';
import { CategoryType } from '@/types/category';
import { getItemLS } from '@/utils/localStorage';

const DishForm = (props: Props) => {
  const {
    className = '',
    selectedDish,
    title,
    open,
    submitTitle = 'Tạo',
    setOpen,
    onSubmit,
  } = props;

  const imageFile = useMemo(() => {
    if (selectedDish) {
      const { fileName, imageProduct } = selectedDish as DishType;

      console.log({ fileName });
      const byteArray = decodeBase64String(imageProduct as any);
      if (byteArray && fileName) {
        const blob = new Blob([byteArray], {
          type: 'image/jpeg, image/jpg, image/png, image/webp, image/jfif',
        }); // Change the MIME type if your image is of a different format
        return new File([blob], fileName, {
          // filename type is the same to the new file type
          type: `image/${fileName.split('.')[1]}`,
        }); // Change the file name and type accordingly
      }
    }
  }, [selectedDish]);

  const [image, setImage] = useState<File | null>(imageFile || null);
  const [isChangedValues, setIsChangedValues] = useState<boolean>(false);
  const [initialFormData, setInitialFormData] = useState<DishFormType>({
    name: '',
    price: 0,
    categoryId: 0,
    description: '',
    thumbnail: null,
  });

  const form = useForm<DishFormType>({
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
    setValue,
    reset,
    watch,
  } = form;

  const formData = watch();

  const onResetClick = (e: any) => {
    e.preventDefault();
    if (isValid) {
      reset();
      setImage(null);
    }
  };

  useEffect(() => {
    if (selectedDish) {
      const { categoryId, name, price, description } = selectedDish;
      setValue('name', name);
      setValue('price', price);
      setValue('categoryId', categoryId);
      setValue('description', description);
      setValue('thumbnail', imageFile);

      setInitialFormData({
        name,
        price,
        categoryId,
        description,
        thumbnail: imageFile,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDish]);

  // update isChangedValues when the values of fields changed
  useEffect(() => {
    if (initialFormData) {
      const hasFormChanged = !_.isEqual(initialFormData, formData);
      setIsChangedValues(hasFormChanged);
    }
  }, [initialFormData, formData]);

  useEffect(() => {
    //reset
    if (isSubmitSuccessful) {
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
            onSubmit={handleSubmit(
              isChangedValues
                ? onSubmit
                : () => {
                    setOpen(false);
                  }
            )}
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
                  {submitTitle}
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
