import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with default accounts...')

  // 1. Create a Publisher target first
  const publisher = await prisma.publisher.upsert({
    where: { slug: 'zewail-press' },
    update: {},
    create: {
      name: 'Zewail University Press',
      slug: 'zewail-press',
      tagline: 'Publishing academic excellence',
      description: 'The official academic press of Zewail City.',
      accentColor: '#00B4D1',
    },
  })

  // 2. Create Admin Account
  await prisma.user.upsert({
    where: { email: 'admin@zewail.edu.eg' },
    update: { password: 'AdminPassword2026!' },
    create: {
      name: 'Super Admin',
      email: 'admin@zewail.edu.eg',
      password: 'AdminPassword2026!',
      role: 'admin',
    },
  })

  // 3. Create Publisher Account
  await prisma.user.upsert({
    where: { email: 'publisher@zewail.edu.eg' },
    update: { password: 'PublisherPassword2026!' },
    create: {
      name: 'Zewail Press Manager',
      email: 'publisher@zewail.edu.eg',
      password: 'PublisherPassword2026!',
      role: 'publisher',
      publisherId: publisher.id,
    },
  })

  // 4. Create Visitor Account
  await prisma.user.upsert({
    where: { email: 'visitor@gmail.com' },
    update: { password: 'VisitorPassword2026!' },
    create: {
      name: 'Ahmed Reader',
      email: 'visitor@gmail.com',
      password: 'VisitorPassword2026!',
      role: 'visitor',
    },
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
