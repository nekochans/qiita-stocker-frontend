export const apiUrlBase = (): string => {
  return typeof process.env.apiUrlBase === 'string'
    ? process.env.apiUrlBase
    : ''
}
