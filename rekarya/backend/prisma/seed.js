const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@rekarya.com",
    },
    update: {
      username: "admin",
      password: hashedPassword,
      role: "ADMIN",
      isVerified: true,
    },
    create: {
      username: "admin",
      email: "admin@rekarya.com",
      password: hashedPassword,
      role: "ADMIN",
      isVerified: true,
    },
  });

  console.log("Seed admin berhasil dibuat:");
  console.log({
    id: admin.id,
    username: admin.username,
    email: admin.email,
    role: admin.role,
  });
}

main()
  .catch((error) => {
    console.error("Seed admin gagal:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });