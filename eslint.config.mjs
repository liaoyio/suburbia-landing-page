import antfu from '@antfu/eslint-config'

export default antfu({
  extends: ['next/core-web-vitals', 'next/typescript'],
  react: true,
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
})
