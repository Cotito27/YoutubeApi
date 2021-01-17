
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
        location.href = `/watch?v=${thisEvent.dataset.videoId}`;
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
  
  $('body').on('click', '.select__theme__menu', function() {
    document.getElementById("myDropdown").classList.toggle("show");
    if($('#myDropdown').hasClass('show')) {
      $('.show__theme').html(`<i class="fas fa-caret-down"></i>`);
    } else {
      $('.show__theme').html(`<i class="fas fa-caret-right"></i>`);
    }
  });

  window.onscroll = function() {
    if(isMobile()) {
      $('.input__search').blur();
    }
    if(this.scrollY > 50) {
      $('.btn__up__scroll').removeClass('d-none');
    } else {
      $('.btn__up__scroll').addClass('d-none');
    }
  }

  $('body').on('click', '.btn__up__scroll', function() {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  });

  $('body').on('click', '.exec__theme__dark', function() {
    if($('#theme-dark')[0]) return;
    $('head').append(`<style id="theme-dark">
    body {
      background-color: #181818;
      color: whitesmoke;
    }

    .navbar,
    .container__sidebar {
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
    .time__view,
    .views__view,
    .statistics__view {
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

    .link__view {
      color: #3ea6ff;
    }

    .info__primary__view {
      border-bottom: 1px solid rgba(255, 255, 255, 0.144);
    }

    .card__view__video .description__view {
      color: #dedede;
    }
    
    .view__details__description {
      background-color: #181818;
    }
    
    .more__details {
      color: #8f8f8f;
    }

    .more__details:hover {
      background-color: #3f3e3e;
      color: #ebe9e9;
    }

    .menu__bars {
      fill: #e3e4e6;
    }

    .menu__bars:hover {
      background-color: rgb(68, 67, 67);
    }

    .options__menu .item__menu {
      color: #bbb9b9;
    }

    .options__menu i {
      color: #b8b8b8;
    }

    .options__menu .item__menu:hover {
      background-color: rgb(63, 63, 63);
    }

    .dropdown-content {
      background-color: rgb(39, 38, 38);
    }

    .btn__clean {
      color: #e2e2e2;
    }

    .drop__list__history {
      background-color: rgb(56, 56, 56);
    }
  
    .item__list__text {
      padding: 5px 10px;
      color: #dadada;
      cursor: pointer;
    }

    .item__list__text:hover {
      background-color: rgb(75, 75, 75);
    }
    </style>`);
    $('.check__select__light').addClass('d-none');
    $('.check__select__dark').removeClass('d-none');
    localStorage.theme = 'dark';
  });

  $('body').on('click', '.exec__theme__light', function() {
    $('#theme-dark').remove();
    $('.check__select__dark').addClass('d-none');
    $('.check__select__light').removeClass('d-none');
    localStorage.theme = 'light';   
  });

  $('body').on('click', '.content__theme', function(e) {
    if(this.innerHTML.includes('Modo Oscuro')) {
      $(this).data('wave-color', '#202020');
    } else {
      $(this).removeData('wave-color');
    }
   setTimeout(() => {
     // let darkTheme = document.querySelector('#dark-theme');
    
     if(this.innerHTML.includes('Modo Oscuro')) {
      $('head').append(`<style id="theme-dark">
    body {
      background-color: #181818;
      color: whitesmoke;
    }

    .navbar,
    .container__sidebar {
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
    .time__view,
    .views__view,
    .statistics__view {
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

    .link__view {
      color: #3ea6ff;
    }

    .info__primary__view {
      border-bottom: 1px solid rgba(255, 255, 255, 0.144);
    }

    .card__view__video .description__view {
      color: #dedede;
    }
    
    .view__details__description {
      background-color: #181818;
    }
    
    .more__details {
      color: #8f8f8f;
    }

    .more__details:hover {
      background-color: #3f3e3e;
      color: #ebe9e9;
    }

    .menu__bars {
      fill: #e3e4e6;
    }

    .menu__bars:hover {
      background-color: rgb(68, 67, 67);
    }

    .options__menu .item__menu {
      color: #bbb9b9;
    }

    .options__menu i {
      color: #b8b8b8;
    }

    .options__menu .item__menu:hover {
      background-color: rgb(63, 63, 63);
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
    this.style.pointerEvents = 'auto';
   }, 500);
   this.style.pointerEvents = 'none';
  });
 
  $('body').on('click', '.btn__search', function() {
    let value = $('.input__search').val();
    if(value != "") {
      history__search.push(value);
      localStorage.setItem('history__feed', history__search);
      localStorage.searchHistory = value;
      location.href = `/search?q=${value}`;
    } 
  });

  $(document).on("click.container__sidebar",function(event) {
    var target = $(event.target);   
    // console.log($('.grab_audio').hasClass('d-none'));
    if(!$('.container__sidebar').hasClass('d-none')) {
      if (!target.closest(".container__sidebar").length && !target.closest(".menu__bars").length) {
        // closeMenu(function() {
        //     $(document).off("click.grab_audio");
        // });
        $('.container__sidebar').addClass('d-none');
        $('.block__container').addClass('d-none');
        $('body').removeClass('ov__hidden');
      }      
    }
  });

  $('body').on('click', '.menu__bars', function() {
      $('.container__sidebar').toggleClass('d-none');
      $('.block__container').toggleClass('d-none');
      $('body').toggleClass('ov__hidden');
  });

  $('body').on('click', '.more__details', function() {
    
    if(this.innerHTML == 'MOSTRAR MÁS') {
      $('.description__view').attr('style', 'max-height: 100%;');
      this.innerHTML = 'MOSTRAR MENOS';
    } else {
      $('.description__view').attr('style', 'max-height: 60px;');
      this.innerHTML = 'MOSTRAR MÁS';
    }
  });

    function getOffsetLeft( elem )
  {
        var offsetLeft = 0;
        do {
          if ( !isNaN( elem.offsetLeft ) )
          {
              offsetLeft += elem.offsetLeft;
          }
        } while( elem = elem.offsetParent );
        return offsetLeft;
  }

  function getOffsetTop( elem )
  {
        var offsetTop = 0;
        do {
          if ( !isNaN( elem.offsetTop ) )
          {
              offsetTop += elem.offsetTop;
          }
        } while( elem = elem.offsetParent );
        return offsetTop;
  }

  function ajustSizeListHistory(eve) {
      let elem = eve;
      let newElem = document.querySelector('.drop__list__history');
      let btn__search = document.querySelector('.btn__search');
      newElem.classList.remove('d-none');
      newElem.style.top = '55' + 'px';
      // $(newElem).attr('style', `width: 222px !important;`);
      newElem.style.left = getOffsetLeft(elem) + 'px';
      newElem.style.width = elem.offsetWidth - btn__search.offsetWidth + 'px';
  }

  function addItemsHistory(arr) {
    let html = "";
    arr.forEach((item) => {
      html += `<div class="item__list__text">
      ${item}
    </div>`;
    });
    $('.drop__list__history').html(html);
  }

  $('body').on('click', '.item__list__text', function() {
    // console.log($(this).text());
    $('.input__search').val($(this).text().trim());
    location.href = `/search?q=${$('.input__search').val()}`;
  });
  
  $('body').on('keyup', '.input__search', function(e) {
    if($(this).val() != "") {
      let searchElements = history__search.filter((v) => v.toUpperCase().includes($(this).val().toUpperCase()) && v.toUpperCase() != $(this).val().toUpperCase());
      if(searchElements.length) {
        ajustSizeListHistory(this);
      } else {
        let newElem = document.querySelector('.drop__list__history');
        newElem.classList.add('d-none');
      }
      addItemsHistory(searchElements);
      // console.log(searchElements);
      $('.btn__clean').removeClass('d-none');
    } else {
      if(history__search.length) {
        ajustSizeListHistory(this);
      } else {
        let newElem = document.querySelector('.drop__list__history');
        newElem.classList.add('d-none');
      }
      addItemsHistory(history__search);
      // console.log(history__search);
      $('.btn__clean').addClass('d-none');
    }
  });

  $('body').on('focus', '.input__search', function() {
    ajustSizeListHistory(this);
    if($(this).val() != "") {
      let searchElements = history__search.filter((v) => v.toUpperCase().includes($(this).val().toUpperCase()) && v.toUpperCase() != $(this).val().toUpperCase());
      if(searchElements.length) {
        ajustSizeListHistory(this);
      } else {
        let newElem = document.querySelector('.drop__list__history');
        newElem.classList.add('d-none');
      }
      addItemsHistory(searchElements);
      // console.log(searchElements);
      $('.btn__clean').removeClass('d-none');
    } else {
      if(history__search.length) {
        ajustSizeListHistory(this);
      } else {
        let newElem = document.querySelector('.drop__list__history');
        newElem.classList.add('d-none');
      }
      addItemsHistory(history__search);
      // console.log(history__search);
      $('.btn__clean').addClass('d-none');
    }
  });

  $('body').on('blur', '.input__search', function() {
    let newElem = document.querySelector('.drop__list__history');
    setTimeout(() => {
      newElem.classList.add('d-none');
    }, 100);
  });
  
  let history__search = JSON.parse(localStorage.getItem('history__feed')) || [];

  $('body').on('click', '.btn__clean', function() {
    $('.input__search').val('').focus();
    $(this).addClass('d-none');
    
  });

  $('body').on('keydown', '.input__search', function(e) {
    
    if(e.keyCode == 13) {
      e.preventDefault();
      let value = $(this).val();
      if(value != "") {
        let verifyRepeat = history__search.find((v) => v == value);
        if(!verifyRepeat) {
          history__search.push(value);
          localStorage.setItem('history__feed', JSON.stringify(history__search));
        }
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

  function convertValDec(value) {
    return value.replace(/\D/g, "")
      .replace(/([0-9])([0-9]{3})$/, '$1.$2')
      .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ".");
  }

  

  async function getViews(videoId) {
    let response = await fetch(`/getViews/${videoId}`);
    let res = await response.json();
    console.log(res);
    let views = convertValDec(res.items[0].statistics.viewCount);
    let number__views = document.querySelector('.number__views');
    let description__view = document.querySelector('.description__view');
    description__view.innerHTML = res.items[0].snippet.description.replace(/\n/g, '<br>');
    number__views.textContent = views;
  }

  let container__view = document.querySelector('.container__view');
  // getViews(container__view.dataset.videoId);
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