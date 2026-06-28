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
 * @param {string} tag
 */
function specUpdater(content, tag) {
  if (!content || !tag) throw new Error('Invalid content or tag');
  const lines = content.split('\n');

  let upstreamIdx = lines.findIndex((v) => v.startsWith('%global             upstream_tag '));
  const upstreamLine = `%global             upstream_tag ${tag}`;
  if (upstreamIdx >= 0) {
    lines[upstreamIdx] = upstreamLine;
  } else {
    const debugIdx = lines.findIndex((v) => v.startsWith('%global             debug_package '));
    const insertAt = debugIdx >= 0 ? debugIdx + 1 : 0;
    lines.splice(insertAt, 0, upstreamLine);
  }
  
  const versionIndex = lines.findIndex((v) => v.startsWith('Version:'));
  if (versionIndex < 0) throw new Error('Failed to parse version line from spec file');

  const rpmVersion = toRpmVersion(tag);
  const currentVersion = lines[versionIndex].replace(/^Version:\s*/, '').trim();

  if (currentVersion !== rpmVersion) {
    const releaseIndex = lines.findIndex((v) => v.startsWith('Release:'));
    if (releaseIndex < 0) throw new Error('Failed to parse release from spec file');
    lines[releaseIndex] = `Release:${whiteSpaces(12)}1%{?dist}`;
  }

  lines[versionIndex] = `Version:${whiteSpaces(12)}${rpmVersion}`;
  return lines.join('\n');
}
