import Hls from 'hls.js'
import {
  createVideoPlayerElement,
  applyAutoPlayAttributesToVideoElement,
  applyControlAttributesToVideoElement,
  validateVideoUrlValidFormat,
  detectVideoTypeFromUrl
} from './SimpleVideoPlayerUtils'

/**
 * High level module which exposes the public API of the
 * video player to a consumer.
 */
class SimpleVideoPlayer {
  constructor(videoContainerElement, playerOptions = {}) {
    this._playerOptions = playerOptions
    this._videoContainerElement = videoContainerElement

    this._videoElement = createVideoPlayerElement()
    this._applyPlayerOptionsToVideoElement()

    this._attachVideoElementToContainer()
  }

  _applyPlayerOptionsToVideoElement() {
    if (this._playerOptions.autoPlay === true) {
      applyAutoPlayAttributesToVideoElement(this._videoElement)
    }
  
    if (this._playerOptions.controls === true) {
      applyControlAttributesToVideoElement(this._videoElement)
    }
  }

  _attachVideoElementToContainer() {
    this._videoContainerElement.appendChild(this._videoElement)
  }

  load(videoUrl) {
    const isVideoUrlValidFormat = validateVideoUrlValidFormat(videoUrl)

    if(isVideoUrlValidFormat) {
      _detectVideoFormatAndLoad(videoUrl)
    } else {
      console.error('Video URL is not a valid format')
    }
  }

  _detectVideoFormatAndLoad(videoUrl) {
    const videoType = detectVideoTypeFromUrl(videoUrl)
    const isNativeVideoPlaybackSupported = this._detectNativeVideoPlaybackSupport(videoType)
    const isHlsVideoPlaybackSupported = this._detectHlsVideoPlaybackSupport(videoType)

    if (isNativeVideoPlaybackSupported) {
      this._setupUiAndPlayNativeVideo(videoUrl)
    } else if (isHlsVideoPlaybackSupported) {
      this._setupUiAndPlayHlsVideo(videoUrl)
    } else {
      console.error('Video URL type is not supported')
    }
  }

  _detectNativeVideoPlaybackSupport(videoType) {
    const isHlsSupportedNatively = this._videoElement.canPlayType('application/vnd.apple.mpegurl')
    const isVideoTypeProgressive = videoType === 'mp4'
    return isVideoTypeProgressive || isHlsSupportedNatively 
  }

  _detectHlsVideoPlaybackSupport(videoType) {
    const isVideoTypeHls = videoType === 'm3u8'
    const isHlsSupportAvailable = Hls.isSupported()  
    return isVideoTypeHls && isHlsSupportAvailable
  }

  _setupUiAndPlayNativeVideo(videoUrl) {
    this._videoElement.src = videoUrl
    this._videoElement.addEventListener('loadedmetadata', () => {
      // Note we could bind here or define a method using the Babel class
      // properties transform
      this._onNativeVideoMetadataLoaded()
    });
  }

  _onNativeVideoMetadataLoaded() {
    this._setupVideoPlayerUi()
    this._videoElement.play();
  }

  _setupUiAndPlayHlsVideo(videoUrl) {
    this._hls = new Hls();
    this._hls.loadSource(videoUrl);
    this._hls.attachMedia(this._videoElement);

    this._hls.on(Hls.Events.MANIFEST_PARSED, () => {
      this._setupVideoPlayerUi()
      this._videoElement.play()
    })
  }

  play() {
    this._videoElement.play()
  }

  pause() {
    this._videoElement.pause()
  }
}

export {
  SimpleVideoPlayer
}