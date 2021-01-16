
$(document).ready(function() {
  // if(location.href.includes('/search?q=')) {
  //   $('.input__search').val(location.href.split('/search?q=')[1]);
  // }
  
  function updateTime() {
    let videosDate = document.querySelectorAll('.dateTime__video');
    videosDate.forEach((item) => {
      let date = new Date(item.value);
      let calcTime = timeago.format(date, 'es');
      item.parentElement.querySelector('.date__time').textContent = calcTime;
      // item.parentElement.parentElement.parentElement.dataset.time = calcTime;
    });
  }
  updateTime();
  $('body').on('click', '.wave', function(e) {
		e.preventDefault();
    let thisEvent = this;
		let $waveElement = $('<span class="wave-effect" />'),
			$buttonElement = $(this),
			btnOffset = $buttonElement.offset(),
			xPos = e.pageX - btnOffset.left,
			yPos = e.pageY - btnOffset.top,
			size = parseInt(Math.min($buttonElement.height(), $buttonElement.width()) * 0.5),
			animateSize = parseInt(Math.max($buttonElement.height(), $buttonElement.width()) * Math.PI);
			
		$waveElement.css({
			top: yPos,
			left: xPos,
			width: size,
			height: size,
			backgroundColor: $buttonElement.data('wave-color')
		})
		.appendTo($buttonElement)
		.animate({
			width: animateSize,
			height: animateSize,
			opacity: 0
		}, 500, function() {
      $(this).remove();
      // if(thisEvent.href == undefined || thisEvent.href.indexOf('#') == thisEvent.href.length - 1) return;
      // if(thisEvent.target == '_blank') {
      //   window.open(thisEvent.href, '_blank');
      //   return;
      // }
      // location.href = thisEvent.href;
      if(thisEvent.classList.contains('card__video')) {
        location.href = `/watch?v=${thisEvent.dataset.videoId}&title=${thisEvent.dataset.title}&description=${thisEvent.dataset.description}&time=${thisEvent.dataset.time}`;
      } else if(thisEvent.classList.contains('logo__youtubecv')) {
        location.href = '/';
      } else if(thisEvent.classList.contains('btn__prev__panel')) {
        window.history.back();
      }
		});
  });

  function ajustTimeView() {
    let timesView = document.querySelectorAll('.time__view');
    timesView.forEach((item) => {
      let fecha = new Date(item.textContent.trim());
      let options = { year: 'numeric', month: 'long', day: 'numeric' };
      item.textContent = fecha.toLocaleDateString("es-ES", options);
      // console.log(
      //   fecha.toLocaleDateString("es-ES", options)
      // );
    });
    
  }
  ajustTimeView();

  function isMobile(){
    return (
        (navigator.userAgent.match(/Android/i)) ||
        (navigator.userAgent.match(/webOS/i)) ||
        (navigator.userAgent.match(/iPhone/i)) ||
        (navigator.userAgent.match(/iPod/i)) ||
        (navigator.userAgent.match(/iPad/i)) ||
        (navigator.userAgent.match(/BlackBerry/i))
    );
  }
  if(!isMobile()) {
    // $('body').on('mouseenter', '.card__video', function() {
    //   let videoId = this.dataset.videoId;
    //   let playerElem = document.querySelector('#player');
    //   playerElem.onload = function() {
    //     // console.log(this.contentWindow.document);
    //   }
    //   $(this).find('iframe').removeClass('d-none');
    //   $(this).find('.info__video__yt').addClass('d-none');
    //   $(this).find('iframe').attr('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
    // });
    // $('body').on('mouseleave', '.card__video', function() {
    //   let videoId = this.dataset.videoId;
    //   let playerElem = document.querySelector('#player');
    //   playerElem.onload = function() {
    //     // console.log(this.contentWindow.document);
    //   }
    //   $(this).find('.info__video__yt').removeClass('d-none');
    //   $(this).find('iframe').addClass('d-none');
    //   $(this).find('iframe').removeAttr('src');
    // });
  }
  
  $('body').on('click', '.content__theme', function() {
    // let darkTheme = document.querySelector('#dark-theme');
    
    if(this.innerHTML.includes('Modo Oscuro')) {
      $('head').append(`<style id="theme-dark">
    body {
      background-color: #181818;
      color: whitesmoke;
    }

    .navbar {
      background-color: #202020;
    }

    .logo__youtubecv #youtube-paths path {
      fill: whitesmoke;
    }

    .search__video input {
      background-color: #121212;
      color: whitesmoke;
      border-bottom: 1px solid whitesmoke;
    }

    .search__video input::placeholder {
      color: #acacac;
    }

    .theme__app {
      background-color: #181818;
    }

    .date__time,
    .time__view {
      color: #8f8f8f !important;
    }

    .logo__youtubecv:hover {
      background-color: #353535;
    }

    .card__video:hover {
      background-color: #313131;
    }

    .author__video {
      color: #dbdbdb;
    }

    .pace .pace-progress {
      background: #2299dd !important;
    }
    </style>`);
      this.innerHTML = `Modo Claro &nbsp; <i class="far fa-sun"></i>`;
      localStorage.theme = 'dark';
    } else {
        $('#theme-dark').remove();
        this.innerHTML = `Modo Oscuro &nbsp; <i class="far fa-moon"></i>`;
        localStorage.theme = 'light';      
    }
    this.classList.toggle('btn__theme__light');
    // if($('#dark-theme').attr('href')) {
    //   $('#dark-theme').removeAttr('href');
    // } else {
    //   $('#dark-theme').attr('href', '/css/theme-dark.css');
    // }
  });
 
  $('body').on('click', '.btn__search', function() {
    let value = $('.input__search').val();
    if(value != "") {
      localStorage.searchHistory = value;
      location.href = `/search?q=${value}`;
    } 
  });

  $('body').on('keydown', '.input__search', function(e) {
    if(e.keyCode == 13) {
      e.preventDefault();
      let value = $(this).val();
      if(value != "") {
        localStorage.searchHistory = value;
        location.href = `/search?q=${value}`;
      } 
    }
  });

  $('body').on('click', '.btn__moreVideos', async function() {
    this.innerHTML = `<div class="la-ball-clip-rotate la-light la-sm">
    <div></div>
</div>`;
    $(this).attr('disabled', 'disabled');
    let response = await fetch(`/moreVideos/${this.dataset.nextPage}/${$('.input__search').val() || null}`);
    let videos = await response.json();
    videos.items.forEach((item) => {
      $('.card__body').append(`<div id="${item.id.videoId}" data-video-id="${item.id.videoId}" data-channel-id="${item.snippet.channelId}" class="card__video wave">
    <div class="info__video__yt">
      <div class="img__video">
        <img class="b-lazy" src="/img/placeholder-image.png" data-src="${item.snippet.thumbnails.high.url}" alt="${item.snippet.title}">
      </div>
      <div class="title__video">
        ${item.snippet.title}
      </div>
      <div class="author__video">
        ${item.snippet.channelTitle}
      </div>
      <div class="date__video">
        <nav class="date__time"></nav>
        <input type="hidden" value="${item.snippet.publishedAt}" class="dateTime__video">
      </div>
    </div>
    <iframe src="" class="d-none" id="player" allow='autoplay'></iframe>
  </div>`);
    });
    
    this.dataset.nextPage = videos.nextPageToken || '';
    this.innerHTML = 'Ver más';
    $(this).removeAttr('disabled');
    var bLazy2 = new Blazy({
      offset: 40
      , success: function(element){
      setTimeout(function(){
      // We want to remove the loader gif now.
      // First we find the parent container
      // then we remove the "loading" class which holds the loader image
      // var parent = element.parentNode;
      // // console.log(parent);
      // parent.className = parent.className.replace(/\bloading\b/,'');
      }, 200);
        },error: (err) => {
          alert(err)
        },
    });
      setTimeout(function() {
        var bLazy2 = new Blazy({
          offset: 40
          , success: function(element){
          setTimeout(function(){
          // We want to remove the loader gif now.
          // First we find the parent container
          // then we remove the "loading" class which holds the loader image
          // var parent = element.parentNode;
          // // console.log(parent);
          // parent.className = parent.className.replace(/\bloading\b/,'');
          }, 200);
            },error: (err) => {
              alert(err)
            },
        });
      }, 300);
      updateTime();
  });
  

});

window.onload = function() {
  
  var bLazy = new Blazy({
    offset: 40
    , success: function(element){
    setTimeout(function(){
    // We want to remove the loader gif now.
    // First we find the parent container
    // then we remove the "loading" class which holds the loader image
    // var parent = element.parentNode;
    // // console.log(parent);
    // parent.className = parent.className.replace(/\bloading\b/,'');
    }, 200);
      },error: (err) => {
        alert(err)
      },
  });

  window.onresize = function() {
    var bLazy = new Blazy({
      offset: 40
      , success: function(element){
      setTimeout(function(){
      // We want to remove the loader gif now.
      // First we find the parent container
      // then we remove the "loading" class which holds the loader image
      // var parent = element.parentNode;
      // // console.log(parent);
      // parent.className = parent.className.replace(/\bloading\b/,'');
      }, 200);
        },error: (err) => {
          alert(err)
        },
    });
  }
}