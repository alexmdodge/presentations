interface ComplexPlayData {
  mediaId: string;
  isLive: boolean;
}

type PlayData = string | ComplexPlayData;

// Here the type guard can narrow our play data to determine
function isComplexPlayData(data: PlayData): data is ComplexPlayData {
  return (data as ComplexPlayData).mediaId !== undefined;
}

// This is the simpler one to call in the case where we only have two types
// to narrow between
function isSimplePlayData(data: PlayData): data is string {
  return typeof data === 'string';
}



// Here we demonstrate using eitherxb
play('http://sample.com/myvideo.mp4');

play({
  mediaId: '93999r9f9399399f9',
  isLive: true,
});

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

  // Our play call can accept either data formats now
  public play(data: PlayData) {
    let contentUrl: string;

    if (isComplexPlayData(data)) {
      const { mediaId, isLive } = data

      // Build a url from the complex data
      contentUrl = `https://sample.com/${mediaId}.mp4?live=${isLive}`
    } else {
      // Use simple url to play
      contentUrl = data
    }

    // startVideoPlayback(contentUrl);
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