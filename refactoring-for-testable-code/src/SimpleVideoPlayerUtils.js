export function createVideoPlayerElement() {
  const videoElement = document.createElement('video')
  videoElement.style.width = '100%'
  videoElement.style.height = '100%'

  return videoElement
}

export function applyAutoPlayAttributesToVideoElement(videoElement) {
  videoElement.setAttribute('autoplay', 'true')

  // We also have to set the video player to muted to start
  videoElement.muted = true
}

export function applyControlAttributesToVideoElement(videoElement) {
  videoElement.removeAttribute('controls', 'true')
}

export function validateVideoUrlValidFormat(url) {
  // We can now easily add more layers of validation here
  return url.lastIndexOf('.') > -1
}

export function detectVideoTypeFromUrl(url) {
  return url.substring(url.lastIndexOf('.') + 1)
}

export function detectNativeVideoPlaybackSupport(videoType, videoElement) {
  const isHlsSupportedNatively = videoElement.canPlayType('application/vnd.apple.mpegurl')
  const isVideoTypeProgressive = videoType === 'mp4'
  return isVideoTypeProgressive || isHlsSupportedNatively 
}

export function detectHlsVideoPlaybackSupport(videoType, HlsUtils) {
  const isVideoTypeHls = videoType === 'm3u8'
  const isHlsSupportAvailable = HlsUtils.isSupported()  
  return isVideoTypeHls && isHlsSupportAvailable
}