import {
  MultiRspackOptions,
  rspack
} from '@rspack/core'

const entry = './tests/fixtures/root.tsx'

console.log('entry file', entry)

const compiler = rspack(
  [
    {
      entry,
      mode: 'development',
      output: { filename: 'server.js' },
      resolve: {
        conditionNames: ['react-server']
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
    },
    {
      entry,
      mode: 'development',
      output: { filename: 'client.js' },
      resolve: {
        conditionNames: []
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
  ] satisfies MultiRspackOptions
)

compiler.run((error, result) => {
  if (error) {
    console.error(error)
  }
  console.log(result)
})