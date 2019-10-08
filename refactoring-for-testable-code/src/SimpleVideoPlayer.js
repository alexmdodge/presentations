import Hls from 'hls.js'

class SimpleVideoPlayer {
  constructor(videoContainerElement, playerOptions = {}) {
    // First we'll create the video element and attach
    // it to the video container the implementor passes in
    this._videoElement = document.createElement('video')

    // Making sure here that we set the styles of the video
    // element so they stretch to the width of the parent
    // container
    this._videoElement.style.width = '100%'
    this._videoElement.style.height = '100%'

    // We also need to append some attributes so the options
    // the user passes in are applied to the video
    this._playerOptions = playerOptions
    if (this._playerOptions.autoPlay === true) {
      this._videoElement.setAttribute('autoplay', 'true')

      // We also have to set the video player to muted to start
      this._videoElement.muted = true
    }
  
    // We're going to assume here that the controls are enabled
    // by default, so you have to explicitly disable them
    if (this._playerOptions.controls === true) {
      this._videoElement.removeAttribute('controls', 'true')
    }

    // Now we can attach the video element
    this._videoContainerElement = videoContainerElement
    this._videoContainerElement.appendChild(this._videoElement)

  }

  load(videoUrl) {
    if(videoUrl.lastIndexOf('.') > -1) {
      const videoUrlType = videoUrl.substring(videoUrl.lastIndexOf('.') + 1)

      if (videoUrlType === 'mp4' || this._videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        // Load the basic video player as expected
        this._videoElement.src = videoUrl
        this._videoElement.addEventListener('loadedmetadata', () => {
          // Once things start playing then we'll create our controls and inject them
          // in as well
          this._videoContainerElement.style.position = 'relative'
          this._ui = document.createElement('div')
          this._ui.style.display = 'flex'
          this._ui.style.flexDirection = 'row'
          this._ui.style.justifyContent = 'space-between'
          this._ui.style.alignItems = 'bottom'
          this._ui.style.position = 'absolute'
          this._ui.style.width = '80%'
          this._ui.style.height = '100%'
          this._ui.style.margin = '10px'
          this._ui.style.top = '0'

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
      } else if (videoUrlType === 'm3u8' && Hls.isSupported()) {
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
      } else {
        console.error('url type is not supported')
      }
    } else {
      console.error('url is not a valid format')
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