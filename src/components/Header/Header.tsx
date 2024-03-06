'use client';

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { DropdownHoverType } from './Header.models';
import { Dropdown } from '../Dropdown';
import { accountDropdown } from '@/constants/accountDropdown';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/containers/Auth/Auth.context';

const Header = () => {
  const router = useRouter();

  const { removeToken } = useAuthContext();

  const [isHovered, setIsHovered] = useState<DropdownHoverType>();

  const onAccountClick = (url: string) => {
    if (url === '/signin') {
      removeToken();
      router.push(url);
    } else router.push(url);
  };
  return (
    <section className='h-20 w-[calc(100%-288px)] text-white bg-cyan-800 bg-opacity-80 fixed top-0 right-0 flex justify-end items-center gap-6 p-10'>
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
