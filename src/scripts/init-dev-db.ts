import { db, ensureDatabaseConnection } from '../lib/db'
import { ensureDir } from 'fs-extra'
import { join } from 'path'
import { execSync } from 'child_process'

async function initializeDevelopmentDatabase() {
  try {
    // 🟡 SECTION 1: INITIALIZATION START
    console.log('🔄 Initializing development database...')
    
    // 🟡 SECTION 2: STORAGE DIRECTORY SETUP
    console.log('📁 Creating storage directories...')
    await ensureDir(join(process.cwd(), 'storage', 'emails'))
    await ensureDir(join(process.cwd(), 'storage', 'attachments'))
    await ensureDir(join(process.cwd(), 'storage', 'backups'))
    console.log('✅ Storage directories created')
    
    // 🟡 SECTION 3: DATABASE MIGRATIONS
    console.log('🚀 Running database migrations...')
    execSync('npx prisma migrate dev --name init', { stdio: 'inherit' })
    console.log('✅ Database migrations completed')
    
    // 🟡 SECTION 4: DATABASE CONNECTION VERIFICATION
    console.log('🔗 Verifying database connection...')
    await ensureDatabaseConnection()
    console.log('✅ Database connection verified')
    
    // 🟡 SECTION 5: DEFAULT DATA POPULATION
    console.log('📝 Creating default system data...')
    await createDefaultPermissions()
    await createDefaultSystemConfig()
    console.log('✅ Default system data created')
    
    // 🟡 SECTION: DATABASE HEALTH CHECK
    await performHealthCheck()
    
    // 🟡 SECTION: SAMPLE DATA FOR DEVELOPMENT
    await createSampleData()
    
    // 🟢 SECTION 6: INITIALIZATION COMPLETE
    console.log('✅ Decentralized email database initialized successfully');
    
  } catch (error) {
    // 🔴 SECTION 7: ERROR HANDLING
    console.error('❌ Failed to initialize development database:', error)
    process.exit(1);
  } finally {
    // 🔵 SECTION 8: CLEANUP
    await db.$disconnect()
  }
}

// 🟡 SUBSECTION: DEFAULT PERMISSIONS SETUP
async function createDefaultPermissions() {
  const permissions = [
    { name: 'user:read', description: 'Read user data', category: 'user' },
    { name: 'user:write', description: 'Write user data', category: 'user' },
    { name: 'email:read', description: 'Read emails', category: 'email' },
    { name: 'email:write', description: 'Write emails', category: 'email' },
    { name: 'email:sync', description: 'Sync email accounts', category: 'email' },
    { name: 'attachment:read', description: 'Read attachments', category: 'email' },
    { name: 'attachment:write', description: 'Write attachments', category: 'email' },
    { name: 'admin:access', description: 'Access admin panel', category: 'admin' },
  ];
  
  for (const perm of permissions) {
    await db.permission.upsert({
      where: { name: perm.name },
      update: {},
      create: perm
    });
  }
  console.log('✅ Default permissions created');
}

// 🟡 SUBSECTION: SYSTEM CONFIGURATION SETUP
async function createDefaultSystemConfig() {
  const defaultConfig = [
    { key: 'storage.default_type', value: 'LOCAL', description: 'Default storage type for emails' },
    { key: 'email.sync_interval', value: '300000', description: 'Email sync interval in milliseconds' },
    { key: 'email.max_attachment_size', value: '52428800', description: 'Max attachment size in bytes (50MB)' },
  ];
  
  for (const config of defaultConfig) {
    await db.systemConfig.upsert({
      where: { key: config.key },
      update: {},
      create: config
    });
  }
  console.log('✅ Default system configuration created');
}

// 🟡 SECTION: DATABASE HEALTH CHECK
async function performHealthCheck() {
  try {
    // Use Prisma's raw query for SQLite
    const result: any[] = await db.$queryRaw`SELECT count(*) as count FROM sqlite_master WHERE type='table'`;
    console.log(`📊 Database health check: ${result[0].count} tables found`);
    return true;
  } catch (error) {
    console.error('❌ Database health check failed:', error);
    return false;
  }
}

// 🟡 SECTION: SAMPLE DATA FOR DEVELOPMENT
async function createSampleData() {
  if (process.env.NODE_ENV === 'development') {
    console.log('🎨 Creating sample development data...');
    
    // Create a sample admin user
    try {
      await db.user.upsert({
        where: { email: 'admin@wdt.com' },
        update: {},
        create: {
          email: 'admin@wdt.com',
          name: 'WDT Admin',
          role: 'ADMIN',
          profile: {
            create: {
              company: 'WDT Technologies',
              jobTitle: 'System Administrator'
            }
          }
        }
      });
      console.log('✅ Sample admin user created');
    } catch (error) {
      console.log('ℹ️  Sample admin user already exists or creation skipped');
    }
    
    // Create sample email accounts
    try {
      await db.emailAccount.upsert({
        where: { email: 'demo@wdt.com' },
        update: {},
        create: {
          email: 'demo@wdt.com',
          provider: 'gmail',
          userId: (await db.user.findUnique({ where: { email: 'admin@wdt.com' } }))?.id
        }
      });
      console.log('✅ Sample email account created');
    } catch (error) {
      console.log('ℹ️  Sample email account creation skipped');
    }
  }
}

// 🟡 SECTION: DIRECT EXECUTION HANDLER (ES6 compatible)
const isDirectExecution = import.meta.url === `file://${process.argv[1]}`;

if (isDirectExecution) {
  initializeDevelopmentDatabase()
}

export { initializeDevelopmentDatabase, createDefaultPermissions, createDefaultSystemConfig, performHealthCheck }