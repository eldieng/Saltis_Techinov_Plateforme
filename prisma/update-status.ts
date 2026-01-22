import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Update all exhibitors with PENDING status to APPROVED
  const exhibitorsUpdated = await prisma.exhibitor.updateMany({
    where: {
      status: "PENDING",
    },
    data: {
      status: "APPROVED",
      isActive: true,
    },
  });

  console.log(`Updated ${exhibitorsUpdated.count} exhibitors to APPROVED`);

  // Update all speakers with PENDING status to APPROVED
  const speakersUpdated = await prisma.speaker.updateMany({
    where: {
      status: "PENDING",
    },
    data: {
      status: "APPROVED",
    },
  });

  console.log(`Updated ${speakersUpdated.count} speakers to APPROVED`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
