import fs from 'node:fs';
import path from 'node:path';

export type PlaceholderKind = 'service' | 'project' | 'avatar' | 'logoMark';

const placeholderPaths: Record<PlaceholderKind, string> = {
  service: '/assets/images/placeholders/service-placeholder.svg',
  project: '/assets/images/placeholders/project-placeholder.svg',
  avatar: '/assets/images/placeholders/avatar-placeholder.svg',
  logoMark: '/assets/images/placeholders/logo-mark-placeholder.svg',
};

function publicPathToFsPath(publicPath: string): string {
  const normalized = publicPath.startsWith('/') ? publicPath.slice(1) : publicPath;
  return path.join(process.cwd(), 'public', normalized);
}

export function assetExists(publicPath: string): boolean {
  try {
    return fs.existsSync(publicPathToFsPath(publicPath));
  } catch {
    return false;
  }
}

/**
 * Return the configured asset path if it exists in `/public`, otherwise fall back
 * to the appropriate placeholder SVG.
 */
export function resolvePublicImage(
  configuredPath: string | undefined | null,
  kind: PlaceholderKind,
): string {
  if (configuredPath && assetExists(configuredPath)) return configuredPath;
  return placeholderPaths[kind];
}

