module.exports = {
  exclude: /node_modules/,
  presets: [
    [
      "@babel/preset-env",
      {
        corejs: "3",
        useBuiltIns: "usage"
      }
    ]
  ],
  plugins: [
    [
      "@babel/plugin-transform-spread",
      {
        loose: false
      }
    ]
  ],
  env: {
    test: {
      presets: [
        [
          "@babel/preset-env",
          {
            useBuiltIns: "usage"
          }
        ]
      ],
      plugins: [
        "@babel/plugin-transform-runtime",
        [
          "@babel/plugin-transform-spread",
          {
            loose: false
          }
        ]
      ]
    }
  }
};
