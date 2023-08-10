'use client';

import * as z from 'zod';
import { Video } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { VIDEO_ROUTE } from '@/lib/data/routes';
import useProModal from '@/lib/hooks/useProModal';
import useHasMounted from '@/lib/hooks/useHasMounted';
import { randomInt } from '@/lib/utils';
import styles from './VideoLayout.module.scss';
import Heading from '../../Heading';
import { formSchema } from './consts';
import PromptForm from '../../PromptForm';
import GeneratedMedia from '../../GeneratedMedia';

const placeholders = [
  'Clown fish swimming around a coral reef.',
  'Overhead camera of a crowded concert.',
];

interface VideoItemProps {
  media: string;
}

const VideoItem = ({
  media,
}: VideoItemProps) => (
  // eslint-disable-next-line jsx-a11y/media-has-caption
  <video className={styles.video} controls>
    <source src={media} />
  </video>
);

const VideoLayout = () => {
  const proModal = useProModal();
  const [video, setVideo] = useState<string[]>([]);
  const [placeholder] = useState(placeholders[randomInt(placeholders.length)]);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });
  const { isSubmitting } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo([]);
      const res = await axios.post(`/api/${VIDEO_ROUTE}`, values);
      setVideo([res.data[0]]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error('Something went wrong');
      }
    } finally {
      router.refresh();
    }
  };
  if (!useHasMounted()) {
    return null;
  }
  return (
    <div className={styles.videoLayout}>
      <Heading
        title="Video"
        description="Turn your description into video."
        Icon={Video}
        iconColor="text-orange-700"
        iconBgColor="bg-orange-700/10"
      />
      <PromptForm
        form={form}
        submit={onSubmit}
        buttonColor="bg-orange-700"
        promptField={{
          id: 'prompt-field',
          name: 'prompt',
          placeholder,
        }}
      />
      <GeneratedMedia
        mediaArray={video}
        MediaComponent={VideoItem}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default VideoLayout;
