module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          removeTitle: false,
          removeViewBox: false,
        },
      },
    },
    'removeDimensions',
    'prefixIds',
  ],
};
