import { Metadata } from 'next';
import ImageLayout from '@/components/ui/dashboard/image/ImageLayout';

export const metadata: Metadata = {
  title: 'Image Generation',
};

const ImagePage = () => (
  <ImageLayout />
);

export default ImagePage;
