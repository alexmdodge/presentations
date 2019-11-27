import { DeepPartial } from '../deep-partial';
import extend from 'extend'

// To start, a large player configuration 
type PlayerConfiguration = {
  media: {
    volume: number;
    muted: boolean;
    bitrate: number;
  },
  captions: {
    enabled: boolean,
    styles: {
      color: 'red',
      background: 'white',
      font: 'italic'
    }
  },
  ui: {
    controls: { name: string, position: number }[],
    themeColor: string;
  }
}

// And the default configuration which is used for every player setup
const playerConfigDefaults: PlayerConfiguration = {
  media: {
    volume: 1,
    muted: false,
    bitrate: 2000,
  },
  captions: {
    enabled: true,
    styles: {
      color: 'red',
      background: 'white',
      font: 'italic'
    }
  },
  ui: {
    controls: [
      { name: 'Play', position: 0 },
      { name: 'Pause', position: 1 },
      { name: 'Volume', position: -1 },
    ],
    themeColor: 'blue'
  }
}

class VideoPlayer {
  private _config: PlayerConfiguration

  public constructor(playerConfig: DeepPartial<PlayerConfiguration>) {
    this._config = this._normalizePlayerConfig(playerConfig)
  }

  private _normalizePlayerConfig(partialConfig: DeepPartial<PlayerConfiguration>): PlayerConfiguration {
    // If we wanted we could add some runtime validation in here:
    // https://github.com/gcanti/io-ts

    return extend(true, {}, playerConfigDefaults, partialConfig)
  }

  public play(url: string, playOverrides?: DeepPartial<PlayerConfiguration>) {
    this._config = this._overrideConfig(this._config, playOverrides)

    // Play the video using our underlying video libraries
    // _videoElement.volume = this._config.media.volume
    // ex. _videoElement.src = url
  }

  private _overrideConfig(
    config: PlayerConfiguration,
    partialConfig?: DeepPartial<PlayerConfiguration>
  ): PlayerConfiguration {
    return extend(true, {}, config, partialConfig)
  }
}

// Now we'll create the player and play a video

const player1 = new VideoPlayer({
  captions: {
    enabled: false
  }
})

player1.play('https://my.video.url', {
  media: {
    volume: 0.5
  }
})

type PlayerMediaConfig = {
  volume: number;
  muted: boolean;
  bitrate: number;
}

type PlayerCaptionsConfig = {
  enabled: boolean,
  styles: PlayerCaptionsStylesConfig
}

type PlayerCaptionsStylesConfig = {
  color: string,
  background: string,
  font: string
}

type PlayerUiConfig = {
  controls: { name: string, position: number }[],
  themeColor: string;
}

// We could also offer the configuration as a builder
class PlayerConfigurationBuilder {
  private _config: DeepPartial<PlayerConfiguration>
  
  constructor() {
    this._config = {}
  }

  public withMedia(config: DeepPartial<PlayerMediaConfig>) {
    this._config = extend(true, {}, this._config, {
      media: config
    })

    return this
  }

  public withCaptions(config: DeepPartial<PlayerCaptionsConfig>) {
    this._config = extend(true, {}, this._config, {
      captions: config
    })

    return this
  }

  public withCaptionStyles(config: DeepPartial<PlayerCaptionsStylesConfig>) {
    this._config = extend(true, {}, this._config, {
      captions: {
        styles: config
      }
    })
  }

  public withUi(config: DeepPartial<PlayerUiConfig>) {
    this._config = extend(true, {}, this._config, {
      uis: config
    })

    return this
  }

  public build(): DeepPartial<PlayerConfiguration> {
    return this._config
  }
}

const builder = new PlayerConfigurationBuilder()
const config = builder
  .withCaptions({
    enabled: true
  })
  .build()

const player2 = new VideoPlayer(config)

player2.play('https://my.video.url')