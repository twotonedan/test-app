/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "\\.(png|jpg|ico|jpeg|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/.jest/__mock__/imageMock.js",
    '\\.(css|less)$': '<rootDir>/.jest/__mock__/cssMock.js',
    '^swiper/css/(.*)$': '<rootDir>/.jest/__mock__/cssMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@public/(.*)$': '<rootDir>/public/$1',
  },
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "^.+\\.[tj]s$": "ts-jest",
    "^.+\\.(css|less|scss)$": "jest-transform-css",
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.test.json'
    }
  }
};