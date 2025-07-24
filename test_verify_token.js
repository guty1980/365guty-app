const { verifyToken } = require('./lib/auth.ts');

// Este es el token que obtuvimos de la cookie en la prueba anterior
const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbWRnOGF0OXUwMDAwc2ZvanYzZDB6ZXIyIiwiaXNBZG1pbiI6dHJ1ZSwibmFtZSI6IkFkbWluaXN0cmFkb3IiLCJpYXQiOjE3NTMyOTEzNzEsImV4cCI6MTc1Mzg5NjE3MX0.zauc_s4TQ6OdS0L-4CPM_czm0m1bmMph11CcILEfT1I';

async function testTokenVerification() {
  console.log('🔍 Probando verificación de token...');
  console.log('🔑 Token:', testToken.substring(0, 50) + '...');
  
  try {
    const result = await verifyToken(testToken);
    
    if (result) {
      console.log('✅ Token válido!');
      console.log('👤 Usuario:', result);
    } else {
      console.log('❌ Token inválido o expirado');
    }
  } catch (error) {
    console.error('💥 Error verificando token:', error);
  }
}

testTokenVerification();
