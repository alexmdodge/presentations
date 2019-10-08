// http://techslides.com/demos/sample-videos/small.mp4
// https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8

import { SimpleVideoPlayer } from './SimpleVideoPlayer'

const videoContainer = document.getElementById('svp-video-container')

const player = new SimpleVideoPlayer(videoContainer)

const loadMp4Button = document.getElementById('load-mp4')
loadMp4Button.addEventListener('click', () => {
  player.load('http://techslides.com/demos/sample-videos/small.mp4')
})

const loadM3u8Button = document.getElementById('load-m3u8')
loadM3u8Button.addEventListener('click', () => {
  player.load('https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8')
})