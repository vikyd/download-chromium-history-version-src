export const OSList = [
  { val: 'Mac', file: 'chrome-mac.zip' },
  { val: 'Mac_Arm', file: 'chrome-mac.zip' },
  { val: 'Win_x64', file: 'chrome-win.zip' },
  { val: 'Win', file: 'chrome-win32.zip' },
  { val: 'Linux_x64', file: 'chrome-linux.zip' },
  { val: 'Linux', file: 'chrome-linux.zip' },
  { val: 'Android', file: 'chrome-android.zip' },
  // { val: 'Arm', file: 'chrome-linux.zip' },
]

export const DownloadUrl = {
  example:
    'https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html?prefix=Mac/584585/',
  base:
    'https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html?prefix=',
}

export const Links = [
  {
    name: 'Official Version List',
    href: 'https://chromium.googlesource.com/chromium/src/+refs',
  },
  {
    name: 'Official Look Up Page (omahaproxy)',
    href: 'https://omahaproxy.appspot.com/',
  },
  {
    name: 'Official Download Page',
    href:
      'https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html',
  },
]

export const Explains = [
  {
    title: 'Find a version',
    detail: 'use Browser Find, or search below.',
  },
  {
    title: 'Chrome version vs Chromium version',
    detail:
      'MAJOR and MINOR track updates to the Google Chrome stable channel.',
    short: 'Chromium version MAJOR.MINOR is the same as Chrome version',
    href: 'https://www.chromium.org/developers/version-numbers#:~:text=MAJOR%20and%20MINOR%20track%20updates%20to%20the%20Google%20Chrome%20stable%20channel.',
  },
  {
    title: 'Version vs Position',
    detail:
      'Version is what we common see, Position is a `Branch Base Position`',
  },
  {
    title: 'Executable file, like',
    detail:
      'chrome-mac.zip, chrome-win.zip, chrome-win32.zip, chrome-linux.zip, chrome-android.zip ...',
  },
  {
    title: 'How to map a Version to a Position url, steps',
    steps: [
      {
        text: 'get all versions',
        href: 'https://chromium.googlesource.com/chromium/src/+refs',
      },
      {
        text:
          'find a position number by version (there is an api from https://omahaproxy.appspot.com/)',
        href: 'https://omahaproxy.appspot.com/deps.json?version=86.0.4240.63',
      },
      {
        text:
          'loop all positions of the OS(e.g. Mac), find out if exist in step2 data',
        href:
          'https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html?prefix=Mac/',
      },
      {
        text: 'ignore some wrong data',
      },
      {
        text: 'sum all data, produce clickable links in this page',
      },
    ],
  },
  {
    title: 'Resources',
    steps: [
      {
        text: 'Raw JSON files',
        href: 'https://github.com/vikyd/chromium-history-version-position',
      },
      {
        text: 'Current page source code',
        href: 'https://github.com/vikyd/download-chromium-history-version-src',
      },
      {
        text: 'Crawler',
        href: 'https://github.com/vikyd/chromium-history-version-crawler',
      },
      {
        text: 'Crawler Github Actions',
        href:
          'https://github.com/vikyd/chromium-history-version-crawler/actions',
      },
    ],
  },
]
