'use client';

import { useAuthContext } from '@/containers/Auth/Auth.context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { token } = useAuthContext();

  useEffect(() => {
    if (!token) {
      console.log('redirect to login');
      router.replace('/signin');
    } else router.replace('/users-management');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <main></main>;
}
