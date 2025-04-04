import { FlatCompat } from '@eslint/eslintrc'
import prettier from 'eslint-plugin-prettier'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      prettier: prettier,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'prettier/prettier': [
        'error',
        {
          plugins: ['prettier-plugin-tailwindcss'],
          printWidth: 80,
          tabWidth: 2,
          singleQuote: true,
          trailingComma: 'all',
          arrowParens: 'always',
          semi: false,
          endOfLine: 'auto',
        },
      ],
      'no-empty-object-type': 'off',
    },
  },
]

export default eslintConfig
