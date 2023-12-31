'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { usePathname } from 'next/navigation';
import {
  DASHBOARD_ROUTE,
} from '@/lib/data/routes';
import { cn, cobbleStyles } from '@/lib/utils';
import { SCSSModule } from '@/lib/types';
import { dashboardSidebarLinks } from '@/lib/data/arrays';
import defaultStyles from './Sidebar.module.scss';
import FreeCounter from '../FreeCounter';
import SocialMedia from '../SocialMedia';

const poppins = Poppins({
  weight: '600',
  subsets: ['latin'],
});

interface SidebarProps {
  parentStyles?: SCSSModule;
  apiLimitCount: number;
  isPro: boolean;
}

const Sidebar = ({
  parentStyles,
  isPro,
  apiLimitCount = 0,
}: SidebarProps) => {
  const styles = cobbleStyles(defaultStyles, parentStyles);
  const pathname = usePathname();
  return (
    <div className={styles.sidebar}>
      <div>
        <Link className={styles.logo} href={`/${DASHBOARD_ROUTE}`}>
          <div className={styles.imgWrapper}>
            <Image
              width={300}
              height={300}
              src="/logos/brill-logo-c.png"
              alt="logo"
            />
          </div>
          <h1 className={poppins.className}>brill.ai</h1>
        </Link>
        <ul className={styles.links}>
          {dashboardSidebarLinks.map((route) => (
            <li key={route.href}>
              <Link
                href={route.href}
                key={route.href}
                className={cn(styles.link, {
                  [styles.active]: pathname === route.href,
                })}
              >
                <div className={styles.inner}>
                  <route.Icon className={cn(styles.icon, route.color)} />
                  {route.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {isPro ? <SocialMedia /> : null}
      <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
    </div>
  );
};

export default Sidebar;
