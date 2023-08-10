import { Metadata } from 'next';
import { checkSubscription } from '@/lib/db/methods';
import SettingsLayout from '@/components/ui/dashboard/settings/SettingsLayout';

export const metadata: Metadata = {
  title: 'Settings',
};

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  return (
    <SettingsLayout
      isPro={isPro}
    />
  );
};

export default SettingsPage;
