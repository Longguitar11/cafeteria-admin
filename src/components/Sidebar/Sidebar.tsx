'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { optionItems } from '@/constants/optionItems';
import { Button } from '../ui/button';
import { DropdownHoverType } from './Sidebar.models';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { cancelOrder, confirmOrder, deleteDish } from '@/redux/orderSlice';
import { cn } from '@/lib/utils';
import { Options, OrderModal } from './Sidebar.views';
import { useAuthContext } from '@/containers/Auth/Auth.context';
import { jwtDecode } from 'jwt-decode';
import { sideBar } from '@/constants/sidebar';

const Sidebar = () => {
  const router = useRouter();

  const { token, removeToken } = useAuthContext();

  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<DropdownHoverType>({
    categories: { header: false, option: false },
    bestSelling: { header: false, option: false },
  });

  const onCategoryClick = (id: string) => {
    setIsHovered({ categories: { header: false } });
    if (isOptionOpen) setIsOptionOpen(false);

    router.push(`/categories/${id}`);
  };

  useEffect(() => {
    if (token) {
      const decodedJwt = jwtDecode(token);

      if (decodedJwt.exp! * 1000 < Date.now()) {
        console.log(decodedJwt.exp! * 1000, Date.now());
        // logout
        removeToken();
        router.push('/signin');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <section
      className={cn(
        'h-full w-72 text-white bg-cyan-800 bg-opacity-70 fixed top-0 left-0 flex flex-col gap-6 py-20'
      )}
    >
      <Link href='/'>
        <div className='w-20 h-20 flex mx-auto rounded-full shadow-md hover:bg-cyan-300 transition-colors duration-200 cursor-pointer'>
          <div className='relative m-auto w-14 h-14'>
            <Image src='/images/admin.svg' alt='logo' fill />
          </div>
        </div>
      </Link>

      {sideBar.map((item) => (
        <Button
          key={item.name}
          variant='ghost'
          onClick={() => router.push(item.url)}
        >
          {item.name}
        </Button>
      ))}

      <div className='relative w-8 h-8 block sm:hidden'>
        <Image
          className='sm:hidden cursor-pointer hover:opacity-80 transition-opacity duration-200'
          src='/images/bars-solid.svg'
          alt='bar logo'
          fill
          sizes='32px'
          onClick={() => setIsOptionOpen((pre) => !pre)}
        />
      </div>

      {isOptionOpen && optionItems.length > 0 && (
        <Options
          isOpen={isOptionOpen}
          isHover={isHovered}
          setIsOpen={setIsOptionOpen}
          setIsHover={setIsHovered}
          onCategoryClick={onCategoryClick}
        />
      )}
    </section>
  );
};

export default Sidebar;
