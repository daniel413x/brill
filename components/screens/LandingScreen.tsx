import Link from 'next/link';
import { SIGNIN_ROUTE, SIGNUP_ROUTE } from '@/data/consts';

const LandingScreen = () => (
  <main>
    Landing Page (Unprotected)
    <div>
      <Link href={SIGNIN_ROUTE}>
        Login
      </Link>
      <Link href={SIGNUP_ROUTE}>
        Register
      </Link>
    </div>
  </main>
);

export default LandingScreen;
