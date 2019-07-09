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

// Our play call can accept either data formats now
function play(data: PlayData) {
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

// Here we demonstrate using eitherxb
play('http://sample.com/myvideo.mp4');

play({
  mediaId: '93999r9f9399399f9',
  isLive: true,
});