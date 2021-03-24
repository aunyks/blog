const exportedConfig = {
  plugins: {
    tailwindcss: {},
    'postcss-preset-env': {},
  },
}

if (process.env.NODE_ENV === 'production') {
  exportedConfig['@fullhuman/postcss-purgecss'] = {
    content: [
      './pages/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
    ],
    defaultExtractor: content =>
      content.match(/[\w-/:]+(?<!:)/g) || [],
  }
}

module.exports = exportedConfig