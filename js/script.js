window.addEventListener('DOMContentLoaded', function () { //JS начинает работать тогда, когда загрузилась DOM структура страницы (теги, кнопки, и тд)
    'use strict';

    // Вытаскиваем из CSS данные, для работы с ними

    let tab = document.querySelectorAll('.info-header-tab'), // info-header-tab - каждый таб в отдельности
        info = document.querySelector('.info-header'), // info-header - блок с табами
        tabContent = document.querySelectorAll('.info-tabcontent'); //info-tabcontent - блок с содержимым каждого таба

        // Код, для скрытия контента

    function hideTabContent(a) { // (a) - это аргумент некий, который далее передается в i // hideTabContent (просто некое (любое) имя функции)
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show'); // remove - удалить; show - класс CSS 
            tabContent[i].classList.add('hide'); // add - добавить; hide - класс CSS (display none)
        }
    }

        // Выводим контент

    hideTabContent(1); // При загрузке выводит 1 автоматически

        // Показываем то, что нужно сейчас

    function showTabContent(b) {
        if (tabContent[b].classList.contains('hide')) { // contains - возвращается true или false, заправшиваемый класс; hide - класс CSS
            tabContent[b].classList.remove('hide'); // hide - класс CSS
            tabContent[b].classList.add('show'); // show - класс CSS
        }
    }

        // Задаем команду, что будет проиходить при клике 

    info.addEventListener('click', function (event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for (let i = 0; i < tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });

    // Таймер

    let deadline = '2021-01-19';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()), //Date.parse(endtime) - наш deadline, Date.parse(new Date()) - дата которая есть на данный момент, в тот момент, когда пользователь зашел на сайт.
            seconds = Math.floor((t/1000) % 60), // t/1000 - получение из милисекунд, количество секунд, дальше берем остаток, чтобы секунд было 60, а не 100 или 1000.
            minutes = Math.floor((t/1000/60) % 60), // Тоже самое что выше
            hours = Math.floor((t/(1000*60*60)));

            return { // Возращает 
                'total': t,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
    }
    

    function setClock(id, endtime) { // id - возвращает из вывода ниже timer, endtime - берет значение из выводимого ниже deadline
        let timer = document.getElementById(id), 
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num){
                if(num <= 9) {
                    return '0' + num;
                } else return num;
            };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            

            if(t.total <= 0){
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
            
        }
    }

    setClock('timer', deadline);
}); 