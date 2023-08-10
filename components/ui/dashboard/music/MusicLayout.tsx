'use client';

import * as z from 'zod';
import { Music } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { MUSIC_ROUTE } from '@/data/routes';
import useProModal from '@/hooks/useProModal';
import useHasMounted from '@/hooks/useHasMounted';
import { randomInt } from '@/utils';
import styles from './MusicLayout.module.scss';
import Heading from '../../Heading';
import { formSchema } from './consts';
import PromptForm from '../../PromptForm';
import GeneratedMedia from '../../GeneratedMedia';

const placeholders = [
  'Piano solo',
  'Upbeat electric guitar',
  'Energetic drum solo',
  'Latin percussion ensemble',
  'Chill lo-fi hip hop beat',
];

interface MusicItemProps {
  media: string;
}

const MusicItem = ({
  media,
}: MusicItemProps) => (
  // eslint-disable-next-line jsx-a11y/media-has-caption
  <audio className={styles.music} controls>
    <source src={media} />
  </audio>
);

const MusicLayout = () => {
  const proModal = useProModal();
  const [music, setMusic] = useState<string[]>([]);
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
      setMusic([]);
      const res = await axios.post(`/api/${MUSIC_ROUTE}`, values);
      setMusic([res.data.audio]);
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
    <div className={styles.musicLayout}>
      <Heading
        title="Music"
        description="Turn your description into music."
        Icon={Music}
        iconColor="text-emerald-500"
        iconBgColor="bg-emerald-500/10"
      />
      <PromptForm
        form={form}
        submit={onSubmit}
        buttonColor="bg-emerald-500"
        promptField={{
          id: 'prompt-field',
          name: 'prompt',
          placeholder,
        }}
      />
      <GeneratedMedia
        mediaArray={music}
        MediaComponent={MusicItem}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default MusicLayout;
