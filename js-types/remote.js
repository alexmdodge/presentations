/**
 * We can import types from other files
 * @param {import('./log.types').LogPayload} payload `
 */
export function logRemote(payload) {
  // Post remote data
  return Promise.resolve('success')
}