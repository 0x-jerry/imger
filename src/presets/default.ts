import type { GenerateImagePreset } from '../modules/imger'

const sizes = [16, 32, 64, 128, 256, 512]

export function defaultPreset(input: string, output: string): GenerateImagePreset {
  return {
    input,
    output,
    shapes: ['icon.ico', 'icon.icns', ...sizes.map((n) => `${n}x${n}.png`)],
  }
}
