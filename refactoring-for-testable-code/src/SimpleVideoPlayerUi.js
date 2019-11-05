/**
 * Simple UI which allows you to control the SimpleVideoPlayer
 */
export class SimpleVideoPlayerUi {
  constructor(videoPlayer) {
    this._player = videoPlayer
    this._videoContainerElement = null

    this._uiContainerElement = document.createElement('div')
    this._applyUiContainerStyles()

    this._playButton = this._createUiButtonWithText('Play')
    this._pauseButton = this._createUiButtonWithText('Pause')

    this._addUiButtonListeners()
    this._attachUiButtonsToContainer()
  }

  _applyUiContainerStyles() {
    this._uiContainerElement.style.display = 'flex'
    this._uiContainerElement.style.flexDirection = 'row'
    this._uiContainerElement.style.justifyContent = 'space-between'
    this._uiContainerElement.style.alignItems = 'bottom'
    this._uiContainerElement.style.position = 'absolute'
    this._uiContainerElement.style.width = '80%'
    this._uiContainerElement.style.height = '100%'
    this._uiContainerElement.style.margin = '10px'
    this._uiContainerElement.style.top = '0'
  }

  _createUiButtonWithText(text) {
    const button = document.createElement('button')
    button.innerHTML = text
    this._applyUiButtonStyle(button)

    return button
  }

  _applyUiButtonStyle(button) {
    button.style.fontFamily = `"Comic Sans MS", "Comic Sans", cursive`
    button.style.fontSize = '16px'
    button.style.fontWeight = 'bold'
    button.style.height = '60px'
  }

  _addUiButtonListeners() {
    this._playButton.addEventListener('click', () => {
      this._player.play()
    })

    this._pauseButton.addEventListener('click', () => {
      this._player.pause()
    })
  }

  _attachUiButtonsToContainer() {
    this._uiContainerElement.appendChild(this._playButton)
    this._uiContainerElement.appendChild(this._pauseButton)
  }

  attachTo(element) {
    this._videoContainerElement = element
    this._videoContainerElement.style.position = 'relative'
    this._videoContainerElement.appendChild(this._uiContainerElement)
  }

  detach() {
    this._videoContainerElement.removeChild(this._uiContainerElement)
    this._videoContainerElement = null
  }
}