import { CAC } from 'cac'
import { readFile } from 'fs/promises'
import { version, name } from './const'
import { generateImage, GenerateImagePreset, ResizeType } from './modules/imger'
import pc from 'picocolors'
import { logger } from './utils/dev'
import { presets } from './presets'

const cli = new CAC(name)

interface CliArgs {
  preset: string
}

const error = (l: string) => console.log(pc.bgRed(pc.white(` ${l} `)))
const warn = (l: string) => console.log(pc.bgYellow(pc.white(` ${l} `)))

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
    if (!input || !output) {
      cli.outputHelp()
      return
    }

    let buf: Buffer
    try {
      buf = await readFile(input)
    } catch (err) {
      error(`File [${input}] not exists. Please check image path.`)
      logger.warn('read image failed, %s', err)
      return
    }

    const preset =
      presets.find((p) => p.name === args.preset)?.preset || (await getPreset(args.preset))

    await generateImage(buf, { output, preset })
  })

cli.parse()

async function getPreset(presetPath: string): Promise<GenerateImagePreset> {
  try {
    const txt = await readFile(presetPath, {
      encoding: 'utf8',
    })

    const mayPreset = JSON.parse(txt)

    if (!Array.isArray(mayPreset)) {
      throw new Error(`${presetPath} is not a preset.`)
    }

    const isValidResizeType = (n: Partial<ResizeType>) =>
      typeof n === 'string' || (n.name && n.size)

    return mayPreset.filter(isValidResizeType)
  } catch (err) {
    warn('Parse preset failed, use default preset config instead.')
    logger.warn('Get preset failed, %o', err)
    return presets[0].preset
  }
}
