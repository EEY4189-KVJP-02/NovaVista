// Script to fix/reset admin user password
// Run with: node Backend/database/fix-admin.js

import { sequelize } from '../config/db.js';
import User from '../models/User.js';

const fixAdminUser = async () => {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.');

    const adminEmail = 'admin@gmail.com';
    let admin = await User.findOne({ where: { email: adminEmail } });

    if (!admin) {
      // Create admin user if it doesn't exist
      admin = await User.create({
        username: 'admin',
        email: adminEmail,
        password: 'admin123', // Will be hashed by beforeCreate hook
        role: 'admin',
        firstName: 'Admin',
        lastName: 'User',
      });
      console.log('Admin user created: admin@gmail.com / admin123');
    } else {
      // Reset password
      admin.password = 'admin123'; // Will be hashed by beforeUpdate hook
      await admin.save();
      console.log('Admin password reset to: admin123');
      console.log('Admin user details:');
      console.log('  Email:', admin.email);
      console.log('  Username:', admin.username);
      console.log('  Role:', admin.role);
    }

    // Verify the password works
    const testPassword = await admin.comparePassword('admin123');
    if (testPassword) {
      console.log('✓ Password verification successful!');
    } else {
      console.log('✗ Password verification failed!');
    }

    console.log('Admin user fix completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error fixing admin user:', error);
    process.exit(1);
  }
};

fixAdminUser();
