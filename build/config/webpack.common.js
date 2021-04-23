const path = require("path");
const { PROJECT_PATH, isDEV } = require("../constant");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const WebpackBar = require("webpackbar");
const getCssLoaders = () => [
  "style-loader",
  {
    loader: "css-loader",
    options: {
      modules: false,
      sourceMap: false
    }
  },
  //   "postcss-loader"
  {
    loader: "postcss-loader",
    options: {
      //   ident: "postcss",
      postcssOptions: {
        plugins: [["postcss-preset-env"]]
      }
    }
  }
];
module.exports = {
  target: "web",
  entry: {
    app: path.resolve(PROJECT_PATH, "./src/index.tsx")
  },
  output: {
    filename: `js/[name].js`,
    path: path.resolve(PROJECT_PATH, "./dist")
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      "@": resolve(PROJECT_PATH, "./src")
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: getCssLoaders()
      },
      {
        test: /\.less$/,
        use: [
          ...getCssLoaders(),
          {
            loader: "less-loader",
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: [/\.jpg$/, /\.png$/, /\.gif$/],
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: "[name].[contenthash:8].[ext]",
              outputPath: "assets/images"
            }
          }
        ]
      },
      {
        test: [/\.tsx$/, /\.js$/],
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          context: resolve(PROJECT_PATH, "./public"),
          from: "*",
          to: resolve(PROJECT_PATH, "./dist"),
          toType: "dir",
          globOptions: {
            ignore: [
              // Ignore all `txt` files
              "**/*index.html"
            ]
          }
        }
      ]
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_PATH, "./public/index.html"),
      filename: "index.html",
      cache: false
      // favicon: path.resolve(PROJECT_PATH, "./public/favicon.ico")
      //   minify: isDEV
      //     ? false
      //     : {
      //         removeAttributeQuotes: true,
      //         collapseWhitespace: true,
      //         removeComments: true,
      //         collapseBooleanAttributes: true,
      //         collapseInlineTagWhitespace: true,
      //         removeRedundantAttributes: true,
      //         removeScriptTypeAttributes: true,
      //         removeStyleLinkTypeAttributes: true,
      //         minifyCSS: true,
      //         minifyJS: true,
      //         minifyURLs: true,
      //         useShortDoctype: true
      //       }
    }),
    new WebpackBar({
      name: isDEV ? "RUNNING" : "BUILDING",
      color: "#52c41a"
    }),
    new ForkTsCheckerWebpackPlugin({
    
    })
  ]
};
