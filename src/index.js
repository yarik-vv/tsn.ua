window.onload = function() {
  //расчет длины для сайдбара
  var sidebarHeight = document.querySelector('.sidebar-wrap');
  sidebarHeight.style.height =
    document.querySelector('main').scrollHeight + 200 + 'px';

  /* -------------- end sidebar code, start slider code------------------ */

  //slider data
  var slides = [
    {
      name: 'slide1',
      src: '/images/slide-2.jpg',
      badge: 'ТСН День',
      title:
        'Внаслідок потужного вибуху підземної труби у Києві ушкоджені машини та будівлі',
      data: '29 травня, 2017 14:05'
    },
    {
      name: 'slide2',
      badge: 'Світ',
      src: '/images/slide-2.jpg',
      title:
        'Макрон пригрозив Путіну посиленням санкцій у разі ескалації на Донбасі',
      data: '29 травня, 2017 19:00'
    },
    {
      name: 'slide3',
      badge: 'Світ',
      src: '/images/slide-3.jpg',
      title:
        'В Україні курить чверть дорослих: як відмовитися від згубної звички яка вбиваэ понад 6 ...',
      data: '29 травня, 2017 12:47'
    },
    {
      name: 'slide4',
      badge: 'Світ',
      src: '/images/slide-4.jpg',
      title:
        'В останній день весни Україну накриють потужні зливи з грозами та градом',
      data: '29 травня, 2017 12:11'
    },
    {
      name: 'slide5',
      badge: 'Світ',
      src: '/images/slide-5.jpg',
      title:
        "Убитий на Позняках чоловік був виконувачем обов'язків директора «Укрспирту»",
      data: '29 травня, 2017 12:11'
    }
  ];

  //slider variables
  var videoSlide = document.getElementById('slide-video');
  var wrapSlide = document.getElementById('slider');
  var titleSlide = document.getElementById('slide-title');
  var dataSlide = document.getElementById('slide-data');
  var startSlide = slides[0];

  //start slider function
  var initSlider = function() {
    titleSlide.innerHTML = startSlide.title;
    dataSlide.innerHTML =
      '<span id="slide-badge" style="color:red">' +
      startSlide.badge +
      '</span>' +
      startSlide.data;
  };
  initSlider();

  //slider controlls function
  var controll = document.getElementById('controll');
  controll.addEventListener('click', controlls);

  function controlls(event) {
    var idSlide = 0;

    if (event.target.nodeName === 'BUTTON') {
      clearControlls();
      idSlide = event.target.id;
      event.target.className = 'arrow slide active';
      slider(idSlide);
    } else {
      if (event.target.id !== 'controll') {
        clearControlls();
        idSlide = event.target.parentNode.id;
        event.target.parentNode.className = 'arrow slide active';
        slider(idSlide);
      }
    }
  }

  function clearControlls() {
    for (var a = 0; a < controll.childNodes.length; a++) {
      controll.childNodes[a].className = 'arrow slide';
    }
  }

  //select slide function
  function slider(slide) {
    for (var i = 0; i < slides.length; i++) {
      if (slide === slides[i].name) {
        if (slides[i].name == 'slide1') {
          wrapSlide.style.background = 'none';
          videoSlide.style.display = 'block';
          titleSlide.innerHTML = slides[0].title;
          dataSlide.innerHTML =
            '<span id="slide-badge" style="color:red">' +
            slides[0].badge +
            '</span>' +
            slides[0].data;
        } else {
          videoSlide.style.display = 'none';
          wrapSlide.style.background = 'url(' + slides[i].src + ')';
          titleSlide.innerHTML = slides[i].title;
          dataSlide.innerHTML =
            '<span id="slide-badge" style="color:rgb(204, 204, 204)">' +
            slides[i].badge +
            '</span>' +
            slides[i].data;
        }
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
      videoWindow.innerHTML =
        '<video autoplay loop muted> <source src=' +
        videoUrl +
        ' type="video/mp4"> Ваш браузер не підтрімує відео</video>';
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
    // topMenu.parentNode.style.zIndex = '2';
  }

  if (document.body.scrollTop > 70 && document.body.scrollTop < 400) {
    //topHead.style.background = 'transparent';
    //topMenu.parentNode.style.zIndex = '0';
    topMenu.parentNode.style.zIndex = '1';
  }

  //меню с рубриками отлипает
  if (document.body.scrollTop > 400) {
    topMenu.parentNode.style.position = 'fixed';
    videoWindow.firstChild.style.top = '100px';
    topMenu.parentNode.style.zIndex = '3';
    topMenu.parentNode.style.top = '50px';
  } else {
    topHead.style.display = 'flex';
    //topMenu.parentNode.style.zIndex = '1';
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
