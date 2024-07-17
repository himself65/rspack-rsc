import {
  rspack
} from '@rspack/core'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const entry = './src/root.tsx'

console.log('entry file', entry)

// step 1: analyze files if server or client file
const compiler = rspack(
  {
    entry: {
      main: {
        import: entry,
        asyncChunks: true,
        chunkLoading: 'async-node'
      }
    },
    experiments: {
      outputModule: true
    },
    mode: 'development',
    target: 'es2022',
    output: {
      filename: 'server-analysis.js'
    },
    resolveLoader: {
      conditionNames: ['react-server', 'loader', 'require', 'node'],
      exportsFields: ['exports'],
      mainFields: ['loader', 'main'],
      extensions: ['.js'],
      mainFiles: ['index']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: [/node_modules/],
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              transform: {
                react: {
                  runtime: 'automatic'
                }
              },
              parser: {
                syntax: 'typescript'
              }
            }
          },
          type: 'javascript/auto'
        }
      ]
    }
  }
)

compiler.run((err, stats) => {
  if (err) {
    console.error(err)
    return
  }

  console.log(stats)
})

// step 2: parse server side into node server entry
// step 3: parse client side into browser entry
// step 4: generate output files
