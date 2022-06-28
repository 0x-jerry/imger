import { emptyDir } from 'fs-extra'
import { readdir, readFile } from 'fs/promises'
import { join } from 'path'
import { generateImage } from '../src/export'
import { presets } from '../src/presets'

describe('imger', () => {
  it('should generate use by default preset.', async () => {
    const buf = await readFile(join(__dirname, './logo.png'))

    const output = join(__dirname, 'output')

    await emptyDir(output)
    await generateImage(buf, { output, preset: presets[0].preset })

    const files = await readdir(output)
    expect(files.length).toBe(8)
    await emptyDir(output)
  })
})
