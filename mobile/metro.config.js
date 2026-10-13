const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);
const core = path.resolve(__dirname, '../packages/core');

// Comparte el núcleo (@cumbre/core) con la web sin publicarlo como paquete.
config.watchFolders = [core];
config.resolver.extraNodeModules = { '@cumbre/core': path.join(core, 'src') };

module.exports = config;
