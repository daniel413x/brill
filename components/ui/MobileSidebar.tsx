'use client';

import { FC } from 'react';
import { Menu } from 'lucide-react';
import useHasMounted from '@/hooks/useHasMounted';
import styles from './MobileSidebar.module.scss';
import { Button } from './shadcn/button';
import { Sheet, SheetContent, SheetTrigger } from './shadcn/sheet';
import Sidebar from './dashboard/Sidebar';

const MobileSidebar: FC = () => {
  if (!useHasMounted()) {
    return null;
  }
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className={styles.menuButton}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 md:hidden">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
