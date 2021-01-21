
$(document).ready(function() {
  // if(location.href.includes('/search?q=')) {
  //   $('.input__search').val(location.href.split('/search?q=')[1]);
  // }
  // localStorage.clear();
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

  let selectedRemoveVideoH = '';
  $('body').on('click', '.options__video__history', function(e) {
    let btnDeleteVideo = document.querySelector('.remove__video__history');
    btnDeleteVideo.style.left = getOffsetLeft(this) - 80 + 'px';
    btnDeleteVideo.style.top = getOffsetTop(this) - 5 + 'px';
    if(selectedRemoveVideoH == this.parentElement) {
      btnDeleteVideo.classList.toggle('d-none');
    } else {
      btnDeleteVideo.classList.remove('d-none');
    }
    // console.log(getOffsetLeft(this), getOffsetTop(this));
    selectedRemoveVideoH = this.parentElement;
    
    return e.stopPropagation();
  });

  $(window).on('resize', function() {
    let btnDeleteVideo = document.querySelector('.remove__video__history');
    if(btnDeleteVideo) {
      btnDeleteVideo.classList.add('d-none');
    }
  });

  $('body').on('click', '.remove__video__history', function() {
    let indexRemoved = vecData.findIndex((v) => v.videoId == selectedRemoveVideoH.dataset.videoId);
    vecData.splice(indexRemoved, 1);
    localStorage.setItem('history__videos__feed', JSON.stringify(vecData.reverse()));
    selectedRemoveVideoH.remove();
    this.classList.add('d-none');
    if(!$('.card__video')[0]) {
      $('.history__videos__content').html(`<div class="msg__notfound__items">
      <label>No se encontraron resultados.</label>
    </div>`);
    }
  });

  $(document).on("click.remove__video__history",function(event) {
    var target = $(event.target);   
    // console.log($('.grab_audio').hasClass('d-none'));
    if(!$('.remove__video__history').hasClass('d-none')) {
      if (!target.closest(".remove__video__history").length && !target.closest(".options__video__history").length) {
        // closeMenu(function() {
        //     $(document).off("click.grab_audio");
        // });
        $('.remove__video__history').addClass('d-none');
      }      
    }
  });

  $('body').on('click', '.btn__prev__panel', function() {
    $('.btn__prev__panel').attr('style', 'pointer-events: none;');
  });

  $('body').on('keyup', '.input__search__history', function(e) {
    if(this.value != "") {
      let newResponse = vecData.filter((v) => v.title.toUpperCase().includes(this.value.toUpperCase()));
      let html = "";
      let antDate = "";
      newResponse.forEach((item, i, arr) => {
        // let myDate = calcDateTime(new Date(item.myDate));
        let author = item.author;
        let image = item.image;
        let title = item.title;
        let videoId = item.videoId;
        let views = item.views;
        let dateTime = item.dateTime;
        let myDate = item.myDate;
        let fecha = new Date(myDate);
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        myDate = fecha.toLocaleDateString("es-ES", options);
        if(antDate != myDate) {
          html += `<div class="mydate__videos" data-context-date="${myDate}">
            ${myDate}
          </div>`;
          antDate = myDate;
        }
        
        html += `
          <div id="${videoId}" data-video-id="${videoId}" class="card__video wave">
          <div class="options__video__history">
              <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
          </div>
            <div class="info__video__yt">
              <div class="img__video">
                <img class="b-lazy" src="/img/placeholder-image.png" data-src="${image}" alt="">
              </div>
              <div class="title__video">
                ${title}
              </div>
              <div class="author__video">
                ${author}
              </div>
              <div class="date__video">
                <nav class="date__time">${dateTime}</nav>
              </div>
              <div class="date__video">
                <nav class="date__time">${views} visualizaciones</nav>
              </div>
            </div>
          </div>`;
         
      });
      if(html == '') {
        html = `<div class="msg__notfound__items">
          <label>No se encontraron resultados.</label>
        </div>`;
      }
      containerHistory.innerHTML = html;
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
      if($('.btn__search__history').html().includes('<i')) return;
      $('.btn__search__history').html(`<i class="fas fa-times"></i>`);
    } else {
      let html = '';
      let antDate = "";
      vecData.forEach((item, i, arr) => {
        // let myDate = calcDateTime(new Date(item.myDate));
        let author = item.author;
        let image = item.image;
        let title = item.title;
        let videoId = item.videoId;
        let views = item.views;
        let dateTime = item.dateTime;
        let myDate = item.myDate;
        let fecha = new Date(myDate);
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        myDate = fecha.toLocaleDateString("es-ES", options);
        if(antDate != myDate) {
          html += `<div class="mydate__videos" data-context-date="${myDate}">
            ${myDate}
          </div>`;
          antDate = myDate;
        }
        
        html += `
          <div id="${videoId}" data-video-id="${videoId}" class="card__video wave">
          <div class="options__video__history">
              <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
          </div>
            <div class="info__video__yt">
              <div class="img__video">
                <img class="b-lazy" src="/img/placeholder-image.png" data-src="${image}" alt="">
              </div>
              <div class="title__video">
                ${title}
              </div>
              <div class="author__video">
                ${author}
              </div>
              <div class="date__video">
                <nav class="date__time">${dateTime}</nav>
              </div>
              <div class="date__video">
                <nav class="date__time">${views} visualizaciones</nav>
              </div>
            </div>
          </div>`;
         
      });
      if(html == '') {
        html = `<div class="msg__notfound__items">
          <label>No se encontraron resultados en tu historial.</label>
          <button class="btn__prev__panel wave"><i class="fas fa-arrow-left"></i> <label>Regresar</label></button>
        </div>`;
      }
      containerHistory.innerHTML = html;
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
      if($('.btn__search__history').html().includes('<svg')) return;
      $('.btn__search__history').html(`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>`);
    }
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
      $('.content__up__scroll').removeClass('d-none');
    } else {
      $('.content__up__scroll').addClass('d-none');
    }
  }

  $('body').on('click', '.content__up__scroll', function() {
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
      color: #adadad !important;
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
  
    .remove__search {
      color: #e3e4e6 !important;
    }
  
    .menu__bars:hover,
    .remove__search:hover {
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
      color: #dadada;
    }

    .item__list__text:hover {
      background-color: rgb(75, 75, 75);
    }

    .delete__item__history {
      color: #3ea6ff;
    }

    .search__video__history {
      background-color: rgb(41, 41, 41);
    }
  
    .input__search__history::placeholder {
      color: rgb(180, 180, 180);
    }
  
    .input__search__history:focus {
      border: 1px solid #7a99bd;
    }    
  
    .btn__search__history {
      color: #d6d6d6;
    }
  
    .input__search__history {
      background-color: #222121;
    }
  
    .input__search__history {
      background-color: #212122;
      color: rgb(223, 221, 221);
    }
    
    .options__video__history:hover {
      background-color: #383838;
    }

    .content__save__video:hover {
      background-color: rgb(44, 44, 44);
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

  $('body').on('click', '.btn__search__history', function() {
    if($(this).html().includes('<i')) {
      $('.input__search__history').val('').focus();
      let html = '';
      let antDate = "";
      vecData.forEach((item, i, arr) => {
        // let myDate = calcDateTime(new Date(item.myDate));
        let author = item.author;
        let image = item.image;
        let title = item.title;
        let videoId = item.videoId;
        let views = item.views;
        let dateTime = item.dateTime;
        let myDate = item.myDate;
        let fecha = new Date(myDate);
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        myDate = fecha.toLocaleDateString("es-ES", options);
        if(antDate != myDate) {
          html += `<div class="mydate__videos" data-context-date="${myDate}">
            ${myDate}
          </div>`;
          antDate = myDate;
        }
        
        html += `
          <div id="${videoId}" data-video-id="${videoId}" class="card__video wave">
          <div class="options__video__history">
              <i class="fas fa-ellipsis-v" aria-hidden="true"></i>
          </div>
            <div class="info__video__yt">
              <div class="img__video">
                <img class="b-lazy" src="/img/placeholder-image.png" data-src="${image}" alt="">
              </div>
              <div class="title__video">
                ${title}
              </div>
              <div class="author__video">
                ${author}
              </div>
              <div class="date__video">
                <nav class="date__time">${dateTime}</nav>
              </div>
              <div class="date__video">
                <nav class="date__time">${views} visualizaciones</nav>
              </div>
            </div>
          </div>`;
         
      });
      if(html == '') {
        html = `<div class="msg__notfound__items">
          <label>No se encontraron resultados en tu historial.</label>
          <button class="btn__prev__panel wave"><i class="fas fa-arrow-left"></i> <label>Regresar</label></button>
        </div>`;
      }
      containerHistory.innerHTML = html;
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
      $(this).html(`<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16" role="img" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>`);
    }
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
      fill: rgb(194, 194, 194);
    }
  
    .remove__search {
      color: rgb(194, 194, 194) !important;
    }
  
    .menu__bars:hover,
    .remove__search:hover {
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
  
  $('body').on('click', '.content__save__video', function() {
    
  });

  $('body').on('click', '.btn__search', function() {
    let value = $('.input__search').val();
    if(value != "") {
      let verifyRepeat = history__search.find((v) => v == value);
        if(!verifyRepeat) {
          history__search.push(value);
          localStorage.setItem('history__feed', JSON.stringify(history__search));
        }
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
      <nav class="title__item__history">${item}</nav>
      <a class="delete__item__history">Eliminar</a>
    </div>`;
    });
    $('.drop__list__history').html(html);
  }

  $('body').on('click', '.item__list__text', function(e) {
    // console.log($(this).text());
    if(e.target.classList.contains('delete__item__history')) {
      let valueSelect = $(this).find('.title__item__history').text().trim();
      let indexDelete = history__search.indexOf(valueSelect);
      history__search.splice( indexDelete, 1 );
      localStorage.setItem('history__feed', JSON.stringify(history__search));
      return;
    }
    $('.input__search').val($(this).find('.title__item__history').text().trim());
    location.href = `/search?q=${$('.input__search').val()}`;
  });

  $('body').on('click', '.delete__item__history', function() {
    
  });
  
  $('body').on('keyup', '.input__search', function(e) {
    if($(this).val() != "") {
      let searchElements = history__search.filter((v) => v.toUpperCase().includes($(this).val().toUpperCase()) && v.toUpperCase() != $(this).val().toUpperCase());
      if(searchElements.length >= 1) {
        ajustSizeListHistory(this);
      } else {
        let newElem = document.querySelector('.drop__list__history');
        newElem.classList.add('d-none');
      }
      addItemsHistory(searchElements);
      // console.log(searchElements);
      $('.btn__clean').removeClass('d-none');
    } else {
      if(history__search.length >= 1) {
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
    // ajustSizeListHistory(this);
    // console.log(history__search);
    // if(!history__search) {
    //   history__search = [];
    // }
    if($(this).val() != "") {
      let searchElements = history__search.filter((v) => v.toUpperCase().includes($(this).val().toUpperCase()) && v.toUpperCase() != $(this).val().toUpperCase());
      if(searchElements.length >= 1) {
        ajustSizeListHistory(this);
      } else {
        let newElem = document.querySelector('.drop__list__history');
        newElem.classList.add('d-none');
      }
      addItemsHistory(searchElements);
      // console.log(searchElements);
      $('.btn__clean').removeClass('d-none');
    } else {
      if(history__search.length >= 1) {
        ajustSizeListHistory(this);
      } else {
        let newElem = document.querySelector('.drop__list__history');
        newElem.classList.add('d-none');
      }
      addItemsHistory(history__search);
      // console.log(history__search);
      $('.btn__clean').addClass('d-none');
    }
    if(window.innerWidth <= 580) {
      $('.menu__bars').addClass('d-none');
      $('.remove__search').removeClass('d-none');
      $('.block__search').removeClass('d-none');
      $('body').addClass('ov__hidden');
    }
    
  });

  $('body').on('blur', '.input__search', function() {
    let newElem = document.querySelector('.drop__list__history');
    setTimeout(() => {
      newElem.classList.add('d-none');
    }, 100);
    if(window.innerWidth <= 580) {
      $('.menu__bars').removeClass('d-none');
      $('.remove__search').addClass('d-none');
      $('.block__search').addClass('d-none');
      $('body').removeClass('ov__hidden');
    }
  });

  $('body').on('click', '.remove__search', function() {
    // console.log('asfa');
    $('.menu__bars').removeClass('d-none');
    $('.remove__search').addClass('d-none');
    $('.block__search').addClass('d-none');
    $('body').removeClass('ov__hidden');
    $('.input__search').blur();
  });
  let history__search = [];
  if(localStorage.getItem('history__feed')) {
    history__search = JSON.parse(localStorage.getItem('history__feed'))
  }

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
  let history__videos = [];
  if(localStorage.getItem('history__videos__feed')) {
    history__videos = JSON.parse(localStorage.getItem('history__videos__feed'));
  }
  function addVideoInHistory(videoId, title, views, dateTime, image, author, myDate) {
    history__videos.push({
      videoId,
      title,
      views,
      dateTime,
      image,
      author,
      myDate
    });
    localStorage.setItem('history__videos__feed', JSON.stringify(history__videos));
  }

  if(location.href.includes('watch?v=')) {
    // const valores = window.location.search;
    // //Creamos la instancia
    // const urlParams = new URLSearchParams(valores);

    // //Accedemos a los valores
    // var videoIdSave = urlParams.get('v');
    
    let card__view__video = document.querySelector('.card__view__video');
    let videoId = card__view__video.dataset.videoId;
    let verifyRepeat = history__videos.find((v) => v.videoId == videoId);
    if(!verifyRepeat) {
      let image = card__view__video.dataset.targetImage;
      let title = card__view__video.querySelector('.title__view').textContent.trim();
      let views = card__view__video.querySelector('.number__views').textContent.trim();
      let dateTime = card__view__video.querySelector('.time__view').textContent.trim();
      let author = card__view__video.querySelector('.author__view').textContent.trim();
      let myDate = new Date();
      addVideoInHistory(videoId, title, views, dateTime, image, author, myDate);
    } else {
      let numberKey = history__videos.findIndex((v) => v.videoId == videoId);
      history__videos.splice(numberKey, 1);
      let image = card__view__video.dataset.targetImage;
      let title = card__view__video.querySelector('.title__view').textContent.trim();
      let views = card__view__video.querySelector('.number__views').textContent.trim();
      let dateTime = card__view__video.querySelector('.time__view').textContent.trim();
      let author = card__view__video.querySelector('.author__view').textContent.trim();
      let myDate = new Date();
      addVideoInHistory(videoId, title, views, dateTime, image, author, myDate);
    }
    
  }
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