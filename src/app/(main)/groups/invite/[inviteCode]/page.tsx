import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function InvitePage({
  params,
}: {
  params: Promise<{ inviteCode: string }>;
}) {
  const { inviteCode } = await params;

  if (!inviteCode) {
    return redirect("/");
  }

  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const existingGroup = await db.group.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          userId: user.id,
        },
      },
    },
  });

  if (existingGroup) {
    return redirect(`/questions`);
  }

  const group = await db.group.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: [
          {
            userId: user.id,
          },
        ],
      },
    },
  });

  if (group) {
    return redirect(`/questions`);
  }

  return null;
}
