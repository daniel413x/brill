import './globals.css';
import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import ModalProvider from '@/components/providers/ModalProvider';
import { cn } from '@/lib/utils';
import ToasterProvider from '@/components/providers/ToasterProvider';

export const metadata: Metadata = {
  title: {
    template: '%s | brill.ai',
    default: 'brill.ai',
  },
};

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({
  children,
}: RootLayoutProps) => (
  <ClerkProvider>
    <html lang="en">
      <body className={cn(inter.className, 'wpsn-snappable')}>
        <ModalProvider />
        <ToasterProvider />
        {children}
      </body>
    </html>
  </ClerkProvider>
);

export default RootLayout;
