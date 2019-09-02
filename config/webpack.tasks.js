const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");
const WebpackMonitor = require("webpack-monitor");
const ImageminPlugin = require("imagemin-webpack");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const StyleLintPlugin = require("stylelint-webpack-plugin");

exports.purifyCSS = ({ paths }) => ({
  plugins: [new PurgecssPlugin({ paths })]
});

exports.minifyJavaScript = () => ({
  optimization: {
    minimizer: [new TerserPlugin({ sourceMap: true })]
  }
});

exports.clean = () => ({
  plugins: [new CleanWebpackPlugin()]
});

exports.monitor = () => ({
  plugins: [
    new WebpackMonitor({
      target: "./stats.json",
      launch: true
    })
  ]
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type
});

exports.lintSass = () => ({
  plugins: [new StyleLintPlugin()]
});

exports.lintJavaScript = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "eslint-loader"
      }
    ]
  }
});

exports.loadJavaScript = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      }
    ]
  }
});

exports.extractCSS = isEnvDevelopment => {
  const plugin = new MiniCssExtractPlugin({
    filename: isEnvDevelopment ? "[name].css" : "[name]-[contenthash].css"
  });

  return {
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: (resourcePath, context) => {
                  // publicPath is the relative path of the resource to the context
                  // e.g. for ./css/admin/main.css the publicPath will be ../../
                  // while for ./css/main.css the publicPath will be ../
                  return (
                    path.relative(path.dirname(resourcePath), context) + "/"
                  );
                }
              }
            },
            {
              loader: "css-loader",
              options: {
                url: false,
                importLoaders: 3
              }
            },
            {
              loader: "resolve-url-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [require("autoprefixer")()]
              }
            },
            { loader: "resolve-url-loader" },
            {
              loader: "sass-loader"
            }
          ]
        }
      ]
    },
    plugins: [plugin]
  };
};

exports.loadImages = isEnvDevelopment => ({
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: {
          loader: "file-loader",
          options: {
            name: isEnvDevelopment
              ? "[path][name].[ext]"
              : "[path][name]-[contenthash].[ext]",
            context: path.resolve(__dirname, "src/main/web"),
            useRelativePaths: true
          }
        }
      }
    ]
  },
  plugins: [
    new ImageminPlugin({
      bail: false,
      cache: true,
      imageminOptions: {
        plugins: [
          ["gifsicle", { interlaced: true }],
          ["jpegtran", { progressive: true }],
          ["optipng", { optimizationLevel: 5 }],
          [
            "svgo",
            {
              plugins: [
                { removeTitle: true },
                { removeDesc: true },
                { removeViewBox: false }
              ]
            }
          ]
        ]
      }
    })
  ]
});

exports.loadFonts = isEnvDevelopment => ({
  module: {
    rules: [
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: isEnvDevelopment
              ? "fonts/[name].[ext]"
              : "fonts/[name]-[contenthash].[ext]",
            context: path.resolve(__dirname, "src/main/web"),
            useRelativePaths: true
          }
        }
      }
    ]
  }
});

exports.minifyCSS = () => ({
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: {
        options: {
          discardComments: {
            removeAll: true
          },
          safe: true
        }
      },
      canPrint: false
    })
  ]
});
