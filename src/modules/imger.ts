import { join } from 'path'
import sharp from 'sharp'
import { readFile, writeFile } from 'fs/promises'
import { ensureDir } from 'fs-extra'
import { createICNS, createICO } from 'png2icons'
import { error, logger } from '../utils/dev'

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

export interface GenerateImagePreset {
  /**
   * input image path
   */
  input: string
  /**
   * output dir
   */
  output: string
  shapes: ResizeType[]
}

export async function generateImage(option: GenerateImagePreset) {
  const source = await getImageSource(option.input)
  const s = sharp(source)
  await ensureDir(option.output)

  const p = option.shapes.map(async (conf) => {
    const isStr = typeof conf === 'string'
    const size = parseSize(isStr ? conf : conf.size)

    const name = isStr ? conf : conf.name
    const output = join(option.output, name)

    if (name.endsWith('.ico')) {
      const buf = createICO(await s.png().toBuffer(), 0, 0, true, true)

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

export async function getImageSource(input: string) {
  let buf: Buffer

  try {
    buf = await readFile(input)
    return buf
  } catch (err) {
    error(`File [${input}] not exists. Please check image path.`)
    logger.warn('read image failed, %s', err)
    throw err
  }
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
