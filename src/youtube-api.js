const { google } = require('googleapis');
const fetch = require('node-fetch');

async function getVideo(videoId) {
  let response = await google.youtube('v3').search.list({
    key: process.env.YOUTUBE_TOKEN,
    part: 'snippet',
    relatedToVideoId: videoId,
    type: 'video'
  }).catch((err) => {
    console.log(err);
  });
  let data;
  if(response) {
    data = response.data;
  }
  if(!data) {
    data = [];
  }
  return data;
}

async function getYoutubeVideos(search, tokenPage) {
  // let response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_TOKEN}&part=snippet&maxResults=12&q=&type=video`).catch((err) => {
  //   console.log(err);
  // });
  let error = "";
  let response = await google.youtube('v3').search.list({
    key: process.env.YOUTUBE_TOKEN,
    part: 'snippet',
    maxResults: 12,
    q: search,
    pageToken: tokenPage || '',
    type: 'video',
  }).catch((err) => {
    error = err;
    console.log(err);
  });
  let data;
  if(response) {
    data = response.data;
  }
  // console.log(data);
  // if(data.nextPageToken) {
  //   console.log('Next Token: ' + data.nextPageToken);
  // }
  // if(data.prevPageToken) {
  //   console.log('Previous Token: ' + data.prevPageToken);
  // }
  // data.items.forEach((item) => {
  //   console.log(`Title: ${item.snippet.title}\nDescription: ${item.snippet.description}\nChannelId:${item.snippet.channelId}\nImg:${item.snippet.thumbnails.default.url}\nChannelTitle:${item.snippet.channelTitle}\nVideoId:${item.id.videoId} \n Id: ${JSON.stringify(item.snippet)}`);
  // });
  
  if(!data) {
    data = {
      msgError: 'error',
      error
    };
  }
  return data;
}

module.exports = { getYoutubeVideos, getVideo };