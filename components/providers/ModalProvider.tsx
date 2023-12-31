'use client';

import ProModal from '@/components/ui/modals/ProModal';
import useHasMounted from '@/lib/hooks/useHasMounted';

const ModalProvider = () => {
  if (!useHasMounted) {
    return null;
  }
  return (
    <ProModal />
  );
};

export default ModalProvider;
