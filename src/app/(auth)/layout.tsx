import { ToastContainer } from 'react-toastify';
import { Dosis, Raleway } from 'next/font/google';
import { Metadata } from 'next';
import Image from 'next/image';
import { AuthProvider } from '@/containers/Auth';
import 'react-toastify/dist/ReactToastify.css';
import '../globals.css';

const dosis = Dosis({ subsets: ['vietnamese'] });

export const metadata: Metadata = {
  title: 'Admin',
  description: '',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang='vietnamese'>
        <body className={dosis.className} suppressHydrationWarning={true}>
          <div className='relative w-screen h-screen'>
            <Image src='/images/admin-auth-img.jpg' alt='Signin Image' fill />
          </div>

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
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-400 bg-opacity-80 w-[500px] px-4 py-10 rounded'>
            {children}
          </div>
        </body>
      </html>
    </AuthProvider>
  );
}
