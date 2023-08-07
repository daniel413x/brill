'use client';

import { Menu } from 'lucide-react';
import useHasMounted from '@/hooks/useHasMounted';
import { Sheet, SheetContent, SheetTrigger } from './shadcn/sheet';
import Sidebar from './dashboard/Sidebar';

interface MobileSideProps {
  apiLimitCount: number;
}

const MobileSidebar = ({
  apiLimitCount,
}: MobileSideProps) => {
  if (!useHasMounted()) {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger className="md:hidden hover:bg-accent p-2">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 md:hidden">
        <Sidebar apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
