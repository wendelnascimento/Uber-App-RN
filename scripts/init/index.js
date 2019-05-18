const { execSync } = require('child_process');
const colors = require('colors');
const versionBetween = require('./versionBetween');

const isMacOs = process.platform === 'darwin';
const isWindows = process.platform === 'win32';
const isLinux = ['freebsd', 'linux', 'openbsd'].some(function (item) {
  return item === process.platform;
});

if (isLinux) {
  console.log(colors.red('\nLinux is not supported yet.\n'));
  process.exit(1);
}

// Check node version
const nodeVersion = process.version;

if (!versionBetween(nodeVersion, '8.3.0')) {
  console.log(colors.red(`\nThe node version should between 8.3.0 and *. Current version: ${nodeVersion}\n`));
  process.exit(1);
}

// Check jdk version
try {
  const jdkVersionInfo = execSync('java -version 2>&1 | awk \'NR==1{print $3}\'')
    .toString()
    .replace(/"/g, '');
  const matches = jdkVersionInfo.match(/^1\.(\d+)(.\d+)?.*/) || jdkVersionInfo.match(/^(\d+)(.\d+)?(.\d+)?.*/);
  let jdkVersion = '0';

  if (matches) {
    jdkVersion = matches[1] + (matches[2] || '') + (matches[3] || '');
  }

  if (!versionBetween(jdkVersion, '8.0.0', '8.99.99')) {
    console.log(colors.red(`\nThe jdk version should between 8.0.0 and 8.99.99. Current version: ${jdkVersionInfo}\n`));
    process.exit(1);
  }
} catch (e) {
  console.log(colors.red(e.message || e));
  console.log([
    '',
    colors.yellow('If you didn\'t install jdk, Visit this site and download jdk: https://www.oracle.com/technetwork/java/javase/downloads/index.html'),
    '',
  ].join('\n'));
  process.exit(1);
}

if (isMacOs) {
  let xcodeVersion = execSync('xcodebuild -version 2>&1 | awk \'NR==1{print $2}\'').toString().replace(/\n/g, '');
  xcodeVersion = Number.parseFloat(xcodeVersion);

  if (Number.isNaN(xcodeVersion)) {
    console.log(colors.red(`\nUnknown xcode version. Are you sure xcode is installed?\n`));
    process.exit(1);
  }

  if (!versionBetween(String(xcodeVersion), '9.4.0', '*')) {
    console.log(colors.red(`\nThe xcode version should between 9.4.0 and *. Current version: ${xcodeVersion}\n`));
    process.exit(1);
  }
}

try {
  console.log('Checking yarn version...');
  execSync('yarn -version', {
    stdio: 'inherit',
  });
} catch (e) {
  console.log(colors.red(e.message || e));
  process.exit(1);
}

// Your team should use the same tool to install packages.
// That dependencies on the project creator.
execSync('yarn install', {
  stdio: 'inherit',
});

if (isMacOs) {
  console.log('Installing watchman...');
  execSync('sh scripts/init/watchman.sh', {
    stdio: 'inherit',
  });
}

if (isMacOs) {
  execSync('sh scripts/init/setEnv.sh', {
    stdio: 'inherit',
  });
}

if (isMacOs) {
  execSync('sh scripts/init/sdkManager.sh', {
    stdio: 'inherit',
  });
}
