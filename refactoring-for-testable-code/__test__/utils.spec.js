import {
  validateVideoUrlValidFormat,
  detectVideoTypeFromUrl
} from '../src/utils'

describe('validateVideoUrlValidFormat', () => {
  it('should return true if a valid format is detected', () => {
    const testUrl = 'my-video.mp4'

    expect(
      validateVideoUrlValidFormat(testUrl)
    ).toStrictEqual(true)
  })

  it('should return false if an invalid format is detected', () => {
    const testUrl = 'not-a-video'
    
    expect(
      validateVideoUrlValidFormat(testUrl)
    ).toStrictEqual(false)
  })

  // TDD for some additional cases
  // it('should return false if url is falsy', () => {
  //   const testUrl = null
  //  
  //   expect(
  //     validateVideoUrlValidFormat(testUrl)
  //   ).toStrictEqual(false)
  // })
})

describe('detectVideoTypeFromUrl', () => {
  it('should return mp4 for an mp4 video', () => {
    const testUrl = 'my-video.mp4'

    expect(
      detectVideoTypeFromUrl(testUrl)
    ).toStrictEqual('mp4')
  })

  // TDD for some additional cases
  // it('should return null value if not extension found', () => {
  //   const testUrl = 'not-a-video'
    
  //   expect(
  //     detectVideoTypeFromUrl(testUrl)
  //   ).toStrictEqual('')
  // })
})