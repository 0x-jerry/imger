export { version } from '../package.json'

import { bin } from '../package.json'

export const confFileName = 'x.cli'

export const name = Object.keys(bin || {})[0]
