import { validateVideoUrlValidFormat } from '../src/utils'

describe('validateVideoUrlValidFormat', () => {
  it('should return true if a valid format is detected', () => {
    const testUrl = 'my-video.mp4'

    expect(
      validateVideoUrlValidFormat(testUrl)
    ).toStrictEqual(true)
  })

  it('should return false if an invalid format is detected', () => {
    const testUrl = 'my-not-video'
    
    expect(
      validateVideoUrlValidFormat(testUrl)
    ).toStrictEqual(false)
  })
})