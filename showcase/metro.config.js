const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const libraryRoot = path.resolve(projectRoot, '..');

const config = getDefaultConfig(projectRoot);

// Watch the parent library src so changes reflect immediately
config.watchFolders = [libraryRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(libraryRoot, 'node_modules'),
];

// Resolve @compsych/mobile-ui to local src instead of npm
config.resolver.extraNodeModules = {
  '@compsych/mobile-ui': path.resolve(libraryRoot, 'src'),
};

module.exports = config;
