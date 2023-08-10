import {
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ToolCard as ToolCardType } from '@/lib/types';
import styles from './ToolCard.module.scss';
import { Card } from '../shadcn/card';

interface ToolCardProps {
  tool: ToolCardType;
}

const ToolCard = ({
  tool,
}: ToolCardProps) => (
  <Card
    key={tool.href}
    className={styles.toolCard}
  >
    <Link href={tool.href}>
      <div className={styles.wrapper}>
        <div className={cn(styles.iconBg, tool.bgColor)}>
          <tool.Icon className={cn(styles.Icon, tool.color)} />
        </div>
        <div className={styles.label}>
          {tool.label}
        </div>
      </div>
      <ArrowRight className={styles.arrow} />
    </Link>
  </Card>
);

export default ToolCard;
