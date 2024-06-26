'use client';

import React from 'react';
import { Props } from './ChangePassword.models';
import { useForm } from 'react-hook-form';
import {
  Form,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChangePasswordForm,
  ChangePasswordSchema,
} from './ChangePassword.schemas';
import { redirect } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { changePassword } from '@/apis/user';
import { PasswordInput } from '@/components/InputCustom/PasswordInput';

const ChangePassword = (props: Props) => {
  const { className = '' } = props;

  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: 'onSubmit',
    defaultValues: { oldPassword: '', newPassword: '' },
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  const onSigninSubmit = ({ oldPassword, newPassword }: ChangePasswordForm) => {
    if (isValid) {
      console.log({ oldPassword, newPassword });
      const res = changePassword({ oldPassword, newPassword });

      res
        .then((res) => {
          if (res) redirect('/signin');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSigninSubmit)}
        className={cn('space-y-6 m-auto w-[400px]', className)}
      >
        <p className='font-extrabold text-center text-3xl text-white'>
          ĐỔI MẬT KHẨU
        </p>

        <PasswordInput
          control={control}
          name='oldPassword'
          label='Mật khẩu cũ'
          placeholder='Nhập mật khẩu cũ...'
        />

        <PasswordInput
          control={control}
          name='newPassword'
          label='Mật khẩu mới'
          placeholder='Nhập mật khẩu mới...'
        />

        <div className='flex gap-3'>
          <Button variant='outline' className='flex-1'>
            <Link href='/'>
              Quay lại trang chủ
            </Link>
          </Button>
          <Button variant='primary' type='submit' className='flex-1'>
            Xác nhận
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ChangePassword;
