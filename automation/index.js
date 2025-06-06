import fetch from 'node-fetch';
import path from 'node:path';
import fs from 'node:fs/promises';

/**
 *
 * @param {number} amount
 * @returns {string}
 */
function whiteSpaces(amount) {
  let spaces = [];
  for (let i = 0; i < amount; i++) spaces.push(' ');
  return spaces.join('');
}

const downloadUrl = await fetch(
  'https://api.github.com/repos/NetworkNeighborhood/Marble/releases/latest',
  {
    compress: true,
    redirect: 'manual',
  },
).then((res) => res.json()).then((data) => data.tag_name);
if (!downloadUrl) throw new Error('Failed to fetch download URL');

const version = downloadUrl;

const specFile = await fs.readFile('../marble.spec', 'utf8');

/**
 *
 * @param {string} content
 * @param {string} version
 */
function specUpdater(content, version) {
  if (!content || !version) throw new Error('Invalid content or version');
  const lines = content.split('\n');
  const versionIndex = lines.findIndex((val) => val.startsWith('Version:'));
  if (versionIndex < 0) throw new Error('Failed to parse version line from spec file');
  const specVersion = lines[versionIndex].match(/\d.*$/);
  if (specVersion == null) throw new Error('Failed to parse version from spec file');
  if (version != specVersion) {
    const releaseIndex = lines.findIndex((val) => val.startsWith('Release:'));
    if (releaseIndex < 0) throw new Error('Failed to parse release from spec file');
    lines[releaseIndex] = `Release:${whiteSpaces(12)}1%{?dist}`
  }
  lines[versionIndex] = `Version:${whiteSpaces(12)}${version}`;
  return lines.join('\n');
}

await fs.writeFile(
  '../marble.spec',
  specUpdater(specFile, version),
);
