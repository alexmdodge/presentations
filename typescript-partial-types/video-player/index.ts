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
    this._config = this._normalizePlayerConfiguration(playerConfig)
  }

  private _normalizePlayerConfiguration(partialConfig: DeepPartial<PlayerConfiguration>): PlayerConfiguration {
    // If we wanted we could add some runtime validation in here:
    // https://github.com/gcanti/io-ts

    return extend(true, {}, playerConfigDefaults, partialConfig)
  }

  public play(url: string, playOverrides?: DeepPartial<PlayerConfiguration>) {
    this._config = this._overrideConfiguration(playOverrides)

    // Play the video using our underlying video libraries
    // _videoElement.volume = this._config.media.volume
    // ex. _videoElement.src = url
  }

  private _overrideConfiguration(partialConfig?: DeepPartial<PlayerConfiguration>): PlayerConfiguration {
    return extend(true, {}, this._config, partialConfig)
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
