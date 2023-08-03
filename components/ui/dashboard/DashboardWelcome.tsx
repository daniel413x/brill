'use client';

import { dashboardToolCards } from '@/data/arrays';
import styles from './DashboardWelcome.module.scss';
import ToolCard from './ToolCard';

const DashboardWelcome = () => (
  <div className={styles.dashboardWelcome}>
    <div className={styles.header}>
      <h2>
        Explore the power of AI
      </h2>
      <p>
        Chat with the smartest AI — Experience the power of AI
      </p>
    </div>
    <ul className={styles.toolCards}>
      {dashboardToolCards.map((tool) => (
        <li key={tool.href}>
          <ToolCard tool={tool} />
        </li>
      ))}
    </ul>
  </div>
);

export default DashboardWelcome;
