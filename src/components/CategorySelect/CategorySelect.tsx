'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../ui/command';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { cn } from '@/lib/utils';
import { Props } from './CategorySelect.models';
import { Input } from '../ui/input';
import { addACategory } from '@/apis/category';
import { CategoryType } from '@/types/category';
import { escapeText } from '@/utils/text';
import { toast } from 'react-toastify';

const CategorySelect = (props: Props) => {
  const { className = '', form } = props;
  const {
    control,
    setValue,
    getValues,
    resetField,
    formState: { errors, isSubmitSuccessful },
  } = form;

  const dispatch = useAppDispatch();

  const ref = useRef<HTMLInputElement>(null);

  const [isCreateCategory, setIsCreateCategory] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<string>('');

  const categories = useAppSelector((state) => state.categoryStore.categories);

  const onCategoryChange = (value: number) => {
    if (getValues('categoryId') === value) resetField('categoryId');
    else setValue('categoryId', value, { shouldDirty: true });
  };

  const onAddCategorySubmit = (e: any) => {
    e.preventDefault();

    const cateNames = categories.map(({ name }: CategoryType) =>
      escapeText(name)
    );

    if (newCategory) {
      if (!cateNames.includes(escapeText(newCategory))) {
        addACategory(
          {
            name: newCategory,
          },
          dispatch
        );

        setNewCategory('');
        setIsCreateCategory(false);
      } else {
        toast.error('Tên loại đã tồn tại! Hãy chọn tên khác!');
      }
    }
  };

  useEffect(() => {
    if (isCreateCategory && ref?.current) {
      ref?.current.focus();
    }
  }, [isCreateCategory]);

  useEffect(() => {
    if (isSubmitSuccessful && isCreateCategory) setIsCreateCategory(false);
  }, [isSubmitSuccessful, isCreateCategory]);

  return (
    <>
      <FormField
        control={control}
        name='categoryId'
        render={({ field }) => (
          <div className={cn('w-full flex gap-3 items-end', className)}>
            <FormItem className='flex flex-col'>
              <FormLabel>Loại</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant='outline'
                      role='combobox'
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? categories.find((cate) => cate.id === field.value)
                            ?.name
                        : 'Chọn loại...'}
                      <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  <Command>
                    <CommandInput placeholder='Tìm loại...' className='h-9' />
                    <CommandEmpty>Không tìm ra loại!</CommandEmpty>
                    <CommandGroup>
                      {categories.map((cate) => (
                        <CommandItem
                          value={cate.value}
                          key={cate.id}
                          onSelect={() => onCategoryChange(cate.id)}
                        >
                          {cate.name}
                          <Check
                            className={cn(
                              'ml-auto h-4 w-4',
                              cate.id === field.value
                                ? 'opacity-100'
                                : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
            <Button
              variant='success'
              onClick={(e) => {
                e.preventDefault();
                setIsCreateCategory((pre) => !pre);
              }}
              className={cn(errors.categoryId?.message !== undefined && 'mb-7')}
            >
              Thêm loại
            </Button>
          </div>
        )}
      />

      {isCreateCategory && (
        <div className='flex gap-3 w-full'>
          <Input
            ref={ref}
            type='text'
            placeholder='Nhập tên loại...'
            value={newCategory}
            autoFocus={isCreateCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button
            variant='secondary'
            disabled={newCategory === ''}
            onClick={(e) => onAddCategorySubmit(e)}
          >
            Thêm
          </Button>
        </div>
      )}
    </>
  );
};

export default CategorySelect;
