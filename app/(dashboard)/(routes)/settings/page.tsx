import checkSubscription from '@/lib/checkSubscription';
import SettingsLayout from '@/components/ui/dashboard/settings/SettingsLayout';

const SettingsPage = async () => {
  const isPro = await checkSubscription();
  return (
    <SettingsLayout
      isPro={isPro}
    />
  );
};

export default SettingsPage;
