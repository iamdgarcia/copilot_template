const fs = require('fs');
const path = require('path');

const samplePath = path.join(__dirname, 'fixtures', 'explorer_sample.json');
const generatedDir = path.join(__dirname, '..', '..', 'generated');

describe('Analyzer (TDD)', () => {
  beforeAll(() => {
    // ensure generated dir is clean
    if (fs.existsSync(generatedDir)) {
      fs.rmSync(generatedDir, { recursive: true, force: true });
    }
  });

  test('analyzer should read explorer output and write schema.json and schema.prisma', async () => {
    const analyzer = require('../src/analyzer');
    const sample = JSON.parse(fs.readFileSync(samplePath, 'utf8'));

    await expect(analyzer.run({ pages: sample.pages }, { outDir: generatedDir })).resolves.toBeUndefined();

    const schemaJsonPath = path.join(generatedDir, 'schema.json');
    const prismaPath = path.join(generatedDir, 'schema.prisma');

    expect(fs.existsSync(schemaJsonPath)).toBe(true);
    expect(fs.existsSync(prismaPath)).toBe(true);

    const schemaJson = JSON.parse(fs.readFileSync(schemaJsonPath, 'utf8'));
    expect(schemaJson).toHaveProperty('/api/items');
    expect(schemaJson['/api/items']).toHaveProperty('responseSample');

    const prisma = fs.readFileSync(prismaPath, 'utf8');
    expect(prisma).toMatch(/model Item/);
  });
});
