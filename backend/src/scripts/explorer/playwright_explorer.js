#!/usr/bin/env node
// Minimal Playwright explorer with legal checks
// Usage: node playwright_explorer.js <url> <outDir>
// Requirements: `npm i playwright` in the environment used by the agent or CI.

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const urlModule = require('url');

async function fetchRobotsTxt(baseUrl) {
  try {
    const robotsUrl = new urlModule.URL('/robots.txt', baseUrl).toString();
    const res = await fetch(robotsUrl);
    if (!res.ok) return null;
    return await res.text();
  } catch (err) {
    return null;
  }
}

async function explore(url, outDir) {
  await fs.promises.mkdir(outDir, { recursive: true });

  // record metadata
  const meta = { target: url, startedAt: new Date().toISOString() };
  await fs.promises.writeFile(path.join(outDir, 'meta.json'), JSON.stringify(meta, null, 2));

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const requests = [];
  page.on('request', request => {
    requests.push({
      url: request.url(),
      method: request.method(),
      headers: request.headers(),
      resourceType: request.resourceType(),
    });
  });

  const responses = [];
  page.on('response', async response => {
    try {
      const r = {
        url: response.url(),
        status: response.status(),
        headers: response.headers(),
      };
      const ct = (response.headers()['content-type'] || '');
      if (ct.includes('application/json') || ct.startsWith('text/') || ct.includes('html')) {
        try {
          r.body = await response.text();
        } catch (err) {
          r.body = '<binary or unreadable content>';
        }
      }
      responses.push(r);
    } catch (err) {
      console.error('response read error', err.message);
    }
  });

  page.on('console', msg => {
    fs.appendFileSync(path.join(outDir, 'console.log'), new Date().toISOString() + ' ' + msg.text() + '\n');
  });

  console.log('navigating to', url);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });

  const html = await page.content();
  await fs.promises.writeFile(path.join(outDir, 'page.html'), html, 'utf8');
  await fs.promises.writeFile(path.join(outDir, 'requests.json'), JSON.stringify(requests, null, 2), 'utf8');
  await fs.promises.writeFile(path.join(outDir, 'responses.json'), JSON.stringify(responses, null, 2), 'utf8');

  await browser.close();
  meta.finishedAt = new Date().toISOString();
  await fs.promises.writeFile(path.join(outDir, 'meta.json'), JSON.stringify(meta, null, 2));

  console.log('exploration complete. output:', outDir);
}

if (require.main === module) {
  const url = process.argv[2];
  const outDir = process.argv[3] || path.join(__dirname, 'output');
  if (!url) {
    console.error('Usage: node playwright_explorer.js <url> [outDir]');
    process.exit(2);
  }
  explore(url, outDir).catch(err => {
    console.error('explorer error', err);
    process.exit(1);
  });
}
