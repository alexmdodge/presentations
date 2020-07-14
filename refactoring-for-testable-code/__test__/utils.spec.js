import {
  isVideoUrlValidFormat,
  detectVideoTypeFromUrl,
  VIDEO_TYPES
} from '../src/utils'

describe('isVideoUrlValidFormat', () => {
  it('should return true if a valid format is detected', () => {
    const testUrl = 'my-video.mp4'

    expect(
      isVideoUrlValidFormat(testUrl)
    ).toStrictEqual(true)
  })

  it('should return false if an invalid format is detected', () => {
    const testUrl = 'not-a-video'
    
    expect(
      isVideoUrlValidFormat(testUrl)
    ).toStrictEqual(false)
  })

  it('should return false if url is a non-string', () => {
    const testUrl = null
   
    expect(
      isVideoUrlValidFormat(testUrl)
    ).toStrictEqual(false)
  })
})

describe('detectVideoTypeFromUrl', () => {
  it('should return mp4 for an mp4 video', () => {
    const testUrl = 'my-video.mp4'

    expect(
      detectVideoTypeFromUrl(testUrl)
    ).toStrictEqual(VIDEO_TYPES.MP4)
  })

  it('should return null value if an unknown extension', () => {
    const testUrl = 'not-a-known.kt'
    
    expect(
      detectVideoTypeFromUrl(testUrl)
    ).toStrictEqual(VIDEO_TYPES.UNKNOWN)
  })

  it('should return null value if an unknown extension', () => {
    const testUrl = 'not-a-known.kt'
    
    expect(
      detectVideoTypeFromUrl(testUrl)
    ).toStrictEqual(VIDEO_TYPES.UNKNOWN)
  })

  it('should return null value if a non-string url', () => {
    const testUrl = null
    
    expect(
      detectVideoTypeFromUrl(testUrl)
    ).toStrictEqual(VIDEO_TYPES.UNKNOWN)
  })
})