import React from 'react';
import { DropdownType } from '@/types/dropdown';
import { cn } from '@/lib/utils';

const Dropdown = (props: DropdownType) => {
  const { className = '', data, onClick, onMouseLeave, onMouseOver } = props;

  return (
    <div
      className={cn(
        'absolute shadow bg-gray-50 rounded w-fit whitespace-nowrap',
        className
      )}
    >
      {data.map((item, index) => (
        <div
          key={index}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          onClick={() => {
            onClick(item.url!)
          }}
          className={cn(
            'cursor-pointer p-3 text-gray-800 hover:bg-white transition-all duration-200',
            index === data.length - 1 && 'rounded-bl rounded-br',
            index === 0 && 'rounded-tl rounded-tr'
          )}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Dropdown;
