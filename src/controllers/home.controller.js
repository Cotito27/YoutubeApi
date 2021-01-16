const ctrl = {};

const fetch = require('node-fetch');

let videoAll = [];

ctrl.getVideos = async (req, res) => {
  let videoSearch = '';
  let videos = await require('../youtube-api').getYoutubeVideos(videoSearch);
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
  let title = req.query.title;
  let description = req.query.description;
  let time = req.query.time;
  // let channelId = req.query.ch;
  res.render('index', {
    videoId,
    title,
    description,
    time,
    allVideos: false
  });
}

module.exports = ctrl;