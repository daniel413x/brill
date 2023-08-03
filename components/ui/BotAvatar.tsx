import styles from './BotAvatar.module.scss';
import { Avatar, AvatarImage } from './shadcn/avatar';

const BotAvatar = () => (
  <Avatar className={styles.botAvatar}>
    <AvatarImage className={styles.image} src="/logos/brill-logo-f.png" />
  </Avatar>
);

export default BotAvatar;
