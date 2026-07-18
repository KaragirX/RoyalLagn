const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add .cjs and .mjs so nanoid/non-secure resolves correctly
config.resolver.sourceExts = [
  ...new Set(['mjs', 'cjs', ...config.resolver.sourceExts]),
];

module.exports = withNativeWind(config, { input: './global.css' });
