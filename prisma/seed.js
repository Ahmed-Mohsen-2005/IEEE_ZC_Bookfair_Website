const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  await prisma.user.upsert({
    where: { email: 'visitor@zewailcity.edu.eg' },
    update: {},
    create: {
      name: 'Ahmed Ali',
      email: 'visitor@zewailcity.edu.eg',
      password: 'password123',
      role: 'visitor',
    },
  })

  await prisma.user.upsert({
    where: { email: 'publisher@zewailcity.edu.eg' },
    update: {},
    create: {
      name: 'Publisher Admin',
      email: 'publisher@zewailcity.edu.eg',
      password: 'publisher123',
      role: 'publisher',
      publisherId: 'general-egyptian',
    },
  })

  await prisma.user.upsert({
    where: { email: 'admin@zewailcity.edu.eg' },
    update: {},
    create: {
      name: 'System Admin',
      email: 'admin@zewailcity.edu.eg',
      password: 'admin123',
      role: 'admin',
    },
  })

  console.log('Database seeded!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
