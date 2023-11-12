import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// initialize the Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  // create two dummy users
  const passwordSabin = await bcrypt.hash('123456', roundsOfHashing);

  // const rol1 = await prisma.roles.create({
  //       data: {
  //           name: 'admin'
  //       }
  // })

  // const rol2 = await prisma.roles.create({
  //       data: {
  //           name: 'client'
  //       }
  //   })
  const user1 = await prisma.users.upsert({
    where: { email: 'sabin@adams.com' },
    update: {
      password: passwordSabin,
    },
    create: {
      email: 'sabin@adams.com',
      username: 'Sabin Adams',
      password: passwordSabin,
      rolId: 1
    },
  });

  const msg1 = prisma.chat.upsert({
    where: { id: 1 },
    update: {
      content: 'hola como estas',
    },
    create: {
      content: 'sabin@adams.com',
      clientName: 'aharon'
    },
  });

}


// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close the Prisma Client at the end
    await prisma.$disconnect();
  });