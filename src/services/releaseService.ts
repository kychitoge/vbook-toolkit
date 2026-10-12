// Service lấy thông tin phiên bản mới nhất từ GitHub Releases của vBook theo thời gian thực

export interface AndroidReleaseInfo {
  version: string;
  universalApkUrl: string;
  arm64ApkUrl: string;
  releasePageUrl: string;
}

export interface DesktopReleaseInfo {
  version: string;
  windowsMsiUrl: string;
  windowsPortableUrl: string;
  macDmgUrl: string;
  linuxDebUrl: string;
  linuxRpmUrl: string;
  releasePageUrl: string;
}

export interface OfficialReleases {
  android: AndroidReleaseInfo;
  desktop: DesktopReleaseInfo;
}

export const OFFICIAL_RELEASE_ANDROID_PAGE =
  'https://github.com/Darkrai9x/vbook-settings/releases#release-android';
export const OFFICIAL_RELEASE_DESKTOP_PAGE =
  'https://github.com/Darkrai9x/vbook-settings/releases#release-desktop';

// Trạng thái ban đầu: không gán cứng số phiên bản tĩnh, trỏ trực tiếp đến trang phát hành chính thức
export const INITIAL_RELEASES: OfficialReleases = {
  android: {
    version: '',
    universalApkUrl: OFFICIAL_RELEASE_ANDROID_PAGE,
    arm64ApkUrl: OFFICIAL_RELEASE_ANDROID_PAGE,
    releasePageUrl: OFFICIAL_RELEASE_ANDROID_PAGE,
  },
  desktop: {
    version: '',
    windowsMsiUrl: OFFICIAL_RELEASE_DESKTOP_PAGE,
    windowsPortableUrl: OFFICIAL_RELEASE_DESKTOP_PAGE,
    macDmgUrl: OFFICIAL_RELEASE_DESKTOP_PAGE,
    linuxDebUrl: OFFICIAL_RELEASE_DESKTOP_PAGE,
    linuxRpmUrl: OFFICIAL_RELEASE_DESKTOP_PAGE,
    releasePageUrl: OFFICIAL_RELEASE_DESKTOP_PAGE,
  },
};

export const IOS_APP_STORE_URL =
  'https://apps.apple.com/us/app/vbook-%C4%91%E1%BB%8Dc-truy%E1%BB%87n-s%C3%A1ch/id6808265499';

export const GITHUB_LEGACY_APK_URL =
  'https://raw.githubusercontent.com/Darkrai9x/vbook-settings/refs/heads/main/vBooks.apk';

export const OFFICIAL_SITE_URL = 'https://vbookapp.com/';
export const TELEGRAM_URL = 'https://telegram.me/vbook_beta_up_tracker_chanhnh';
export const DISCORD_URL = 'https://discord.gg/yXFRdG4kJq';
export const GITHUB_REPO_URL = 'https://github.com/Darkrai9x/vbook-settings';

interface GitHubAsset {
  name: string;
  browser_download_url: string;
}

interface GitHubReleaseItem {
  tag_name: string;
  draft?: boolean;
  body?: string;
  assets?: GitHubAsset[];
}

/**
 * Trích xuất phiên bản từ tên file asset, nội dung changelog hoặc tag name
 * (Thuật toán đồng bộ từ vbookapp.com/assets/app.js)
 */
function extractVersionString(assetName: string, body?: string, tagName?: string): string {
  const filenameMatch = assetName.match(/(?:^|[-_.])v?(\d+\.\d+(?:\.\d+){0,2})(?=[-_.]|$)/i);
  const changelogMatch = body ? body.match(/^##\s+v?(\d+\.\d+(?:\.\d+){0,2})\s*$/m) : null;
  const tagMatch = tagName ? tagName.match(/^v?(\d+\.\d+(?:\.\d+){0,2})$/i) : null;
  const match = filenameMatch || changelogMatch || tagMatch;
  return match ? match[1] : '';
}

/**
 * Kiểm tra và phân giải phiên bản mới nhất từ GitHub Releases API theo thời gian thực
 */
export async function fetchLatestReleases(): Promise<OfficialReleases> {
  const result: OfficialReleases = {
    android: { ...INITIAL_RELEASES.android },
    desktop: { ...INITIAL_RELEASES.desktop },
  };

  try {
    const res = await fetch(
      'https://api.github.com/repos/Darkrai9x/vbook-settings/releases?per_page=30',
      {
        headers: { Accept: 'application/vnd.github.v3+json' },
      }
    );

    if (!res.ok) {
      return result;
    }

    const releases: GitHubReleaseItem[] = await res.json();
    if (!Array.isArray(releases) || releases.length === 0) {
      return result;
    }

    let androidFound = false;
    let desktopFound = false;

    for (const rel of releases) {
      if (rel.draft) continue;
      const assets = rel.assets || [];

      // Sắp xếp ưu tiên installer .msi lên trước portable .exe
      const sortedAssets = [...assets].sort(
        (a, b) =>
          Number(b.name.toLowerCase().endsWith('.msi')) -
          Number(a.name.toLowerCase().endsWith('.msi'))
      );

      for (const asset of sortedAssets) {
        const nameLower = asset.name.toLowerCase();

        // 1. Android APK
        if (nameLower.endsWith('.apk')) {
          const v = extractVersionString(asset.name, rel.body, rel.tag_name);
          if (v && !result.android.version) {
            result.android.version = v;
          }

          if (nameLower.includes('arm64-v8a')) {
            result.android.arm64ApkUrl = asset.browser_download_url;
          } else if (!nameLower.includes('arm') && !nameLower.includes('x86') && !androidFound) {
            result.android.universalApkUrl = asset.browser_download_url;
            androidFound = true;
          }
        }

        // 2. Windows (.msi và portable .exe)
        if (nameLower.endsWith('.msi') && !desktopFound) {
          result.desktop.windowsMsiUrl = asset.browser_download_url;
          const v = extractVersionString(asset.name, rel.body, rel.tag_name);
          if (v) {
            result.desktop.version = v;
            desktopFound = true;
          }
        } else if (nameLower.includes('portable') && nameLower.endsWith('.exe')) {
          result.desktop.windowsPortableUrl = asset.browser_download_url;
        }

        // 3. macOS (.dmg)
        if (nameLower.endsWith('.dmg')) {
          result.desktop.macDmgUrl = asset.browser_download_url;
          if (!result.desktop.version) {
            const v = extractVersionString(asset.name, rel.body, rel.tag_name);
            if (v) result.desktop.version = v;
          }
        }

        // 4. Linux (.deb và .rpm)
        if (nameLower.endsWith('.deb')) {
          result.desktop.linuxDebUrl = asset.browser_download_url;
        } else if (nameLower.endsWith('.rpm')) {
          result.desktop.linuxRpmUrl = asset.browser_download_url;
        }
      }
    }
  } catch {
    // Không gán cứng, giữ nguyên link release page chính thức nếu API rate limit
  }

  return result;
}
