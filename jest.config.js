module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    globals: {
      'ts-jest': {
        isolatedModules: true, // Optional, speeds up compilation by isolating modules
      },
    },
  };
  