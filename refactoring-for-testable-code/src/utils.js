/**
 * Message: Incoming
 * Type: Query
 */
export function isVideoUrlValidFormat(url) {
  if (typeof url !== 'string') {
    return false
  }

  return url.lastIndexOf('.') > -1
}

export const VIDEO_TYPES = {
  'MP4': 'mp4',
  'UNKNOWN': 'unknown'
}

/**
 * Message: Incoming
 * Type: Query
 */
export function detectVideoTypeFromUrl(url) {
  if (!isVideoUrlValidFormat(url)) {
    return VIDEO_TYPES.UNKNOWN
  }

  const extensionPosition = url.lastIndexOf('.') + 1
  const matchedType = url.substring(extensionPosition)

  switch (matchedType) {
    case 'mp4':
      return VIDEO_TYPES.MP4
    default:
      return VIDEO_TYPES.UNKNOWN
  }
}

/**
 * Message: Incoming
 * Type: Query
 */
export function createVideoPlayerElement() {
  const videoElement = document.createElement('video')
  videoElement.style.width = '100%'
  videoElement.style.height = '100%'

  return videoElement
}

/**
 * Message: Outgoing
 * Type: Command
 */
export function applyAutoPlayAttributesToVideoElement(videoElement) {
  videoElement.setAttribute('autoplay', 'true')
  videoElement.setAttribute('muted', 'true')
}

/**
 * Message: Outgoing
 * Type: Command
 */
export function applyControlAttributesToVideoElement(videoElement) {
  videoElement.setAttribute('controls', 'true')
}

/**
 * Message: Incoming
 * Type: Query
 */
export function detectNativeVideoPlaybackSupport(videoType, videoElement) {
  const isHlsSupportedNatively = videoElement.canPlayType('application/vnd.apple.mpegurl')
  const isVideoTypeProgressive = videoType === 'mp4'
  return isVideoTypeProgressive || isHlsSupportedNatively 
}

/**
 * Message: Incoming
 * Type: Query
 */
export function detectHlsVideoPlaybackSupport(videoType, HlsUtils) {
  const isVideoTypeHls = videoType === 'm3u8'
  const isHlsSupportAvailable = HlsUtils.isSupported()  
  return isVideoTypeHls && isHlsSupportAvailable
}

// Note that we don't have an example of an Incoming Command but
// we could represent that here as a registry of some kind

export class VideoElementRegistry {
  constructor() {
    this._registry = {}
  }

  get registry() {
    return this._registry
  }

  set registry(registry) {
    this._registry = registry
  }

  /**
   * Message: Incoming
   * Type: Command
   */
  addVideoElement(uuid, element) {
    this._registry[uuid] = element
  }

  /**
   * Message: Incoming
   * Type: Query
   */
  getVideoElement(uuid) {
    return this._registry[uuid]
  }

  /**
   * Message: Incoming
   * Type: Command
   */
  removeVideoElement(uuid) {
    delete this._registry[uuid]
  }

  /**
   * Message: Incoming
   * Type: Command 
   */
  clear() {
    this._registry = {}
  }
}
