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
import { Props } from './CreateACategory.models';
import { CategoryForm, CategorySchema } from '@/schemas/category';

const CreateACategory = (props: Props) => {
  const { className = '', open, setOpen, onSubmit } = props;

  const form = useForm<CategoryForm>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: '',
    },
  });

  const { control, handleSubmit } = form;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className={cn('min-w-[500px]', className)}>
        <DialogHeader>
          <DialogTitle className='text-3xl text-center'>TẠO LOẠI</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            className={cn('space-y-4', className)}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-black'>Tên loại</FormLabel>
                  <FormControl>
                    <Input placeholder='Nhập tên loại...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex justify-between gap-4'>
              <DialogClose asChild>
                <Button variant='secondary' className='flex-1'>
                  Hủy bỏ
                </Button>
              </DialogClose>

              <Button variant='primary' type='submit' className='flex-1'>
                Tạo
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateACategory;
