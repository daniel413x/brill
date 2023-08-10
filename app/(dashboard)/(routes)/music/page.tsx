import { Metadata } from 'next';
import MusicLayout from '@/components/ui/dashboard/music/MusicLayout';

export const metadata: Metadata = {
  title: 'Music Generation',
};

const MusicPage = () => (
  <MusicLayout />
);

export default MusicPage;
