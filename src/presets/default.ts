import { PresetConfig } from './type'

const sizes = [16, 32, 64, 128, 256, 512]

export const defaultPreset: PresetConfig = {
  name: 'default',
  preset: ['icon.ico', 'icon.icns', ...sizes.map((n) => `${n}x${n}.png`)],
}
