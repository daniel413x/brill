import { UserButton } from '@clerk/nextjs';

const DashboardPage = () => (
  <div>
    Dashboard (Protected)
    <UserButton afterSignOutUrl="/" />
  </div>
);

export default DashboardPage;
