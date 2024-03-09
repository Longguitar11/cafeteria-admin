import React from 'react';
import { OptionsType } from './Sidebar.models';
import { cn } from '@/lib/utils';
import { ItemBar } from '../ItemBar';
import './style.css';
import { sideBar } from '@/constants/sidebar';

export const Options = (props: OptionsType) => {
  const { className = '', isOpen, setIsOpen } = props;

  return (
    <div
      className={cn(
        'top-20 flex flex-col bg-gray-600 text-white z-50 sm:hidden',
        isOpen ? 'absolute' : 'hidden',
        className
      )}
    >
      {sideBar.map((item, index) => (
        <ItemBar
          key={index}
          url={item.url}
          text={item.name}
          onClick={() => setIsOpen(false)}
        />
      ))}
    </div>
  );
};
