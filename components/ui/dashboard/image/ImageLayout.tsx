'use client';

import * as z from 'zod';
import { Download, ImageIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { IMAGE_ROUTE } from '@/data/routes';
import { errorCatch } from '@/utils';
import useHasMounted from '@/hooks/useHasMounted';
import styles from './ImageLayout.module.scss';
import Heading from '../../Heading';
import { formSchema, amountOptions, resolutionOptions } from './consts';
import PromptForm from '../../PromptForm';
import Empty from '../../Empty';
import Loader from '../../Loader';
import { Card, CardFooter } from '../../shadcn/card';
import { Button } from '../../shadcn/button';

const ImageLayout = () => {
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512',
    },
  });
  const { isSubmitting } = form.formState;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      const res = await axios.post(`/api/${IMAGE_ROUTE}`, values);
      const urls = res.data.map((image: { url: string }) => image.url);
      setImages(urls);
      form.reset();
    } catch (error: any) {
      console.log(errorCatch(error));
    } finally {
      router.refresh();
    }
  };
  if (!useHasMounted()) {
    return null;
  }
  return (
    <div className={styles.codeLayout}>
      <Heading
        title="Image Generation"
        description="Turn your description into an image."
        Icon={ImageIcon}
        iconColor="text-pink-700"
        iconBgColor="bg-pink-700/10"
      />
      <PromptForm
        form={form}
        submit={onSubmit}
        promptField={{
          name: 'prompt',
          id: 'prompt-field',
          placeholder: 'A horse in the Swiss Alps',
        }}
        selectFields={[
          {
            id: 'amount-field',
            name: 'amount',
            selectOptions: amountOptions,
          },
          {
            id: 'resolution-field',
            name: 'resolution',
            selectOptions: resolutionOptions,
          },
        ]}
      />
      {/* {images.length === 0 && isSubmitting && ( */}
      <Loader
        parentStyles={styles}
      />
      {/* )} */}
      <div className={styles.images}>
        {!isSubmitting && images.length === 0 && (
          <Empty
            label="No conversation history"
          />
        )}
        {images.length > 0 && isSubmitting && (
          <Loader />
        )}
        {images.map((src) => (
          <Card
            key={src}
            className={styles.imageCard}
          >
            <div className={styles.imageWrapper}>
              <Image
                alt="image"
                fill
                src={src}
              />
            </div>
            <CardFooter
              className={styles.footer}
            >
              <Button
                onClick={() => window.open(src)}
                variant="secondary"
                className={styles.downloadButton}
              >
                <Download
                  className={styles.icon}
                />
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ImageLayout;
