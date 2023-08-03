import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './Heading.module.scss';

interface HeadingProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
}

const Heading = ({
  title,
  description,
  Icon,
  iconColor,
  iconBgColor,
}: HeadingProps) => (
  <div className={styles.heading}>
    <div className={cn(styles.iconBg, iconBgColor)}>
      <Icon className={cn(styles.icon, iconColor)} />
    </div>
    <div>
      <h2 className={styles.title}>
        {title}
      </h2>
      <p className={styles.desc}>
        {description}
      </p>
    </div>
  </div>
);

export default Heading;
