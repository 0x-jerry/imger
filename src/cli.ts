import { CAC } from 'cac'
import { version, name } from './const'

const cli = new CAC(name)

cli
  .version(version)
  .help()
  .command('')
  .action(() => cli.outputHelp())

cli.parse()
