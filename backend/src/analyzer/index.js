const fs = require('fs');
const path = require('path');

function inferSchemaFromObject(obj) {
  // Very small inference: record types of top-level properties
  const schema = {};
  if (Array.isArray(obj)) return { type: 'array', items: inferSchemaFromObject(obj[0] || {}) };
  if (obj === null || typeof obj !== 'object') return { type: typeof obj };
  for (const key of Object.keys(obj)) {
    const val = obj[key];
    if (Array.isArray(val)) {
      schema[key] = { type: 'array', items: inferSchemaFromObject(val[0] || {}) };
    } else if (val === null) {
      schema[key] = { type: 'null' };
    } else if (typeof val === 'object') {
      schema[key] = { type: 'object', properties: inferSchemaFromObject(val) };
    } else {
      schema[key] = { type: typeof val };
    }
  }
  return schema;
}

async function run(pagesOrObj, opts) {
  const pages = Array.isArray(pagesOrObj) ? pagesOrObj : (pagesOrObj && pagesOrObj.pages) ? pagesOrObj.pages : [];
  const outDir = opts && opts.outDir ? opts.outDir : path.join(process.cwd(), 'generated');
  await fs.promises.mkdir(outDir, { recursive: true });

  const schema = {};
  for (const page of pages) {
    if (!page.requests) continue;
    for (const req of page.requests) {
      const url = new URL(req.url);
      const route = url.pathname;
      if (req.response && req.response.headers && req.response.headers['content-type'] && req.response.headers['content-type'].includes('application/json')) {
        const body = req.response.body;
        schema[route] = schema[route] || {};
        schema[route].responseSample = body;
        schema[route].responseSchema = inferSchemaFromObject(body);
      } else if (req.response && req.response.body && typeof req.response.body === 'object') {
        // fallback
        const body = req.response.body;
        schema[route] = schema[route] || {};
        schema[route].responseSample = body;
        schema[route].responseSchema = inferSchemaFromObject(body);
      }
    }
  }

  const schemaJsonPath = path.join(outDir, 'schema.json');
  await fs.promises.writeFile(schemaJsonPath, JSON.stringify(schema, null, 2), 'utf8');

  // Generate a minimal Prisma schema: create a model for the first array item if present
  let prisma = `generator client {\n  provider = \"prisma-client-js\"\n}\n\n`; 
  prisma += `datasource db {\n  provider = \"sqlite\"\n  url = \"file:./dev.db\"\n}\n\n`;

  // Find a likely model
  let modelGenerated = false;
  for (const route of Object.keys(schema)) {
    const sample = schema[route].responseSample;
    // If sample has an array of items: items -> [{id,name}]
    if (sample && typeof sample === 'object') {
      let arr = null;
      if (Array.isArray(sample)) arr = sample;
      else {
        // check common wrappers
        for (const k of ['items', 'data', 'results']) {
          if (Array.isArray(sample[k])) arr = sample[k];
        }
      }
      if (arr && arr.length > 0 && typeof arr[0] === 'object') {
        const fields = Object.keys(arr[0]);
        prisma += `model Item {\n  id   Int    @id @default(autoincrement())\n`;
        for (const f of fields) {
          if (f === 'id') continue;
          const t = typeof arr[0][f];
          const ptype = t === 'number' ? 'Int' : 'String';
          prisma += `  ${f}  ${ptype}\n`;
        }
        prisma += `}\n`;
        modelGenerated = true;
        break;
      }
    }
  }

  if (!modelGenerated) {
    prisma += `model Item {\n  id   Int    @id @default(autoincrement())\n  name String\n}\n`;
  }

  const prismaPath = path.join(outDir, 'schema.prisma');
  await fs.promises.writeFile(prismaPath, prisma, 'utf8');
}

module.exports = { run };
