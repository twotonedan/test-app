const { omit } = require('lodash');
const { i18n } = require('./next-i18next.config');

const withBundleAnalyzer =
  process.env.NODE_ENV === 'development'
    ? require('@next/bundle-analyzer')({
        enabled: process.env.ANALYZE === 'true',
      })
    : v => v;

/** @type {import('next').NextConfig} */
const nextConfig = withBundleAnalyzer({
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  i18n: omit(i18n, ['localePath']),
  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}',
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  experimental: {
    scrollRestoration: true,
  },
  transpilePackages: ['use-query-params'],
  styledComponents: true
});

module.exports = nextConfig;
