import Hls from 'hls.js'
import {
  createVideoPlayerElement,
  applyAutoPlayAttributesToVideoElement,
  applyControlAttributesToVideoElement,
  validateVideoUrlValidFormat,
  detectVideoTypeFromUrl,
  detectNativeVideoPlaybackSupport,
  detectHlsVideoPlaybackSupport
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

  // PRIVATE METHODS

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

  _detectVideoFormatAndLoad(videoUrl) {
    const videoType = detectVideoTypeFromUrl(videoUrl)
    const isNativeVideoPlaybackSupported = detectNativeVideoPlaybackSupport(videoType, this._videoElement)
    const isHlsVideoPlaybackSupported = detectHlsVideoPlaybackSupport(videoType, Hls)

    if (isNativeVideoPlaybackSupported) {
      this._playNativeVideo(videoUrl)
    } else if (isHlsVideoPlaybackSupported) {
      this._playHlsVideo(videoUrl)
    } else {
      console.error('Video URL type is not supported')
    }
  }

  _playNativeVideo(videoUrl) {
    this._videoElement.src = videoUrl
    this._videoElement.addEventListener('loadedmetadata', () => {
      this._videoElement.play()
    });
  }

  _playHlsVideo(videoUrl) {
    this._hls = new Hls();
    this._hls.loadSource(videoUrl);
    this._hls.attachMedia(this._videoElement);

    this._hls.on(Hls.Events.MANIFEST_PARSED, () => {
      this._videoElement.play()
    })
  }

  // PUBLIC API METHODS

  load(videoUrl) {
    const isVideoUrlValidFormat = validateVideoUrlValidFormat(videoUrl)

    if(isVideoUrlValidFormat) {
      _detectVideoFormatAndLoad(videoUrl)
    } else {
      console.error('Video URL is not a valid format')
    }
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