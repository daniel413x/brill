import { Metadata } from 'next';
import VideoLayout from '@/components/ui/dashboard/video/VideoLayout';

export const metadata: Metadata = {
  title: 'Video Generation',
};

const VideoPage = () => (
  <VideoLayout />
);

export default VideoPage;
