const ctrl = {};

const fetch = require('node-fetch');

let videoAll = [];

const cheerio = require('cheerio');
const request = require('request-promise');

async function scrappViewedVideo(videoId) {
  const $ = await request({
    uri: `https://www.youtube.com/watch?v=${videoId}`,
    transform: body => cheerio.load(body)
  });
  const websiteTitle = $('[itemprop="interactionCount"]');
  return websiteTitle.attr('content');
}

ctrl.getVideos = async (req, res) => {
  let videoSearch = '';
  let videos = await require('../youtube-api').getYoutubeVideos(videoSearch);
  // console.log(videos.msgError);
  if(videos.msgError) {
    if(videos.msgError == 'error') {
      return res.json({message: videos.error.errors});
    }
  }
  // console.log(videos);
  // res.send(videos);
  res.render('index', {
    title: 'Youtube CV',
    videos,
    allVideos: true,
    search: ''
  });
}

ctrl.searchVideos = async (req, res) => {
  let videoSearch = req.query.q || '';
  let videos = await require('../youtube-api').getYoutubeVideos(videoSearch);
  res.render('index', {
    title: 'Youtube CV',
    videos,
    allVideos: true,
    search: videoSearch
  });
}

ctrl.moreVideos = async (req, res) => {
  let videoSearch = req.params.search;
  let videos = await require('../youtube-api').getYoutubeVideos(videoSearch, req.params.nextPage);
  res.send(videos);
}

ctrl.watchVideo = async (req, res) => {
  let videoId = req.query.v;
  // let channelId = req.query.ch;
  let response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${process.env.YOUTUBE_TOKEN}`);
  let video = await response.json();
  // console.log(video);
  if(video.error) {
    if(video.error.code == 403 || video.error.code == 404) {
      return res.json(video);
    }
  }
  
  // console.log(JSON.stringify(video));
  res.render('index', {
    videoId,
    allVideos: false,
    title: video.items[0].snippet.title,
    description: video.items[0].snippet.description,
    time: video.items[0].snippet.publishedAt,
    views: video.items[0].statistics.viewCount,
    likes: video.items[0].statistics.likeCount,
    dislikes: video.items[0].statistics.dislikeCount,
    channelTitle: video.items[0].snippet.channelTitle
  });
}

ctrl.getViews = async (req, res) => {
  let { videoId } = req.params;
  // let numViewers = await scrappViewedVideo(videoId);
  let response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${process.env.YOUTUBE_TOKEN}`);
  let video = await response.json();
  res.send(video);
}

module.exports = ctrl;