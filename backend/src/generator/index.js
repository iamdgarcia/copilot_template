const fs = require('fs');
const path = require('path');

async function run(opts, args) {
  const analyzerDir = opts && opts.analyzerDir ? opts.analyzerDir : path.join(process.cwd(), 'generated');
  const outDir = args && args.outDir ? args.outDir : path.join(process.cwd(), 'generated');
  await fs.promises.mkdir(outDir, { recursive: true });

  const schemaJsonPath = path.join(analyzerDir, 'schema.json');
  const prismaPath = path.join(analyzerDir, 'schema.prisma');

  let schema = {};
  if (fs.existsSync(schemaJsonPath)) {
    schema = JSON.parse(fs.readFileSync(schemaJsonPath, 'utf8'));
  }

  // Create backend scaffold
  const backendDir = path.join(outDir, 'backend');
  await fs.promises.mkdir(backendDir, { recursive: true });

  const backendIndex = `const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => res.json({ status: 'ok' }));\n\n// Stubbed endpoints from recorded schema\n`;

  let endpoints = '';
  for (const route of Object.keys(schema)) {
    const sample = schema[route].responseSample;
    endpoints += `app.get('${route}', (req, res) => res.json(${JSON.stringify(sample)}));\n`;
  }

  const backendContent = backendIndex + endpoints + "\nmodule.exports = app;\n";
  await fs.promises.writeFile(path.join(backendDir, 'index.js'), backendContent, 'utf8');

  // Create frontend scaffold
  const frontendDir = path.join(outDir, 'frontend');
  await fs.promises.mkdir(frontendDir, { recursive: true });
  const frontendHtml = `<!doctype html>\n<html><head><meta charset=\"utf-8\"><title>Generated App</title></head><body><h1>Generated App</h1></body></html>`;
  await fs.promises.writeFile(path.join(frontendDir, 'index.html'), frontendHtml, 'utf8');

  // Copy prisma schema if present
  if (fs.existsSync(prismaPath)) {
    await fs.promises.copyFile(prismaPath, path.join(outDir, 'schema.prisma'));
  }
}

module.exports = { run };
