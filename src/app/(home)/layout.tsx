import type { Metadata } from 'next';
import { Dosis } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Sidebar } from '@/components/Sidebar';
import { AuthProvider } from '@/containers/Auth';
import { Header } from '@/components/Header';
import '../globals.css';

const dosis = Dosis({ subsets: ['vietnamese'] });

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
      <html lang='vietnamese'>
        <body suppressHydrationWarning={true} className={dosis.className}>
          <Header />

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
          <div className='sm:absolute left-72 w-full sm:w-[calc(100%-288px)] min-h-[calc(100vh-80px)] p-4 sm:mt-20 bg-sky-100'>
            {children}
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
