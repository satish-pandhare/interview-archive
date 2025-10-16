import { currentUser } from "@/lib/current-user";
import { db } from "@/lib/db";

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ inviteCode: string }>;
  },
) {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { inviteCode } = await params;

    if (!inviteCode) {
      return new Response("Invite code is required", { status: 400 });
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
      return new Response("You are already a member of this group", {
        status: 400,
      });
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

    return new Response("Successfully joined the group", { status: 201 });
  } catch (error) {
    console.error("[PATCH_GROUP]", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
