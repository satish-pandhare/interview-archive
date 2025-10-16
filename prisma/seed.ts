import { PrismaClient, Prisma } from "@/generated/prisma";

const prisma = new PrismaClient();

const tagsData: Prisma.TagCreateInput[] = [
  {
    name: "frontend",
  },
  {
    name: "backend",
  },
  {
    name: "devops",
  },
  {
    name: "system-design",
  },
  {
    name: "sql",
  },
  {
    name: "dsa",
  },
  {
    name: "react",
  },
];

const rolesData: Prisma.RoleCreateInput[] = [
  {
    name: "frontend-developer",
  },
  {
    name: "backend-developer",
  },
  {
    name: "full-stack-developer",
  },
  {
    name: "devops-engineer",
  },
  {
    name: "product-analyst",
  },
  {
    name: "ai-engineer",
  },
  {
    name: "data-scientist",
  },
];

export async function main() {
  for (const t of tagsData) {
    await prisma.tag.create({ data: t });
  }
  for (const r of rolesData) {
    await prisma.role.create({ data: r });
  }
}

main();
