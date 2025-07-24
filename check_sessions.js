const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkSessions() {
  console.log('🔍 Verificando sesiones en la base de datos...');
  
  const sessions = await prisma.session.findMany({
    include: {
      user: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 5
  });
  
  console.log(`📊 Total de sesiones encontradas: ${sessions.length}`);
  
  sessions.forEach((session, index) => {
    console.log(`\n📝 Sesión ${index + 1}:`);
    console.log(`  🆔 ID: ${session.id}`);
    console.log(`  👤 Usuario: ${session.user.name}`);
    console.log(`  🔑 Token (primeros 20 chars): ${session.token.substring(0, 20)}...`);
    console.log(`  ⏰ Expira: ${session.expiresAt}`);
    console.log(`  ⏰ Expiró: ${session.expiresAt < new Date() ? 'SÍ' : 'NO'}`);
    console.log(`  📱 Device ID: ${session.deviceId || 'N/A'}`);
  });
  
  const now = new Date();
  const activeSessions = await prisma.session.count({
    where: {
      expiresAt: {
        gt: now
      }
    }
  });
  
  console.log(`\n✅ Sesiones activas: ${activeSessions}`);
  
  await prisma.$disconnect();
}

checkSessions().catch(console.error);
