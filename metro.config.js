const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// @javierkonpo/design-system is installed as a symlink (file: reference) pointing
// to a directory outside this project root. Add the real path to watchFolders so
// Metro can hash and watch those files.
const dsRealPath = path.resolve(
  __dirname,
  '../ComPsych-Design-System/packages/design-system',
);

// @compsych/mobile-ui lives inside this repo under packages/mobile-ui.
const mobileUiPath = path.resolve(__dirname, 'packages/mobile-ui');

config.watchFolders = [
  ...(config.watchFolders ?? []),
  dsRealPath,
  mobileUiPath,
];

// Metro doesn't support wildcard subpath exports (e.g. "./themes/*").
// This custom resolver maps @javierkonpo/design-system/themes/<name>
// directly to the .ts file on disk via the real (non-symlink) path.
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith('@javierkonpo/design-system/themes/')) {
    const themeName = moduleName.replace('@javierkonpo/design-system/themes/', '');
    const filePath = path.resolve(dsRealPath, 'themes', `${themeName}.ts`);
    return { filePath, type: 'sourceFile' };
  }
  return context.resolveRequest(context, moduleName, platform);
};

// Transform @javierkonpo and @compsych packages so Metro can process the
// TypeScript source files they distribute.
config.transformer.transformIgnorePatterns = [
  'node_modules/(?!((jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?(/.*)?|@expo-google-fonts(/.*)?|react-navigation|@react-navigation(/.*)?|@unimodules(/.*)?|sentry-expo|native-base|react-native-svg|@javierkonpo(/.*)?|@compsych(/.*)?))',
];

module.exports = config;
