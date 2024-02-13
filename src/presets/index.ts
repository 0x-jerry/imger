export { defaultPreset } from './default'

import type { GenerateImagePreset, ResizeType } from '../modules/imger'

const isValidResizeType = (n: Partial<ResizeType>) => typeof n === 'string' || (n.name && n.size)

export const isValidPreset = (p: Partial<GenerateImagePreset>) => {
  p.shapes = p.shapes?.filter(isValidResizeType)

  return p.input && p.output && p.shapes?.length
}
