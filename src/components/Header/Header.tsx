'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { accountDropdown } from '@/constants/accountDropdown';
import { Options } from '../Sidebar/Sidebar.views';
import { Dropdown } from '../Dropdown';
import { DropdownHoverType } from './Header.models';

const Header = () => {
  const router = useRouter();

  const [isHovered, setIsHovered] = useState<DropdownHoverType>();
  const [isOptionOpen, setIsOptionOpen] = useState<boolean>(false);

  const onAccountClick = (url: string) => {
    if (url === '/signin' && typeof window !== undefined) {
      localStorage.clear();
    }

    router.push(url);
  };

  return (
    <section className='h-20 w-full sm:w-[calc(100%-288px)] text-white bg-cyan-800 bg-opacity-80 sm:fixed top-0 right-0 flex justify-between sm:justify-end items-center gap-6 p-10 z-10'>
      <div className='relative min-w-8 min-h-8 block sm:hidden'>
        <Image
          className='sm:hidden cursor-pointer hover:opacity-80 transition-opacity duration-200'
          src='/images/bars-solid.svg'
          alt='bar logo'
          fill
          sizes='32px'
          onClick={() => setIsOptionOpen((pre) => !pre)}
        />
      </div>

      {isOptionOpen && (
        <Options
          isOpen={isOptionOpen}
          setIsOpen={setIsOptionOpen}
          className='left-0'
        />
      )}

      <div className='relative'>
        <Button
          variant='ghost'
          onMouseOver={() => setIsHovered({ account: { header: true } })}
          onMouseLeave={() => setIsHovered({ account: { header: false } })}
        >
          Tài khoản
        </Button>

        {isHovered?.account?.header && (
          <Dropdown
            data={accountDropdown}
            onClick={onAccountClick}
            onMouseOver={() => setIsHovered({ account: { header: true } })}
            onMouseLeave={() => setIsHovered({ account: { header: false } })}
            className='left-0'
          />
        )}
      </div>
    </section>
  );
};

export default Header;
