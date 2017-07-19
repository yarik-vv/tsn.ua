window.onload = function() {

  /* -------------- start shared functions code ------------------ */

  //общая функия запроса для галереи, слайдера и подгрузки новостей правого сайдба
  function AJAXrequest(url, method){
    return new Promise(function(resolve, reject) {

      var request = new XMLHttpRequest();
      
      //обработываем ответ
      request.onreadystatechange = function() {
        if(request.readyState === 4) {
          if(request.status === 200){
            resolve(this.responseText);
          }
          else{
            reject(this.responseText);
          }
        }
      };   

      //открываем запрос
      request.open(method, url, true);

      //CORS заголовки для сервера
        //request.withCredentials = true;
        //request.open('POST', 'http://player.hosting.1plus1.ua/tests/fe/imgGallery.php', true);
        //request.setRequestHeader("Access-Control-Allow-Origin", "http://127.0.0.1:9000");
        //request.setRequestHeader("Access-Control-Allow-Headers", "Origin, Content-type");
        

      //посылаем запрос
      request.send();
    })
  };

  //общая функция вставки видео для слайдера и окна с видео 
  function insertVideo(insertVideo, insertUrl) {
    insertVideo.innerHTML = '<video autoplay loop muted> <source src=' +
      insertUrl + ' type="video/mp4"> Вибачте, ваш браузер не підтрімує відео :( </video>';
  }

  /* -------------- end shared functions code, start search button code ------------------ */

  var searchInput = document.querySelector('#nav-right form input');
  var search = document.querySelector('#nav-right form');
  var searchButton = document.getElementById('search');

  searchButton.onclick = activeForm

  //при клике на кнопку поиска
  function activeForm(){
    //показываем форму
    searchInput.className = 'input-active';
    searchButton.className = 'button-active';
    //вешаем фокус на инпут
    searchInput.focus();
    //кнопка поиска наша стает сабмит кнопкой для формы
    searchButton.onclick = function (){
      search.submit();
    }
  }

  //проверяем после потери фокуса, или текст не был введен
  searchInput.onblur = function (){
    if (searchInput.value === '') {
      //если текста нет, то скрываем форму и выключааем сабмит у кнопки поиска
      searchInput.className = ' ';
      searchButton.className = ' ';
      searchButton.onclick = activeForm;
    }
  }

  /* -------------- end search button code , start slider code ------------------ */

  //slider data
  var slides = [
    {
      name: 'slide1',
      video: 'video.mp4',
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
      img: 'images/slide-2.jpg',
      title:
        'Макрон пригрозив Путіну посиленням санкцій у разі ескалації на Донбасі',
      data: '29 травня, 2017 19:00'
    },
    {
      name: 'slide3',
      video: false,
      badge: 'Світ',
      img: 'images/slide-3.jpg',
      title:
        'В Україні курить чверть дорослих: як відмовитися від згубної звички яка вбиваэ понад 6 ...',
      data: '29 травня, 2017 12:47'
    },
    {
      name: 'slide4',
      video: false,
      badge: 'Світ',
      img: 'images/slide-4.jpg',
      title:
        'В останній день весни Україну накриють потужні зливи з грозами та градом',
      data: '29 травня, 2017 12:11'
    },
    {
      name: 'slide5',
      video: false,
      badge: 'Світ',
      img: 'images/slide-5.jpg',
      title:
        "Убитий на Позняках чоловік був виконувачем обов'язків директора «Укрспирту»",
      data: '29 травня, 2017 12:11'
    }
  ];

  var slider = document.getElementById('slider');
  var videoSlide = document.querySelector('#slider .slider-video');
  var titleSlide = document.querySelector('#slider .title');
  var dataSlide = document.querySelector('#slider .datatime');
  var badgeSlide = document.querySelector('#slider .badge');


  //вешаем событие на блок управления слайдера
  var controll = document.getElementById('controll');
  controll.addEventListener('click', controlls);

  function controlls(event) {
    var idSlide = 0;

    //проверяем, что была нажата кнопка слайдера, 
    if (event.target.nodeName === 'BUTTON') {
      //узнаем айди слайда
      idSlide = event.target.id;
      //передаем айди в функцию включения слайда
      select(idSlide);
      //убираем все активные кнопки
      clearControlls();
      //делаем активной кнопку
      event.target.className = 'arrow slide active';

    } else {
      //если нажатым был елемент кнопки
      if (event.target.id !== 'controll') {
        clearControlls();
        idSlide = event.target.parentNode.id;
        event.target.parentNode.className = 'arrow slide active';
        select(idSlide);
      }
    }
  }
  //функция деактивации кнопок
  function clearControlls() {
    for (var a = 0; a < controll.childNodes.length; a++) {
      controll.childNodes[a].className = 'arrow slide';
    }
  }

  //запускаем слайдер
  var startSlide = slides[0];
  select(startSlide.name);

  //функция переключеня слайдов
  function select(slide) {
    for (var i = 0; i < slides.length; i++) {
      //ищем нужный слайд
      if (slide === slides[i].name) {
        //проверяем есть ли в нем видео если есть то добавляем видео
        if (slides[i].video === false) {
          videoSlide.style.display = 'none';
          slider.style.background = 'url(' + slides[i].img + ') center';
          slider.style.backgroundSize = 'cover';
        } else {
          //если нет то картинку
          videoSlide.style.display = 'flex';
          slider.style.background = 'none';
          insertVideo(videoSlide, slides[i].video);
        }

        //добавляем информацию о слайде
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
  var shareClose = document.getElementById('close-share');

  //функция открытия окна
  share.onclick = function() {

    //открываем само окно, затемняем фон
    window.scroll(0,0);
    shareWindow.style.display = 'flex';
    shareWindow.style.height = document.body.scrollHeight + 'px';

    //отключаем скролл
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

  //функция закрытия окна
  shareClose.onclick = function() {

    //закрываем само окно и тень
    shareWindow.style.display = 'none';

    //включаем скролл
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

  //добавляем тег стайл, потому, что напрямую псевдоелемент ::after поменять нельзя
  document.head.appendChild(style);
  sheet = style.sheet;

  //в зависимости от меню передвигаем треугольник
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

  var videoWindowWrap = document.querySelector('#video-window');
  var videoWindow = document.querySelector('#video-window div');
  var videoWindowPlay = document.getElementsByClassName('play-in-window');
  var videoWindowClose = document.getElementById('close-video');
  var videoUrl = 'video.mp4';
  var playInWindowButton = null;
  var shadowPoster = null;

  //вешаем событие клика на все кнопки открытия видео в окне
  for (var i = 0; i < videoWindowPlay.length; i++) {
    videoWindowPlay[i].addEventListener('click', playInWindowOpen);
  }

  //функция окрытия окна
  function playInWindowOpen(event) {

    //закрываем предыдущее оуно если оно было открыто
    if (videoWindowWrap.style.display === 'flex') {
      playInWindowClose();
    }

    //иницилизируем переменные относительно вызова клика
    if (event.target.nodeName === 'svg') {
      shadowPoster = event.target.previousSibling;
      playInWindowButton = event.target;
    } else{
      shadowPoster = event.target.parentNode.previousSibling;
      playInWindowButton = event.target.parentNode;      
    }

    //показываем тень, скрываем кнопки, открываем окно и вставляем видео
    shadowPoster.style.background = 'black';
    shadowPoster.firstChild.style.display = 'flex';   
    playInWindowButton.nextSibling.style.display = 'none';
    playInWindowButton.style.display = 'none';
    videoWindowWrap.style.display = 'flex';
    insertVideo(videoWindow, videoUrl);

    //вешаем событие на кнопку закрытия окна
    videoWindowClose.addEventListener('click', playInWindowClose);

    //функция закрытия окна
    function playInWindowClose(event) {
      videoWindowWrap.style.display = 'none';
      shadowPoster.style.background = 'transparent';
      shadowPoster.firstChild.style.display = 'none';
      playInWindowButton.nextSibling.style.display = 'flex';
      playInWindowButton.style.display = 'flex';
    }
  }

  /* --------- end video vindow code, start gallery vindow code --------- */

  var galleryPreview = document.querySelector('.gallery .preview');
  var galleryWrap = document.querySelector('.gallery');
  var galleryOpenButton = document.getElementsByClassName('open-gallery');
  var galleryClose = document.getElementById('close-gallery');
  var galleryTitle = document.querySelector('.gallery h1');
  var galleryView = document.querySelector('.gallery .view');
  var previewImage = document.createElement('img');


  //вешаем событие клика на все кнопки открытия галереи
  for (var i = 0; i < galleryOpenButton.length; i++) {
    console.log(galleryOpenButton[i])
    galleryOpenButton[i].addEventListener('click', galleryOpen);
  }

  function galleryOpen(event) {
    //делаем запрос, если состоялся - открываем галерею, нет - то выводим ошибку запроса
    AJAXrequest('./imgGallery.json', 'GET')
      .then(
        function (result) {
          //получаем данные и парсим
          var dataGallery = JSON.parse(result);
          dataGallery = dataGallery[0].gallery;
 
          //очищаем прошлую открытую галерею, если она была
          galleryTitle.innerHTML = ' ';
          while (galleryPreview.firstChild) {
            galleryPreview.removeChild(galleryPreview.firstChild);
          }

          //строим галерею
          preview(dataGallery);  

          //открываем и иниицлизируем первую картинку
          galleryWrap.style.height = document.body.scrollHeight + 'px';
          
          //считаем высоту
          var news = document.querySelector('.news-wrap');
          galleryWrap.style.paddingTop = 450 + news.scrollHeight + 'px';
          
          galleryWrap.style.display = 'flex'
          galleryPreview.firstChild.className = 'active';
          galleryView.src = dataGallery[0].images.original;
          galleryTitle.innerHTML = dataGallery[0].title;

          // //отключаем скролл
          // document.onmousewheel = document.onwheel = function() {
          //   return false;
          // };
          // document.addEventListener('MozMousePixelScroll', function() {
          //     return false;
          // }, false);
          // document.onkeydown = function(e) {
          //   if (e.keyCode >= 33 && e.keyCode <= 40) return false;
          // };
      },
        function (error) {
          console.log(error);
      }
    );
  }

  //кнопка закрытия галереи
  galleryClose.onclick = function (){
    //убираем окно
    galleryWrap.style.display = 'none';
    
    //включаем скролл
    // document.onmousewheel = document.onwheel = function() {
    //   return true;
    // };
    // document.addEventListener('MozMousePixelScroll', function() {
    //   return true;
    // }, true);
    // document.onkeydown = function(e) {
    //   if (e.keyCode >= 33 && e.keyCode <= 40) return true;
    // };
  }

  //функция построения галереи
  function preview(data){
    //перебераем все обьекты из источника
    for(var i = 0; i < data.length; i++){
      //выводим их маленькую картинку и ставим айдишник
      var previewImage = document.createElement('img');
      previewImage.src = data[i].images["80x60"];
      previewImage.id = i;
      galleryPreview.appendChild(previewImage);
    }

    //вешаем событие на превью блок
    galleryPreview.addEventListener('click', view);

    //перебераем масив и выводим большое фото и заголовок того елемента который вызвал событие
    function view(event) {
      for(var i = 0; i < data.length; i++){
        galleryPreview.childNodes[i].className = " ";
      }
      event.target.className = 'active';
      galleryView.src = data[event.target.id].images.original;
      galleryTitle.innerHTML = data[event.target.id].title;
    }
  }


  /* --- выравниваем высоту сайдбара и главного блока --- */
  var main = document.querySelector('main');
  var sidebar = document.querySelector('.sidebar');
  
  if (window.matchMedia("(min-width: 990px)").matches) {
    main.style.height = sidebar.scrollHeight - 225 + 'px';
  };

  /* --------- start drop down menu code --------- */

  var dropMenu = document.getElementById('drop-menu');
  var dropBtn = document.getElementById('drop-btn');
  var navHead = document.querySelector('#nav-right');
  var navTop = document.querySelector('.menu-wrap');
  
  //медиазапросы для скрывания категорий меню
  if (window.matchMedia('(max-width: 1400px)').matches) {
    hide();
  }
  if (window.matchMedia('(max-width: 1200px)').matches) {
      hide();
  }
  if (window.matchMedia('(max-width: 1050px)').matches) {
    hide();
  }
  if (window.matchMedia('(max-width: 813px)').matches) {
    for (var i = 0; i < 7; i++) {
      hide();
    }
    navHead.appendChild(dropBtn);
  }
  
  //функция скрывания
  function hide() {
    var item = dropBtn.previousSibling;
    dropMenu.appendChild(item);
  }
  
};

/* --------- end onload window script, start menus scrooll transformation code --------- */

var topHead = document.getElementById('top-head');
var topMenu = document.getElementById('top-menu');
var topRight = document.getElementById('nav-right');
var topLogo = document.getElementById('top-logo');
var topLeft = document.getElementById('nav-left');
var wrapLogo = document.getElementById('wrap-logo');
var wrapLogoMargin = wrapLogo.style.marginLeft;
var videoWindowWrap = document.getElementById('video-window');
var videoWindow = document.querySelector('#video-window div');

//все эфекты связаные со скролом
window.onscroll = function () {

  //затемнение  top head меню при скроле 70px _SCROLL > Above TOP MENU
  if (document.body.scrollTop > 70) {
    topHead.style.background = 'black';
  } else {
    topHead.style.background = 'transparent';
  }

  if (window.matchMedia("(min-width: 813px)").matches) {
    //меню с рубриками отлипает, окно видео если включено, то сдвигаеться вместе с меню
    if (document.body.scrollTop > 400) {
      topMenu.parentNode.style.position = 'fixed';
      videoWindow.style.top = '100px';
      videoWindowWrap.style.top = '100px';
      topMenu.parentNode.style.zIndex = '2';
      topMenu.parentNode.style.top = '50px';
    } else {
      topMenu.parentNode.style.zIndex = '1';
      topMenu.parentNode.style.position = 'absolute';
      
      if (window.matchMedia("(max-width: 989px)").matches) {
        topMenu.parentNode.style.top = '350px';
      }
      else{
        topMenu.parentNode.style.top = '400px';
      }
      
      videoWindow.style.top = '50px';
      videoWindowWrap.style.top = '50px';
    }

    //меню с рубриками трансформируеться в топ меню, окно с видео если включено сьезжает с ним
    if (document.body.scrollTop > 500) {
      topHead.style.display = 'none';
      
      videoWindow.style.top = '50px';
      videoWindowWrap.style.top = '50px';
      
      wrapLogo.style.marginLeft = '0';
      wrapLogo.appendChild(topLogo);

      topMenu.parentNode.style.top = '0';
      topMenu.parentNode.appendChild(topRight);
      topMenu.parentNode.style.border = 'none';
      topMenu.parentNode.style.boxShadow = '0px 3px 5px 0px rgba(0, 0, 0, 0.75)';
    } else {
      topHead.style.display = 'flex';

      wrapLogo.style.marginLeft = wrapLogoMargin;
      topHead.insertBefore(topLogo, topHead.firstChild);

      topLeft.parentNode.appendChild(topRight);
      topMenu.parentNode.style.boxShadow = 'none';
      topMenu.parentNode.style.border = 'border-bottom: 1px solid #e6e6df';  
    }
  }
};