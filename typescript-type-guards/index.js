// Here the type guard can narrow our play data to determine
function isComplexPlayData(data) {
    return data.mediaId !== undefined;
}
// This is the simpler one to call in the case where we only have two types
// to narrow between
function isSimplePlayData(data) {
    return typeof data === 'string';
}
// Our play call can accept either data formats now
function play(data) {
    var contentUrl;
    if (isComplexPlayData(data)) {
        var mediaId = data.mediaId, isLive = data.isLive;
        // Build a url from the complex data
        contentUrl = "https://sample.com/" + mediaId + ".mp4?live=" + isLive;
    }
    else {
        // Use simple url to play
        contentUrl = data;
    }
    // startVideoPlayback(contentUrl);
}
// Here we demonstrate using either
play('http://sample.com/myvideo.mp4');
play({
    mediaId: '93999r9f9399399f9',
    isLive: true
});
