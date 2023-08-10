import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { SCSSModule } from '@/lib/types';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const cobbleStyles = (
  defaultStyles: SCSSModule,
  parentStyles: SCSSModule | undefined,
) => {
  if (!parentStyles) {
    return defaultStyles;
  }
  const defaultStylesKeys = Object.keys(defaultStyles);
  const parentStylesKeys = Object.keys(parentStyles);
  const newStylesObj: Record<string, string> = {};
  for (let k = 0; k < defaultStylesKeys.length; k += 1) {
    const dk = defaultStylesKeys[k];
    if (parentStylesKeys.indexOf(dk) >= 0) {
      newStylesObj[dk] = `${defaultStyles[dk]} ${parentStyles[dk]}`;
    } else {
      newStylesObj[dk] = defaultStyles[dk];
    }
  }
  for (let k = 0; k < parentStylesKeys.length; k += 1) {
    if (defaultStylesKeys.indexOf(parentStylesKeys[k]) === -1) {
      newStylesObj[k] = parentStylesKeys[k];
    }
  }
  const newStylesKeys = Object.keys(newStylesObj);
  if (newStylesKeys.length === 0) {
    return defaultStyles;
  }
  return newStylesObj;
};

export const absoluteUrl = (path: string) => `${process.env.NEXT_PUBLIC_APP_URL}${path}`;

export const randomInt = (num: number) => Math.floor(Math.random() * num);
