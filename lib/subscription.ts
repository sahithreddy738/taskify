import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

const DAYS_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { orgId } = await auth();
  if (!orgId) {
    return false;
  }

    const orgSubscription = await db.orgSubscription.findUnique({
      where: {
        orgId,
      },
    });
    if (!orgSubscription || !orgSubscription.stripePriceId) {
      return false;
    }
  
    const currentPeriodEnd = orgSubscription.stripeCurrentPeriodEnd;
    if (!currentPeriodEnd) {
      return false;
    }
  
    const isValid = currentPeriodEnd.getTime() + DAYS_IN_MS > Date.now();
    return isValid;

};
