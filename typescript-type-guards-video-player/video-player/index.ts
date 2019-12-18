import extend from 'extend'

import { DeepPartial } from '../deep-partial';
import { PlayerConfiguration, playerConfigDefaults } from './utils';

interface ContentData {
  stream: {
    url: string,
    captions?: boolean,
    segments?: number[]
  },
  authentication?: {
    token?: string;
    authType?: string;
  },
  drm?: {
    licenseUrl: string;
    certificateUrl: string;
    headers: Record<string, string>
  }
}

function isString(data: any): data is String {
  return typeof data === 'string'
}

function isContentData(data: string | ContentData): data is ContentData {
  return (data as ContentData).stream !== undefined
}

// Usually we'll have a couple more

class VideoPlayer {
  private _config: PlayerConfiguration
  private _playData?: ContentData

  public constructor(playerConfig: DeepPartial<PlayerConfiguration>) {
    this._config = this._normalizePlayerConfig(playerConfig)
  }

  private _normalizePlayerConfig(partialConfig: DeepPartial<PlayerConfiguration>): PlayerConfiguration {
    // If we wanted we could add some runtime validation in here:
    // https://github.com/gcanti/io-ts

    return extend(true, {}, playerConfigDefaults(), partialConfig)
  }

  private _normalizePlayData(data: string): ContentData {
    // Usually we would use more complex merging mechanisms to handle various case
    return {
      stream: {
        url: data
      }
    }
  }

  public play(data: string | ContentData, playOverrides?: DeepPartial<PlayerConfiguration>) {
    this._config = this._overrideConfig(this._config, playOverrides)

    if (isString(data)) {
      this._playData = this._normalizePlayData(data)
    } else {
      this._playData = data
    }

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

    return this
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
  .withCaptionStyles({
    color: 'red',
    font: 'bold'
  })
  .build()

const player2 = new VideoPlayer(config)

player2.play('https://my.video.url')

player2.play({
  stream: {
    url: 'https://my.complex.video.url',
    captions: true,
    segments: [ 0, 123, 600 ]
  },
  authentication: {
    authType: 'jwt',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  },
  drm: {
    certificateUrl: 'https://fairplay.license-server.com/0939f99f39j9jf9dj93f',
    licenseUrl: 'https://fairplay.license-server.com/0939f99f39j9jf9dj93f',
    headers: {
      'x-exp-token': 'kfjkgj3k3jgk3j3jkjdkjdlakjvvaooeop43pp33o2i2o'
    }
  }
})