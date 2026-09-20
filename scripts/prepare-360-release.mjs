import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, 'dist');
const releaseRoot = path.join(projectRoot, '.release', '360-site');
const required = [
  ['products', '360-feedback'],
  ['astro-360-assets'],
];

await rm(releaseRoot, { recursive: true, force: true });
await mkdir(releaseRoot, { recursive: true });

for (const parts of required) {
  const source = path.join(distRoot, ...parts);
  const destination = path.join(releaseRoot, ...parts);
  await cp(source, destination, { recursive: true });
}

const files = [];
async function walk(directory) {
  for (const entry of await readdir(directory)) {
    const absolute = path.join(directory, entry);
    const info = await stat(absolute);
    if (info.isDirectory()) await walk(absolute);
    else {
      const body = await readFile(absolute);
      files.push({
        path: path.relative(releaseRoot, absolute).split(path.sep).join('/'),
        bytes: info.size,
        sha256: createHash('sha256').update(body).digest('hex'),
      });
    }
  }
}
await walk(releaseRoot);
files.sort((a, b) => a.path.localeCompare(b.path));
await writeFile(path.join(releaseRoot, 'release-manifest.json'), `${JSON.stringify({ files }, null, 2)}\n`);
console.log(`Prepared ${files.length} files in ${releaseRoot}`);
