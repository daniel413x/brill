import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

export type Children = ReactNode | undefined;

export type SCSSModule = Record<string, string>;

export type ToolCard = {
  label: string;
  Icon: LucideIcon;
  color: string;
  href: string;
  bgColor: string;
};
