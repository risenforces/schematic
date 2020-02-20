import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import strip from '@rollup/plugin-strip'

import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript2'

import { eslint } from 'rollup-plugin-eslint'
import { terser } from 'rollup-plugin-terser'

import pkg from './package.json'

const extensions = ['.ts', '.tsx', '.json']

export default {
  input: 'src',
  output: [
    {
      file: `dist/${pkg.name}.cjs.js`,
      format: 'cjs',
      freeze: false,
      exports: 'named',
    },
    {
      file: `dist/${pkg.name}.esm.js`,
      format: 'esm',
      sourcemap: true,
      freeze: false,
      exports: 'named',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    eslint(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true,
      typescript: require('typescript'),
      tsconfig: 'tsconfig.json',
      tsconfigDefaults: {
        exclude: [
          '**/*.spec.ts',
          '**/*.test.ts',
          '**/*.spec.tsx',
          '**/*.test.tsx',
          'node_modules',
          'bower_components',
          'jspm_packages',
          'dist',
        ],
        compilerOptions: {
          sourceMap: true,
          declaration: true,
          jsx: 'react',
        },
      },
      tsconfigOverride: {
        compilerOptions: {
          target: 'esnext',
        },
      },
    }),
    babel({
      extensions,
      exclude: 'node_modules/**',
    }),
    resolve({
      extensions,
    }),
    strip(),
    commonjs(),
    {
      transform(code) {
        const reg = /^#!(.*)/

        code = code.replace(reg, '')

        return {
          code,
          map: null,
        }
      },
    },
    terser({
      output: {
        comments: false,
      },
      compress: {
        keep_infinity: true,
        pure_getters: true,
        passes: 10,
      },
      mangle: {
        properties: {
          builtins: false,
        },
      },
      ecma: 5,
      warnings: true,
    }),
  ],
}
