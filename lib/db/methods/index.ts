import { auth } from '@clerk/nextjs';
import { MAX_FREE_COUNTS } from '@/lib/data/consts';
import prismadb from '../prismadb';

export const checkSubscription = async () => {
  const { userId } = auth();
  if (!userId) {
    return false;
  }
  const userSubscription = await prismadb.userSubscription.findUnique({
    where: {
      userId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
  });
  if (!userSubscription) {
    return false;
  }
  const DAY_IN_MS = 86_400_000;
  const isValid = userSubscription.stripePriceId
    && userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();
  return !!isValid;
};

export const incrementApiLimit = async () => {
  const { userId } = auth();
  if (!userId) {
    return;
  }
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });
  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId },
      data: { count: userApiLimit.count + 1 },
    });
  } else {
    await prismadb.userApiLimit.create({
      data: { userId, count: 1 },
    });
  }
};

export const checkApiLimit = async () => {
  const { userId } = auth();
  if (!userId) {
    return false;
  }
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId },
  });
  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {
    return true;
  }
  return false;
};

export const getApiLimitCount = async () => {
  const { userId } = auth();
  if (!userId) {
    return 0;
  }
  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: {
      userId,
    },
  });
  if (!userApiLimit) {
    return 0;
  }
  return userApiLimit.count;
};
