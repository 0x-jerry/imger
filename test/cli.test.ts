import { emptyDir } from 'fs-extra'
import { readdir } from 'fs/promises'
import { join } from 'path'
import { generateImage } from '../src/export'
import { defaultPreset } from '../src/presets'

describe('imger', () => {
  it('should generate use by default preset.', async () => {
    const input = join(__dirname, './logo.png')

    const output = join(__dirname, 'output')

    await emptyDir(output)
    await generateImage(defaultPreset(input, output))

    const files = await readdir(output)
    expect(files.length).toBe(8)
    await emptyDir(output)
  })
})
