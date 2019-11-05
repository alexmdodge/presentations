import Hls from 'hls.js'

/**
 * High level module which exposes the public API of the
 * video player to a consumer.
 */
class SimpleVideoPlayer {
  constructor(videoContainerElement, playerOptions = {}) {
    this._playerOptions = playerOptions
    this._videoContainerElement = videoContainerElement

    this._createPlayerVideoElement()
    this._applyPlayerOptionsToVideoElement()
    this._attachVideoElementToContainer()
  }

  _createPlayerVideoElement() {
    this._videoElement = document.createElement('video')
    this._videoElement.style.width = '100%'
    this._videoElement.style.height = '100%'
  }

  _applyPlayerOptionsToVideoElement() {
    if (this._playerOptions.autoPlay === true) {
      this._applyAutoPlayAttributesToVideoElement()
    }
  
    if (this._playerOptions.controls === true) {
      this._applyControlAttributesToVideoElement()
    }
  }

  _applyAutoPlayAttributesToVideoElement() {
    this._videoElement.setAttribute('autoplay', 'true')

    // We also have to set the video player to muted to start
    this._videoElement.muted = true
  }

  _applyControlAttributesToVideoElement() {
    this._videoElement.removeAttribute('controls', 'true')
  }

  _attachVideoElementToContainer() {
    this._videoContainerElement.appendChild(this._videoElement)
  }

  load(videoUrl) {
    const isVideoUrlValidFormat = this._validateVideoUrlValidFormat(videoUrl)

    if(isVideoUrlValidFormat) {
      _detectVideoFormatAndLoad(videoUrl)
    } else {
      console.error('Video URL is not a valid format')
    }
  }

  _validateVideoUrlValidFormat(url) {
    // We can now easily add more layers of validation here
    return url.lastIndexOf('.') > -1
  }

  _detectVideoFormatAndLoad(videoUrl) {
    const videoType = this._getVideoType(videoUrl)
    const isNativeVideoPlaybackSupported = this._detectNativeVideoPlaybackSupport(videoType)
    const isHlsVideoPlaybackSupported = this._detectHlsVideoPlaybackSupport(videoType)

    if (isNativeVideoPlaybackSupported) {
      this._setupUiAndPlayNativeVideo(videoUrl)
    } else if (isHlsVideoPlaybackSupported) {
      this._setupUiAndPlayHlsVideo(videoUrl)
    } else {
      console.error('url type is not supported')
    }
  }

  _getVideoType(url) {
    return url.substring(url.lastIndexOf('.') + 1)
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