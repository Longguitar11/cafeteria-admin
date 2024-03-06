import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Roboto_Mono } from 'next/font/google';
import { Metadata } from 'next';
import Image from 'next/image';
import '../globals.css';

const robotoMono = Roboto_Mono({ subsets: ['vietnamese'] });

export const metadata: Metadata = {
  title: 'Cafeteria',
  description: '',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='vietnamese'>
      <body className={robotoMono.className} suppressHydrationWarning={true}>
        <Image
          src='/images/admin-auth-img.jpg'
          alt='Signin Image'
          fill
          priority
        />

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
  );
}