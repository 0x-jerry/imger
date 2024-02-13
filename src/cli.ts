import { CAC } from 'cac'
import { readFile } from 'fs/promises'
import { version, name } from './const'
import { generateImage, type GenerateImagePreset } from './modules/imger'
import { logger, warn } from './utils/dev'
import { type Arrayable, toArray } from '@0x-jerry/utils'
import { isValidPreset, defaultPreset } from './presets'

const cli = new CAC(name)

interface CliArgs {
  preset: string
}

cli
  .version(version)
  .help()
  .command('[source image] [out dir]')
  .option(
    '--preset, -p <preset>',
    'Config preset, support value: default, or you can use a json file instead.',
    {
      default: 'default',
    }
  )
  .action(async (input, output, args: CliArgs) => {
    const presets: GenerateImagePreset[] = []

    if (input && output) {
      presets.push(defaultPreset(input, output))
    }

    if (args.preset) {
      const conf = await getPreset(args.preset)
      presets.push(...conf)
    }

    if (!presets.length) {
      cli.outputHelp()
      return
    }

    for (const preset of presets) {
      try {
        await generateImage(preset)
      } catch (error) {
        warn('generate image error:')
        console.log(error)
      }
    }
  })

cli.parse()

async function getPreset(presetPath: string): Promise<GenerateImagePreset[]> {
  try {
    const txt = await readFile(presetPath, {
      encoding: 'utf8',
    })

    const mayPreset: Arrayable<GenerateImagePreset> = JSON.parse(txt)

    if (!Array.isArray(mayPreset)) {
      throw new Error(`${presetPath} is not a preset.`)
    }

    return toArray(mayPreset).filter(isValidPreset)
  } catch (err) {
    warn('Parse preset failed, use default preset config instead.')
    logger.warn('Get preset failed, %o', err)

    return []
  }
}
