'use client';

import styles from './GeneratedMedia.module.scss';
import Empty from './Empty';
import Loader from './Loader';

interface ChatMessagesProps<T> {
  mediaArray: T[];
  MediaComponent: any;
  isSubmitting: boolean;
}

const GeneratedMedia = <T extends {}>({
  mediaArray,
  MediaComponent,
  isSubmitting,
}: ChatMessagesProps<T>): JSX.Element => (
  <div className={styles.generatedMedia}>
    {mediaArray.length === 0 && isSubmitting && (
    <Loader
      parentStyles={styles}
    />
    )}
    {!isSubmitting && mediaArray.length === 0 && (
      <Empty
        label="No conversation history"
      />
    )}
    <ul className={styles.images}>
      {mediaArray.length > 0 && isSubmitting && (
      <Loader />
      )}
      {mediaArray.map((media, i) => (
        <li key={i}>
          <MediaComponent media={media} />
        </li>
      ))}
    </ul>
  </div>
  );

export default GeneratedMedia;
