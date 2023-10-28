const path = require('path');
module.exports = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async config => {
    const imageRule = config.module?.rules?.find(rule => {
      const test = rule.test;

      if (!test) {
        return false;
      }

      return test.test('.svg');
    });

    imageRule.exclude = /\.svg$/;

    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.resolve ||= {};
    config.resolve.fallback ||= {};
    config.resolve.fallback.fs = false;

    return config;
  },
};
