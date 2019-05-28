interface ComplexPlayData {
  mediaId: string;
  isLive: boolean;
}

type PlayData = string | ComplexPlayData;

function isComplexPlayData(data: PlayData): data is ComplexPlayData {
  return (data as ComplexPlayData).mediaId !== undefined;
}

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

play('http://sample.com/myvideo.mp4');

play({
  mediaId: '93999r9f9399399f9',
  isLive: true,
});