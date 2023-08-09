'use client';

import { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('fa13dc2b-528f-4a1a-a659-469963fe51ae');
  }, []);
  return null;
};

export default CrispChat;
