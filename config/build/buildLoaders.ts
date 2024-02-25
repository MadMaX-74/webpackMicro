import {ModuleOptions} from 'webpack';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import ReactRefreshTypeScript from 'react-refresh-typescript'
import {buildBabelLoader} from "./babel/buildBabelLoader";
export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  const isDev = options.mode === 'development';

  const imagesLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: 'asset/resource',
  }

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true
                }
              }
            ]
          }
        }
      }
    ]
  }


  const cssLoadersWithModules = {
      loader: "css-loader",
      options: {
        modules: {
          localIdentName: isDev ? '[path][name]__[local] ' : '[hash:base64:8]'
        },
      },
    }

  const cssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` to css file
      options.mode ? 'style-loader' : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      cssLoadersWithModules,
      // Compiles Sass to CSS
      "sass-loader",
    ],
  }
  // const  tsLoader = {
  //   test: /\.tsx?$/,
  //   use: [
  //     {
  //       loader: 'ts-loader',
  //       options: {
  //         transpileOnly: isDev
  //       }
  //     }
  //   ],
  //   exclude: /node_modules/
  // }
  const babelLoader = buildBabelLoader(options)
  return [
    imagesLoader,
    svgrLoader,
    cssLoader,
    babelLoader,
  ]
}
