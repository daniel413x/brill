import { Settings } from 'lucide-react';
import Heading from '@/components/ui/Heading';
import SubscriptionButton from '@/components/ui/SubscriptionButton';
import styles from './SettingsLayout.module.scss';

interface SettingsLayoutProps {
  isPro: boolean;
}

const SettingsLayout = ({
  isPro,
}: SettingsLayoutProps) => (
  <div className={styles.settingsLayout}>
    <Heading
      title="Settings"
      description="Manage account settings."
      Icon={Settings}
      iconColor="text-gray-700"
      iconBgColor="bg-gray-700/10"
    />
    <div className={styles.subscription}>
      <div className={styles.status}>
        {isPro ? 'You are currently on a Pro plan.' : 'You are currently on a free plan.'}
      </div>
      <SubscriptionButton isPro={isPro} />
    </div>
  </div>
);

export default SettingsLayout;
