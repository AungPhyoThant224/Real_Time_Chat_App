import { prisma } from "./client.js";
import { Role } from "../src/generated/prisma/enums.js";
import bcrypt from "bcrypt";

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const systemAdmin = await prisma.user.upsert({
    where: { email: "admin@kbz.com" },
    update: {},
    create: {
      email: "systemadmin@gmail.com",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  console.log("System Admin created.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());