module.exports = {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      'react-native-reanimated/plugin', // React Native Reanimated plugin (ensure it's installed)
      [
        'module-resolver', // Module resolver plugin for custom path resolution
        {
          root: ['./'], // Root of your project for module resolution
          alias: {
            '@config': './config', // Aliasing the 'config' folder
          },
        },
      ],
    ],
  };
  