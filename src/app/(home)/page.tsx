'use client';

import { useAuthContext } from '@/containers/Auth/Auth.context';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const { token } = useAuthContext();

  useEffect(() => {
    if (!token) {
      console.log('redirect to login');
      redirect('/signin');
    } else redirect('/staff-management');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <main></main>;
}
