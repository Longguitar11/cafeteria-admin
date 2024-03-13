import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Input } from '../../ui/input';
import { cn } from '@/lib/utils';
import { Props } from './StaffFilter.models';
import { filterOptions } from './StaffFilter.utils';

const StaffFilter = (props: Props) => {
  const { className = '', allStaff, setStaff, staff } = props;

  const [searchValue, setSearchValue] = useState<string>('');
  const timerUpdateSearchText = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if(timerUpdateSearchText.current !== null) clearTimeout(timerUpdateSearchText.current);

    timerUpdateSearchText.current = setTimeout(() => {
      const result = filterOptions(allStaff, { text: searchValue});
      
      if (result.toString() !== staff.toString()) {
        setStaff(result);
      }
    }, 800)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <div className={cn('flex gap-3', className)}>
      <Input
        type='text'
        placeholder='Tìm nhân viên (tên, sđt, email)...'
        className='text-base'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default StaffFilter;
