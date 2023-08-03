import { useUser } from '@clerk/nextjs';
import styles from './UserAvatar.module.scss';
import { Avatar, AvatarFallback, AvatarImage } from './shadcn/avatar';

const UserAvatar = () => {
  const { user } = useUser();
  return (
    <Avatar className={styles.userAvatar}>
      <AvatarImage src={user?.profileImageUrl} />
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
