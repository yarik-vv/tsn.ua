window.onload = function() {

  //shared insert video function, used for slider and video window
  function insertVideo (insertVideo, insertUrl) {
    insertVideo.innerHTML = '<video autoplay loop muted> <source src=' + insertUrl
    + ' type="video/mp4"> Вибачте, ваш браузер не підтрімує відео :( </video>';
  }

  //slider data
  var slides = [
    {
      name: 'slide1',
      video: '/video.mp4',
      img: false,
      badge: 'ТСН День',
      title:
        'Внаслідок потужного вибуху підземної труби у Києві ушкоджені машини та будівлі',
      data: '29 травня, 2017 14:05'
    },
    {
      name: 'slide2',
      video: false,
      badge: 'Світ',
      img: '/images/slide-2.jpg',
      title:
        'Макрон пригрозив Путіну посиленням санкцій у разі ескалації на Донбасі',
      data: '29 травня, 2017 19:00'
    },
    {
      name: 'slide3',
      video: false,
      badge: 'Світ',
      img: '/images/slide-3.jpg',
      title:
        'В Україні курить чверть дорослих: як відмовитися від згубної звички яка вбиваэ понад 6 ...',
      data: '29 травня, 2017 12:47'
    },
    {
      name: 'slide4',
      video: false,
      badge: 'Світ',
      img: '/images/slide-4.jpg',
      title:
        'В останній день весни Україну накриють потужні зливи з грозами та градом',
      data: '29 травня, 2017 12:11'
    },
    {
      name: 'slide5',
      video: false,
      badge: 'Світ',
      img: '/images/slide-5.jpg',
      title:
        "Убитий на Позняках чоловік був виконувачем обов'язків директора «Укрспирту»",
      data: '29 травня, 2017 12:11'
    }
  ];

  //slider controlls function
  var controll = document.getElementById('controll');
  controll.addEventListener('click', controlls);

  function controlls (event) {
    var idSlide = 0;

    if (event.target.nodeName === 'BUTTON') {
      clearControlls();
      idSlide = event.target.id;
      event.target.className = 'arrow slide active';
      select(idSlide);
    } else {
      if (event.target.id !== 'controll') {
        clearControlls();
        idSlide = event.target.parentNode.id;
        event.target.parentNode.className = 'arrow slide active';
        select(idSlide);
      }
    }
  }

  function clearControlls() {
    for (var a = 0; a < controll.childNodes.length; a++) {
      controll.childNodes[a].className = 'arrow slide';
    }
  }

  //slider select
  var slider = document.getElementById('slider');
  var videoSlide = document.querySelector('#slider .slider-video');
  var titleSlide = document.querySelector('#slider .title');
  var dataSlide = document.querySelector('#slider .datatime');
  var badgeSlide = document.querySelector('#slider .badge'); 

  //init slider
  var startSlide = slides[0];
  select(startSlide.name);

  //select slide function
  function select (slide) {
    for (var i = 0; i < slides.length; i++) {
      if (slide === slides[i].name) {
        if (slides[i].video === false) { 
          videoSlide.style.display = 'none';
          slider.style.background = 'url(' + slides[i].img + ')';
        } else {
          videoSlide.style.display = 'flex';
          slider.style.background = 'none';
          insertVideo (videoSlide, slides[i].video);
        }
          
        titleSlide.innerHTML = slides[i].title;
        badgeSlide.innerHTML = slides[i].badge;
        if (slides[i].name == 'slide1') {
          badgeSlide.style.color = 'red';
        }
        dataSlide.innerHTML = slides[i].data;
      }
    }
  }

  /* -------------- end slider code, start share window code ------------------ */

  //_ POPUP WINDOWS > _PUW SHARE
  var share = document.getElementById('share');
  var shareWindow = document.getElementById('share-window');
  var shareClose = document.getElementById('close');

  //open window
  share.onclick = function() {
    shareWindow.style.display = 'flex';
    document.onmousewheel = document.onwheel = function() {
      return false;
    };
    document.addEventListener('MozMousePixelScroll', function() {
      return false;
    }, false);
    document.onkeydown = function(e) {
      if (e.keyCode >= 33 && e.keyCode <= 40) return false;
    };
  };

  //close window
  shareClose.onclick = function() {
    shareWindow.style.display = 'none';
    document.onmousewheel = document.onwheel = function() {
      return true;
    };
    document.addEventListener('MozMousePixelScroll', function() {  
      return true;
    }, true);
    document.onkeydown = function(e) {
      if (e.keyCode >= 33 && e.keyCode <= 40) return true;
    };
  };

  /* -------------- end start share window code, start news menu code -------------- */

  //перемещение треугольника в меню новостей при ховере
  var newsMenu = document.querySelector('.news-menu');
  var style = document.createElement('style');

  document.head.appendChild(style);
  sheet = style.sheet;

  newsMenu.firstChild.onmouseover = function() {
    sheet.addRule('.news-menu::after', 'left: 47.5px');
  };
  newsMenu.firstChild.nextSibling.onmouseover = function() {
    sheet.addRule('.news-menu::after', 'left: 155px');
  };
  newsMenu.lastChild.onmouseover = function() {
    sheet.addRule('.news-menu::after', 'left: 251px');
  };

  /* --------- end news menu code, start video vindow code --------- */

  var videoWindow = document.getElementById('video-window');
  var videoWindowPlay = document.getElementsByClassName('play-in-window');
  var videoUrl = '/video.mp4';

  for (var i = 0; i < videoWindowPlay.length; i++) {
    videoWindowPlay[i].onclick = function() {
      videoWindow.style.display = 'flex';
      insertVideo (videoWindow, videoUrl);
    };
  }
};

/* --------- end onload window script, start menus scrooll transformation code --------- */

var topHead = document.getElementById('top-head');
var topMenu = document.getElementById('top-menu');
var topRight = document.getElementById('nav-right');
var topLogo = document.getElementById('top-logo');
var topLeft = document.getElementById('nav-left');
var wrapLogo = document.getElementById('wrap-logo');
var videoWindow = document.getElementById('video-window');

window.onscroll = function() {
  //затемнение  top head меню при скроле 70px _SCROLL > Above TOP MENU
  if (document.body.scrollTop > 70) {
    topHead.style.background = 'black';
  } else {
    topHead.style.background = 'transparent';
  }

  //меню с рубриками отлипает
  if (document.body.scrollTop > 400) {
    topMenu.parentNode.style.position = 'fixed';
    videoWindow.firstChild.style.top = '100px';
    topMenu.parentNode.style.zIndex = '2';
    topMenu.parentNode.style.top = '50px';
  } else {
    topHead.style.display = 'flex';
    topMenu.parentNode.style.zIndex = '0';
    topMenu.parentNode.style.position = 'absolute';
    topMenu.parentNode.style.top = '400px';
    videoWindow.firstChild.style.top = '50px';
  }

  if (document.body.scrollTop < 500 && document.body.scrollTop > 400) {
    topMenu.parentNode.style.top = '50px';
    topHead.style.display = 'flex';
  }

  //меню с рубриками трансформируеться в топ меню _SCROLL > After TOP MENU
  if (document.body.scrollTop > 500) {
    topMenu.parentNode.style.top = '0';
    topHead.style.display = 'none';
    videoWindow.firstChild.style.top = '50px';
    topMenu.parentNode.appendChild(topRight);
    wrapLogo.appendChild(topLogo);
    topMenu.parentNode.style.border = 'none';
    topMenu.parentNode.style.boxShadow = '0px 3px 5px 0px rgba(0, 0, 0, 0.75)';
  } else {
    topLeft.parentNode.appendChild(topRight);
    topHead.insertBefore(topLogo, topHead.firstChild);
    topMenu.parentNode.style.border = 'border-bottom: 1px solid #e6e6df';
    topMenu.parentNode.style.boxShadow = 'none';
  }
};
