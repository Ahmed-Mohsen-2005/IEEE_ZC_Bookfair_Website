const { PrismaClient } = require('@prisma/client')
const p = new PrismaClient()
p.user.findMany().then(u => {
  console.log('Users:', JSON.stringify(u.map(x => ({ email: x.email, role: x.role, pwd: x.password }))))
  return p.$disconnect()
}).catch(console.error)
