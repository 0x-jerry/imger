import { join } from 'path'
import sharp from 'sharp'
import { writeFile } from 'fs/promises'
import { ensureDir } from 'fs-extra'
import { createICNS, createICO } from 'png2icons'

export interface ResizeOption {
  /**
   * File name
   */
  name: string
  /**
   * Image size
   *
   * @example
   * - `12x12`
   * - `25x25@2x`
   */
  size: string
}

export type ResizeType = ResizeOption | string

export type GenerateImagePreset = Array<ResizeType>

export interface GenImageOption {
  /**
   * output dir
   */
  output: string
  preset: GenerateImagePreset
}

export async function generateImage(source: Buffer, option: GenImageOption) {
  const s = sharp(source)
  await ensureDir(option.output)

  const p = option.preset.map(async (conf) => {
    const isStr = typeof conf === 'string'
    const size = parseSize(isStr ? conf : conf.size)

    const name = isStr ? conf : conf.name
    const output = join(option.output, name)

    if (name.endsWith('.ico')) {
      const buf = createICO(await s.png().toBuffer(), 0, 0, true)

      return writeFile(output, buf!)
    }

    if (name.endsWith('.icns')) {
      const buf = createICNS(await s.toBuffer(), 5, 0)

      return writeFile(output, buf!)
    }

    return s
      .resize(size.width, size.height, {
        fit: 'contain',
      })
      .png()
      .toFile(output)
  })

  await Promise.all(p)
}

/**
 *
 * @example
 * - 10x10.png => {width: 10, height: 10}
 * - 20x20.jpeg => {width: 20, height: 20}
 * - 30x30@2x.png => {width: 60, height: 60}
 * - 30x30@3x.png => {width: 90, height: 90}
 *
 * @param str
 * @returns
 */
function parseSize(str: string) {
  const sizeReg = /(\d+)x(\d+)(@\d+x)?/
  const [_, width, height, scaleStr = '@1x'] = str.match(sizeReg) || []

  const scale = parseInt(scaleStr.match(/\d+/)?.at(0) || '1')

  const opt = {
    width: parseInt(width) * scale,
    height: parseInt(height) * scale,
  }

  return opt
}
