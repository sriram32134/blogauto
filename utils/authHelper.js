const fs = require('fs');
const path = require('path');

/**
 * Authentication Helpers for Global Blog Hub
 */

function getUserCredentials() {
  return {
    email: process.env.USER_EMAIL,
    password: process.env.USER_PASSWORD,
  };
}

function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  };
}

function ensureAuthDirExists() {
  const authDir = path.resolve(__dirname, '../.auth');
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }
}

module.exports = {
  getUserCredentials,
  getAdminCredentials,
  ensureAuthDirExists,
};
