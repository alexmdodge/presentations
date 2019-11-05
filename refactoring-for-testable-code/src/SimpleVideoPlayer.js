import Hls from 'hls.js'

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
    // Load the basic video player as expected
    this._videoElement.src = videoUrl
    this._videoElement.addEventListener('loadedmetadata', () => {
      // Once things start playing then we'll create our controls and inject them
      // in as well
      this._videoContainerElement.style.position = 'relative'
      this._uiContainerElement = document.createElement('div')
      this._uiContainerElement.style.display = 'flex'
      this._uiContainerElement.style.flexDirection = 'row'
      this._uiContainerElement.style.justifyContent = 'space-between'
      this._uiContainerElement.style.alignItems = 'bottom'
      this._uiContainerElement.style.position = 'absolute'
      this._uiContainerElement.style.width = '80%'
      this._uiContainerElement.style.height = '100%'
      this._uiContainerElement.style.margin = '10px'
      this._uiContainerElement.style.top = '0'

      // Then make the play button with all of its styles
      const play = document.createElement('button')
      play.innerHTML = 'PLAY'
      play.style.fontFamily = `"Comic Sans MS", "Comic Sans", cursive`
      play.style.fontSize = '16px'
      play.style.fontWeight = 'bold'
      play.style.height = '60px'

      play.addEventListener('click', () => {
        this._videoElement.play()
      })

      // And pause
      const pause = document.createElement('button')
      pause.innerHTML = 'PAUSE'
      pause.style.fontFamily = `"Comic Sans MS", "Comic Sans", cursive`
      pause.style.fontSize = '16px'
      pause.style.fontWeight = 'bold'
      pause.style.height = '60px'

      pause.addEventListener('click', () => {
        this._videoElement.pause()
      })

      this._ui.appendChild(play)
      this._ui.appendChild(pause)
      this._videoContainerElement.appendChild(this._ui)

      // Then start the video
      this._videoElement.play();
    });
  }

  _setupUiAndPlayHlsVideo(videoUrl) {
    this._hls = new Hls();

    // Load the source into the hls instance
    this._hls.loadSource(videoUrl);

    // Attach the video
    this._hls.attachMedia(this._videoElement);

    // Finally listen for when the manifest is parsed
    // and we can start to play
    this._hls.on(Hls.Events.MANIFEST_PARSED, () => {
      console.log('Manifest is parsed')
      // Setup the same UI for the
      this._videoContainerElement.style.position = 'relative'
      this._ui = document.createElement('div')
      this._ui.style.display = 'flex'
      this._ui.style.flexDirection = 'row'
      this._ui.style.justifyContent = 'space-between'
      this._ui.style.alignItems = 'center'
      this._ui.style.position = 'absolute'
      this._ui.style.width = '80%'
      this._ui.style.height = '100%'
      this._ui.style.top = '0'
      this._ui.style.margin = '10px'

      // Then make the play button with all of its styles
      const play = document.createElement('button')
      play.innerHTML = 'PLAY'
      play.style.fontFamily = `"Comic Sans MS", "Comic Sans", cursive`
      play.style.fontSize = '16px'
      play.style.fontWeight = 'bold'
      play.style.height = '60px'

      // And pause
      const pause = document.createElement('button')
      pause.innerHTML = 'PAUSE'
      pause.style.fontFamily = `"Comic Sans MS", "Comic Sans", cursive`
      pause.style.fontSize = '16px'
      pause.style.fontWeight = 'bold'
      pause.style.height = '60px'

      play.addEventListener('click', () => {
        this._videoElement.play()
      })

      pause.addEventListener('click', () => {
        this._videoElement.pause()
      })

      this._ui.appendChild(play)
      this._ui.appendChild(pause)
      this._videoContainerElement.appendChild(this._ui)

      // Then play
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