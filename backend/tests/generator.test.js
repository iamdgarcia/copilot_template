const fs = require('fs');
const path = require('path');

const samplePath = path.join(__dirname, 'fixtures', 'explorer_sample.json');

describe('Artifact Generator (TDD)', () => {
  const tmpOut = path.join(__dirname, '..', '..', 'generated_test');

  beforeAll(async () => {
    if (fs.existsSync(tmpOut)) fs.rmSync(tmpOut, { recursive: true, force: true });
    fs.mkdirSync(tmpOut, { recursive: true });
  });

  afterAll(() => {
    // keep generated_test for inspection
  });

  test('generator should consume analyzer output and write backend and frontend scaffold', async () => {
    const analyzer = require('../src/analyzer');
    const generator = require('../src/generator');
    const sample = JSON.parse(fs.readFileSync(samplePath, 'utf8'));

    // First run analyzer to produce schema outputs into tmpOut
    await analyzer.run({ pages: sample.pages }, { outDir: tmpOut });

    // Now run generator which should read analyzer outputs and produce scaffold
    await expect(generator.run({ analyzerDir: tmpOut }, { outDir: tmpOut })).resolves.toBeUndefined();

    // Assertions
    const backendIndex = path.join(tmpOut, 'backend', 'index.js');
    const frontendIndex = path.join(tmpOut, 'frontend', 'index.html');
    const prismaPath = path.join(tmpOut, 'schema.prisma');

    expect(fs.existsSync(backendIndex)).toBe(true);
    expect(fs.existsSync(frontendIndex)).toBe(true);
    expect(fs.existsSync(prismaPath)).toBe(true);

    const backendContent = fs.readFileSync(backendIndex, 'utf8');
    expect(backendContent).toMatch(/express/);

    const frontendContent = fs.readFileSync(frontendIndex, 'utf8');
    expect(frontendContent).toMatch(/<html/);
  });
});
