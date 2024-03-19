'use client';

import { useAuthContext } from '@/containers/Auth/Auth.context';
import { StaffManagement } from '@/containers/StaffManagement';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

const StaffManagementPage = () => {
  const { token } = useAuthContext();

  useEffect(() => {
    if (!token) redirect('/signin');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <StaffManagement />;
};

export default StaffManagementPage;
