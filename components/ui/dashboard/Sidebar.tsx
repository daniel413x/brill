'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import {
  Code,
  ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon,
} from 'lucide-react';
import {
  CODE_ROUTE, CONVERSATION_ROUTE, DASHBOARD_ROUTE, IMAGE_ROUTE, MUSIC_ROUTE, SETTINGS_ROUTE, VIDEO_ROUTE,
} from '@/data/consts';
import { cn } from '@/lib/utils';
import { SCSSModule } from '@/types';
import { cobbleStyles } from '@/utils';
import defaultStyles from './Sidebar.module.scss';

const poppins = Poppins({
  weight: '600',
  subsets: ['latin'],
});

const routes = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    href: `/${DASHBOARD_ROUTE}`,
    color: 'text-sky-500',
  },
  {
    label: 'Conversation',
    icon: MessageSquare,
    href: `/${CONVERSATION_ROUTE}`,
    color: 'text-violet-500',
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    href: `/${IMAGE_ROUTE}`,
    color: 'text-pink-700',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    href: `/${VIDEO_ROUTE}`,
    color: 'text-orange-700',
  },
  {
    label: 'Music Generation',
    icon: Music,
    href: `/${MUSIC_ROUTE}`,
    color: 'text-emerald-500',
  },
  {
    label: 'Code Generation',
    icon: Code,
    href: `/${CODE_ROUTE}`,
    color: 'text-green-700',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: `/${SETTINGS_ROUTE}`,
  },
];

interface SidebarStyles {
  parentStyles?: SCSSModule;
}

const Sidebar = ({
  parentStyles,
}: SidebarStyles) => {
  const styles = cobbleStyles(defaultStyles, parentStyles);
  return (
    <div className={styles.sidebar}>
      <Link className={styles.logo} href={`/${DASHBOARD_ROUTE}`}>
        <div className={styles.imgWrapper}>
          <Image
            width={300}
            height={300}
            src="/logos/logo-300px.png"
            alt="logo"
          />
        </div>
        <h1 className={poppins.className}>brill.ai</h1>
      </Link>
      <ul className={styles.links}>
        {routes.map((route) => (
          <li key={route.href}>
            <Link
              href={route.href}
              key={route.href}
              className={styles.link}
            >
              <div className={styles.inner}>
                <route.icon className={cn(styles.icon, route.color)} />
                {route.label}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
