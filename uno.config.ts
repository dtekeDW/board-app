import { defineConfig, presetUno, presetTypography, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetTypography()
  ],
  shortcuts: {
    'card-base': 'rounded-xl border border-gray-200/70 bg-white shadow-sm transition-shadow hover:shadow-md',
    'column-surface': 'rounded-2xl bg-gray-50 border border-gray-200',
    'pill': 'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium'
  }
})

