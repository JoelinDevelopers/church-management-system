import { PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Hash passwords
  const adminPassword = await bcrypt.hash("Admin@2025", 12);
  const userPassword = await bcrypt.hash("User@2025", 12);

  // Create Admin User with Profile
  const admin = await prisma.user.create({
    data: {
      surname: "Admin",
      otherNames: "System",
      name: "System Admin",
      email: "admin@admin.com",
      phone: "+256700000001",
      nin: "CF12345678901234",
      role: "SUPER_ADMIN",
      password: adminPassword,
      status: "ACTIVE",
      isVerified: true,
      profile: {
        create: {
          gender: "MALE",
          dateOfBirth: new Date("1980-01-01"),
          ninNumber: "CF12345678901234",
          homeAddress: "Kampala, Uganda",
          workplaceAddress: "Central Office, Kampala",
          district: "Kampala",
          title: "System Administrator",
          employeeNo: "EMP001",
          computerNumber: "COMP001",
          presentSalary: 5000000.0,
          category: "PUBLIC_SERVICE",
          memberNumber: "GU001",
          trackingNumber: "TRK001",
          lastStep: 5
        }
      }
    },
    include: {
      profile: true
    }
  });


  console.log("Seed completed successfully!");
  console.log("Created users:");
  console.log(`Admin: ${admin.email} - Password: Admin@2025`);
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
