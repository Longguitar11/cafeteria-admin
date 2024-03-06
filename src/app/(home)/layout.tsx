import type { Metadata } from 'next';
import { Roboto_Mono } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Sidebar } from '@/components/Sidebar';
import StoreProvider from '../StoreProvider';
import { AuthProvider } from '@/containers/Auth';
import '../globals.css';
import { cn } from '@/lib/utils';

const robotoMono = Roboto_Mono({ subsets: ['vietnamese'] });

export const metadata: Metadata = {
  title: 'Admin',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <StoreProvider>
        <html lang='vietnamese'>
          <body
            suppressHydrationWarning={true}
            className={cn('static', robotoMono.className)}
          >
            <Sidebar />

            <ToastContainer
              position='top-right'
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='light'
            />
            <div className='absolute left-72 w-[calc(100%-288px)] bg-sky-100 h-full z-[-1]'>
              {children}
            </div>
          </body>
        </html>
      </StoreProvider>
    </AuthProvider>
  );
}
