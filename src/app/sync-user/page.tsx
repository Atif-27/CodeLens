import { db } from "@/server/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("User not Found");
  }
  const cc = await clerkClient();
  const user = await cc.users.getUser(userId);
  if (!user.emailAddresses) throw new Error("user not found");
  await db.user.upsert({
    where: {
      emailAddress: user.emailAddresses[0]?.emailAddress ?? "",
    },
    update: {
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName,
      updatedAt: new Date(),
    },
    create: {
      id: userId,
      imageUrl: user.imageUrl,
      firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddresses[0]?.emailAddress ?? "",
    },
  });
  return redirect("/dashboard");
};

export default Page;
