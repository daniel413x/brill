import {
  Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon,
} from 'lucide-react';
import { ToolCard } from '@/types';
import * as routes from './routes';

export const dashboardToolCards: ToolCard[] = [
  {
    label: 'Conversation',
    Icon: MessageSquare,
    href: `/${routes.CONVERSATION_ROUTE}`,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    label: 'Image Generation',
    Icon: ImageIcon,
    href: `/${routes.IMAGE_ROUTE}`,
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
  },
  {
    label: 'Video Generation',
    Icon: VideoIcon,
    href: `/${routes.VIDEO_ROUTE}`,
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
  },
  {
    label: 'Music Generation',
    Icon: Music,
    href: `/${routes.MUSIC_ROUTE}`,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Code Generation',
    Icon: Code,
    href: `/${routes.CODE_ROUTE}`,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
  },
];

export const dashboardSidebarLinks = [
  {
    label: 'Dashboard',
    Icon: LayoutDashboard,
    href: `/${routes.DASHBOARD_ROUTE}`,
    color: 'text-sky-500',
  },
  ...dashboardToolCards.map((obj) => ({
    label: obj.label,
    Icon: obj.Icon,
    href: obj.href,
    color: obj.color,
  })),
  {
    label: 'Settings',
    Icon: Settings,
    href: `/${routes.SETTINGS_ROUTE}`,
    color: '',
  },
];
