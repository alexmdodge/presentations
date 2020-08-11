import {
  isVideoUrlValidFormat,
  detectVideoTypeFromUrl,
  VIDEO_TYPES,
  VideoElementRegistry,
  applyAutoPlayAttributesToVideoElement
} from '../src/utils'

import { MockVideoElement, setAttributeMock } from './__mocks__/video-element'

/**
 * Message: Incoming
 * Type: Query
 */
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

/**
 * Message: Incoming
 * Type: Query
 */
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

describe('VideoElementRegistry', () => {
  /**
   * Message: Incoming
   * Type: Command
   */
  describe('addVideoElement', () => {
    it('should add a video element (object) to the registry', () => {
      const testRegistry = new VideoElementRegistry()

      // In a way this is a mock, but a very primitive one
      const testVideoElement = { muted: true }

      // Call the API and assert public side effect
      testRegistry.addVideoElement('test-el', testVideoElement)

      // Assert public side effects
      expect(testRegistry.registry['test-el']).toEqual(testVideoElement)
    })
  })
})


/**
 * Message: Outgoing
 * Type: Command
 */
describe('applyAutoPlayAttributesToVideoElement', () => {
  beforeEach(() => {
    MockVideoElement.mockClear()
    setAttributeMock.mockClear()
  })

  it('should apply the attributes of autoplay and muted to a video element', () => {
    const videoElement = new MockVideoElement()
    
    applyAutoPlayAttributesToVideoElement(videoElement)

    // Calls for both autoplay and muted
    expect(setAttributeMock.mock.calls.length).toEqual(2)
    expect(setAttributeMock.mock.calls[0][0]).toEqual('autoplay')
    expect(setAttributeMock.mock.calls[1][0]).toEqual('muted')

    // We shouldn't check public properties unless it makes sense from
    // a code distance and cost perspective
  })
})