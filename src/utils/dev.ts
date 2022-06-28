import { debug } from 'debug'
import { name } from '../const'

export function createLogger(ns?: string) {
  if (!ns) {
    return debug(name)
  }

  return debug(`${name}:${ns}`)
}

export const logger = {
  log: createLogger(),
  warn: createLogger('warn'),
  error: createLogger('error'),
}
