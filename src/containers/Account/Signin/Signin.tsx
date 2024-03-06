'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { SigninForm, SigninSchema } from './Signin.schema';
import { Props } from './Signin.models';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signin } from '@/apis/user';
import { cn } from '@/lib/utils';

const Signin = (props: Props) => {
  const { className = '' } = props;

  const form = useForm<SigninForm>({
    resolver: zodResolver(SigninSchema),
    mode: 'onSubmit',
    defaultValues: { email: '', password: '' },
  });

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  const router = useRouter();

  const onSigninSubmit = ({ email, password }: SigninForm) => {
    if (isValid) {
      console.log({ email, password });
      const res = signin({ email, password });

      res
        .then((res) => {
          if (res) router.replace('/');
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
          ĐĂNG NHẬP
        </p>

        <FormField
          control={control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Nhập email...' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <div className='flex justify-between'>
                <FormLabel>Mật khẩu</FormLabel>
                <FormLabel>
                  <Link
                    href='/forgot-password'
                    className='text-black hover:text-blue-200 transition-colors duration-200'
                  >
                    Quên mật khẩu?
                  </Link>
                </FormLabel>
              </div>

              <FormControl>
                <Input
                  type='password'
                  placeholder='Nhập mật khẩu...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' variant='primary' className='w-full'>
          Đăng nhập
        </Button>

        <p className='text-center text-white'>
          Chưa có tài khoản?{' '}
          <Link
            href='/signup'
            className='hover:text-blue-200 text-black transition-colors duration-200'
          >
            Đăng ký
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default Signin;
