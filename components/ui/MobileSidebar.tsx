'use client';

import { FC } from 'react';
import { Menu } from 'lucide-react';
import useHasMounted from '@/hooks/useHasMounted';
import { Sheet, SheetContent, SheetTrigger } from './shadcn/sheet';
import Sidebar from './dashboard/Sidebar';

const MobileSidebar: FC = () => {
  if (!useHasMounted()) {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger className="md:hidden hover:bg-accent p-2">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 md:hidden">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
