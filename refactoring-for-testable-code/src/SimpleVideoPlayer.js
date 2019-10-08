import Hls from 'hls.js'

class SimpleVideoPlayer {
  constructor(container, options = {}) {
    // First we'll create the video element and attach
    // it to the video container the implementor passes in
    this._el = document.createElement('video')

    // Making sure here that we set the styles of the video
    // element so they stretch to the width of the parent
    // container
    this._el.style.width = '100%'
    this._el.style.height = '100%'

    // We also need to append some attributes so the options
    // the user passes in are applied to the video
    this._options = options
    if (this._options.autoPlay === true) {
      this._el.setAttribute('autoplay', 'true')

      // We also have to set the video player to muted to start
      this._el.muted = true
    }
  
    // We're going to assume here that the controls are enabled
    // by default, so you have to explicitly disable them
    if (this._options.controls === true) {
      this._el.removeAttribute('controls', 'true')
    }

    // Now we can attach the video element
    this._container = container
    this._container.appendChild(this._el)

  }

  load(url) {
    if(url.lastIndexOf('.') > -1) {
      const urlType = url.substring(url.lastIndexOf('.') + 1)

      if (urlType === 'mp4' || this._el.canPlayType('application/vnd.apple.mpegurl')) {
        // Load the basic video player as expected
        this._el.src = url
        this._el.addEventListener('loadedmetadata', () => {
          // Once things start playing then we'll create our controls and inject them
          // in as well
          this._container.style.position = 'relative'
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
            this._el.play()
          })

          // And pause
          const pause = document.createElement('button')
          pause.innerHTML = 'PAUSE'
          pause.style.fontFamily = `"Comic Sans MS", "Comic Sans", cursive`
          pause.style.fontSize = '16px'
          pause.style.fontWeight = 'bold'
          pause.style.height = '60px'

          pause.addEventListener('click', () => {
            this._el.pause()
          })

          this._ui.appendChild(play)
          this._ui.appendChild(pause)
          this._container.appendChild(this._ui)

          // Then start the video
          this._el.play();
        });
      } else if (urlType === 'm3u8' && Hls.isSupported()) {
          this._hls = new Hls();

          // Load the source into the hls instance
          this._hls.loadSource(url);

          // Attach the video
          this._hls.attachMedia(this._el);

          // Finally listen for when the manifest is parsed
          // and we can start to play
          this._hls.on(Hls.Events.MANIFEST_PARSED, () => {
            console.log('Manifest is parsed')
            // Setup the same UI for the
            this._container.style.position = 'relative'
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
              this._el.play()
            })

            pause.addEventListener('click', () => {
              this._el.pause()
            })

            this._ui.appendChild(play)
            this._ui.appendChild(pause)
            this._container.appendChild(this._ui)

            // Then play
            this._el.play()
          })
      } else {
        console.error('url type is not supported')
      }
    } else {
      console.error('url is not a valid format')
    }
  }

  play() {
    this._el.play()
  }

  pause() {
    this._el.pause()
  }
}

export {
  SimpleVideoPlayer
}