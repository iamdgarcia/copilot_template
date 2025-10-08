// Serverless-friendly Prisma client pattern
// Use this file to import a single Prisma client instance in serverless functions

const { PrismaClient } = require('@prisma/client');

let prisma;
if (!global.__prisma) {
  global.__prisma = new PrismaClient();
}
prisma = global.__prisma;

module.exports = prisma;
