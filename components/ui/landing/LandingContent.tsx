'use client';

import styles from './LandingContent.module.scss';
import {
  Card, CardContent, CardHeader, CardTitle,
} from '../shadcn/card';

const testimonials = [
  {
    name: 'Daniel',
    avatar: 'D',
    title: 'Software Engineer',
    content: 'This is the best AI tool I\'ve used!',
  },
  {
    name: 'Emily',
    avatar: 'E',
    title: 'Product Manager',
    content: 'Brill makes for an amazing companion for ping-ponging ideas!',
  },
  {
    name: 'Yu',
    avatar: 'Y',
    title: 'Data Scientist',
    content: 'This app has become an indispensable tool in my analytical work!',
  },
  {
    name: 'Sara',
    avatar: 'S',
    title: 'UX Designer',
    content: 'Brill\'s versatile generative AI suited my design work just the way I needed. Highly recommended!',
  },
  {
    name: 'Shayla',
    avatar: 'S',
    title: 'CEO',
    content: 'As the CEO of a small company, I\'m amazed by how your artificial intelligence helps me make decisions that increase my company\'s productivity. 5/5!',
  },
  {
    name: 'CJ',
    avatar: 'C',
    title: 'Digital Marketer',
    content: 'I use the image generation in our marketing campaigns. The app does the work for me.',
  },
];

const LandingContent = () => (
  <div className={styles.landingContent}>
    <h2 className={styles.header}>
      Testimonials
    </h2>
    <ul className={styles.testimonials}>
      {testimonials.map((t) => (
        <Card
          key={t.name}
          className={styles.testimonial}
        >
          <CardHeader>
            <CardTitle className={styles.testimonialTitle}>
              <div className={styles.reviewer}>
                <span className={styles.avatar}>
                  {t.avatar}
                </span>
                <div className={styles.nameCol}>
                  <span className={styles.reviewerName}>
                    {t.name}
                  </span>
                  <span className={styles.reviewerTitle}>
                    {t.title}
                  </span>
                </div>
              </div>
            </CardTitle>
            <CardContent className={styles.testimonialContent}>
              {t.content}
            </CardContent>
          </CardHeader>
        </Card>
      ))}
    </ul>
  </div>
);

export default LandingContent;
