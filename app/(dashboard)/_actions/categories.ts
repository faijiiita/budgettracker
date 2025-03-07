"use server";

import prisma from "@/lib/prisma";
import {
  CreatecCategorySchema,
  CreatecCategorySchemaType,
} from "@/schema/categories";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateCategory(form: CreatecCategorySchemaType) {
  const parsedBody = CreatecCategorySchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error("Bad Request");
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const { name, icon, type } = parsedBody.data;
  return await prisma.category.create({
    data: {
      userId: user.id,
      name,
      icon,
      type,
    },
  });
}
