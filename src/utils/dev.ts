import debug from 'debug'
import { name } from '../const'
import pc from 'picocolors'

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

export const error = (l: string) => console.log(pc.bgRed(pc.white(` ${l} `)))
export const warn = (l: string) => console.log(pc.bgYellow(pc.white(` ${l} `)))
