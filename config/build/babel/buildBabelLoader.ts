import {BuildOptions} from "../types/types";
import {removeDataTestPlugin} from "./plugins/removeDataTestPlugin";

export function buildBabelLoader({mode}: BuildOptions){
  const isDev = mode === 'development'

  const plugins = [];
  if (!isDev) {
    plugins.push([
      removeDataTestPlugin,
      {
        props: ['data-testid']
      }
    ])
  }

  return {
    test: /\.tsx$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: ['@babel/preset-env',
          '@babel/preset-typescript',
          ['@babel/preset-react', {
            runtime: isDev ? 'automatic' : 'classic'
          }]
        ],
        plugins: plugins.length ? plugins : undefined,
      }
    }
  }
}
