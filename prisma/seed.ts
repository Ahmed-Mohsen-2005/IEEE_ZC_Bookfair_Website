import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with all publisher accounts...')

  const publishersData = [
    { slug: 'general-egyptian', name: 'General Egyptian Book Organization', tagline: 'Leading the book industry in Egypt', accentColor: '#00B4D1', email: 'gebo@zewail.edu.eg' },
    { slug: 'dar-al-maaref', name: 'Dar Al-Maaref', tagline: 'A pioneer in Arabic publishing', accentColor: '#C4A35A', email: 'maaref@zewail.edu.eg' },
    { slug: 'national-library', name: 'National Library and Archives', tagline: 'Preserving the heritage of Egypt', accentColor: '#7C3AED', email: 'library@zewail.edu.eg' },
    { slug: 'al-ahram', name: 'Al-Ahram Publishing', tagline: 'The voice of Egypt in print', accentColor: '#059669', email: 'ahram@zewail.edu.eg' },
  ]

  for (const pub of publishersData) {
    const publisher = await prisma.publisher.upsert({
      where: { slug: pub.slug },
      update: {},
      create: {
        name: pub.name,
        slug: pub.slug,
        tagline: pub.tagline,
        description: 'Official publisher affiliate of the Zewail Bookfair.',
        accentColor: pub.accentColor,
      },
    })

    // Create Publisher Account
    await prisma.user.upsert({
      where: { email: pub.email },
      update: { password: 'Password123!' },
      create: {
        name: `${pub.name} Manager`,
        email: pub.email,
        password: 'Password123!',
        role: 'publisher',
        publisherId: publisher.id,
      },
    })
  }

  console.log('All publishers seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
