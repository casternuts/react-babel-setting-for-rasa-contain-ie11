const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",

  output: {
    library: "mymodule",
    libraryTarget: "umd"
  },
  devtool: "",

  /* 이 부분은 entry와 output의 기본값으로 생략 가능합니다.
    entry: './src/index.js',
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    }, */
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,

        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-transform-arrow-functions",
              [
                "module-resolver",
                {
                  root: ["./src"],
                  alias: {
                    constants: "./src/constants.js",
                    assets: "./assets",
                    actions: "./src/store/actions",
                    helper: "./src/store/reducers/helper.js",
                    messagesComponents:
                      "./src/components/Widget/components/Conversation/components/Messages/components"
                  }
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              sassOptions: {
                includePaths: [path.resolve(__dirname, "src/components/scss/")]
              },
              implementation: require("sass")
            }
          }
        ]
      },
      // {
      //   test: /\.(jpg|png)$/,
      //   use: {
      //     loader: "file-loader"
      //   }
      // },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: {
          loader: "url-loader"
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "./dist/"),
    port: 9000
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    })
  ]
};
