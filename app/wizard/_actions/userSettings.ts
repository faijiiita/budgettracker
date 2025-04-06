"use server";

import { prisma } from "@/lib/prisma";
import {
  UpdateUserCurrencySchema,
  UpdateUserTimezoneSchema,
} from "@/schema/userSettings";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const UpdateUserCurrency = async (currency: string) => {
  const parsedBody = UpdateUserCurrencySchema.safeParse({ currency });
  if (!parsedBody.success) {
    throw parsedBody.error;
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const userSettings = await prisma.userSettings.update({
    where: {
      userId: user.id,
    },
    data: {
      currency,
    },
  });

  return userSettings;
};

export const UpdateUserTimezone = async (timezone: string) => {
  const parsedBody = UpdateUserTimezoneSchema.safeParse({ timezone });
  if (!parsedBody.success) {
    throw parsedBody.error;
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const userSettings = await prisma.userSettings.update({
    where: {
      userId: user.id,
    },
    data: {
      timezone,
    },
  });

  return userSettings;
};
