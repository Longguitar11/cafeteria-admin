'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { redirect, usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuthContext } from '@/containers/Auth/Auth.context';
import { sideBar } from '@/constants/sidebar';
import { isExpriredToken } from '@/utils/token';

const Sidebar = () => {
  const router = useRouter();

  const pathname = usePathname();

  const [seletectItem, setSeletectedItem] = useState<string>(pathname);

  const { token, removeToken } = useAuthContext();

  const expriredToken = useMemo(() => {
    if (token) return isExpriredToken(token);
  }, [token]);

  useEffect(() => {
    if (expriredToken) {
      removeToken();
      redirect('/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expriredToken]);

  useEffect(() => {
    setSeletectedItem(pathname)
  }, [pathname])

  useEffect(() => {
    if (!token) {
      redirect('/signin');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <section
      className={cn(
        'h-full w-72 text-white bg-cyan-800 bg-opacity-70 fixed top-0 left-0 flex-col gap-6 py-20 hidden sm:flex'
      )}
    >
      <Link href='/staff-management'>
        <div className='w-20 h-20 flex mx-auto rounded-full shadow-md hover:bg-cyan-300 transition-colors duration-200 cursor-pointer'>
          <div className='relative m-auto w-14 h-14'>
            <Image src='/images/admin.svg' alt='logo' fill sizes='56px' />
          </div>
        </div>
      </Link>

      {sideBar.map((item) => (
        <Button
          key={item.id}
          variant='ghost'
          className={cn(
            seletectItem === item.url && 'bg-opacity-20 bg-gray-400'
          )}
          onClick={() => {
            setSeletectedItem(item.url);
            router.push(item.url);
          }}
        >
          {item.name}
        </Button>
      ))}
    </section>
  );
};

export default Sidebar;
