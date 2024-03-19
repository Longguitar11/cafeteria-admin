import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../../ui/input';
import { cn } from '@/lib/utils';
import { Props } from './CategoryFilter.models';
import { filterOptions } from './CategoryFilter.utils';

const CategoryFilter = (props: Props) => {
  const { className = '', allCategories, categories, setCategories } = props;

  const [searchValue, setSearchValue] = useState<string>('');
  const timerUpdateSearchText = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timerUpdateSearchText.current !== null)
      clearTimeout(timerUpdateSearchText.current);

    timerUpdateSearchText.current = setTimeout(() => {
      const result = filterOptions(allCategories, {
        text: searchValue,
      });

      if (result.toString() !== categories.toString()) {
        setCategories(result);
      }
    }, 800);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <div className={cn('flex gap-3', className)}>
      <Input
        type='text'
        placeholder='Tìm loại (id, tên)'
        className='text-base'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default CategoryFilter;
