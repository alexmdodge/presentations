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
 * Message: Incoming
 * Type: Command
 */
export function applyAutoPlayAttributesToVideoElement(videoElement) {
  videoElement.setAttribute('autoplay', 'true')

  // We also have to set the video player to muted to start
  videoElement.muted = true
}

/**
 * Message: Incoming
 * Type: Command
 */
export function applyControlAttributesToVideoElement(videoElement) {
  videoElement.removeAttribute('controls', 'true')
}

/**
 * Message: Incoming
 * Type: Query
 */
export function validateVideoUrlValidFormat(url) {
  // We can now easily add more layers of validation here
  return url.lastIndexOf('.') > -1
}

/**
 * Message: Incoming
 * Type: Query
 */
export function detectVideoTypeFromUrl(url) {
  return url.substring(url.lastIndexOf('.') + 1)
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