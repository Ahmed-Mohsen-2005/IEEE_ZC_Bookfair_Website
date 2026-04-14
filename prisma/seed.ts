import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create demo users
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

  console.log('✅ Database seeded successfully!')
  console.log('📧 Demo accounts:')
  console.log('   visitor@zewailcity.edu.eg / password123')
  console.log('   publisher@zewailcity.edu.eg / publisher123')
  console.log('   admin@zewailcity.edu.eg / admin123')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
