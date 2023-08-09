'use client';

import { InstagramIcon, TwitterIcon, YoutubeIcon } from 'lucide-react';
import Link from 'next/link';
import styles from './SocialMedia.module.scss';

const SocialMedia = () => (
  <div className={styles.socialMedia}>
    <Link href="/">
      <TwitterIcon />
    </Link>
    &#124;
    <Link href="/">
      <InstagramIcon />
    </Link>
    &#124;
    <Link href="/">
      <YoutubeIcon />
    </Link>
  </div>
);

export default SocialMedia;
