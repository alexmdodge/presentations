export type PlayerConfiguration = {
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
export function playerConfigDefaults(): PlayerConfiguration {
  return {
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
}