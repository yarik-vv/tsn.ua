## Тестовая работа на должность middle front-end разработчика
>gh-pages demo: http://yarik-vv.github.io/tsn.ua

## Инструкция по развертыванию:
- `$ npm install` - установит зависимости;
- `$ npm run dev` - запустит сервер в режиме разработки по адресу `localhost:9000`;
- `$ npm run build` - сборка с минификацией и добавления стилей в выходной html файл в тег `<style>`. Для минимизации запросов со страницы и быстрой ее загрузки.

## Что использовал:
- Чистый JavaScript;
- SASS(SCSS);
- EJS в качестве шаблонизатора;
- autoprefixer для установки префиксов;
- Webpack 2 (просто в качестве сборщика файлов, сервера и для компиляции шаблонов).

## Коментарии по некоторым заданиям:
- Было выполнено отображение на мобильных устройствах (как дополнительно);
- Кроме определения города в 9 задании с категории middle front-end разработчика было реализовано определение погоды в том городе (как дополнительно);
- Форма поиска появляется при клике, пропадает при потере фокуса, если в ней нет текста (задание junor #2);
- Елементы управления слайдером сверстаны на CSS (задание junior #5);
- Видео для первого слайда не подходит по своей ширине, его можно конечно расширить с помощью свойства `transform: scaleX()`, но это будет не правильно, коректнее подобрать подходящее видео как на макете в фотошопе (задание junior #4); 
- Ефекты при скроле в фаерфоксе не работают, так как там заблокировано событие `onscroll` и альтернативы фаерфокс не дает, в документации по этой проблеме как альтернатива есть `position: sticky`, но он плохо подерживается в браузерах - [смотрите тут](http://caniuse.com/#feat=css-sticky)
>Все тестировалось на разных браузерах в разных операционных системах, также и на мобильных устройствах. Исходя из того что сайт, который был как пример - tsn.ua не поддерживает старые браузеры, то было решено использовать flex-box при верстке и промисы в js.
>Чтобы баннер и погода нормально отображались на github pages нужно перейти на http, тогда github pages не будет их блокировать.

### 4 задание с категории middle front-end разработчика:
Решение на мой взгляд такое как в фотогалереи, которая строится динамически, передавать на клиент 3 url с разными размерами картинок, а на клиенте подставлять их в зависимости от ширины viewport. Что-то на подобии медиазапросов в CSS.