import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
  unocss: true,
  ignores: [
    '.nuxt',
    '.output',
    'node_modules',
    'dist',
  ],
  stylistic: true,
})
