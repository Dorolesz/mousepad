import { faker } from '@faker-js/faker';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i < 15; i++) {
    await prisma.orders.create({
      data: {
        price: faker.number.int({ min: 2500, max: 20000, multipleOf: 100 }),
        deliver_days: faker.number.int({ min: 3, max: 14 }),
        ordered_at: faker.date.past({ refDate: new Date('2026-01-01') }),
        product: {
          connect: {
            id: faker.number.int({ min: 1, max: 4 }),
          },
        },
      },
    });
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
