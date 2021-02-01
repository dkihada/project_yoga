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

    let deadline = '2021-02-28';

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

    // Модальное окно

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        details = document.querySelectorAll('div.description-btn'); // Получаем массив div'ов

    for (var i = 0 ; i < details.length; i++) {
        details[i].addEventListener('click', function() { //details[i] - перебираем полученные div'ы
            overlay.style.display = 'block';
            this.classList.add('more-splash');
            document.body.style.overflow = 'hidden'; // Запрещает прокрутку страницы, пока открыто модальное окно.
        });
    }
    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden'; // Запрещает прокрутку страницы, пока открыто модальное окно.
    });
    close.addEventListener('click', function() {
         overlay.style.display = 'none';
         more.classList.remove('more-splash');
         document.body.style.overflow = ''; // Отменить запрет прокрутки, после закрытия модального окна
    });

    class Options {
        constructor(height, width, bg, fontSize, textAlign) {
            this.height = height;
            this.width = width;
            this.bg = bg;
            this.fontSize = fontSize;
            this.textAlign = textAlign;
        }
        createDiv() {
            let elem = document.createElement('div');
            document.body.appendChild(elem);
            let param = `height:${this.height}px; width:${this.width}px; background-color:${this.bg}; font-size:${this.fontSize}px; text-align:${this.textAlign}`;
            elem.style.cssText = param;
        }
    }
    
    const item = new Options(300, 350, "red", 14, "center");
    
    item.createDiv();

    // Form
    
    // let message = { 
    //     loading: 'Загрузка...',
    //     succes: 'Спасибо, скоро мы с вами свяжемся!', //Задаем объекты (сообщения), которые будут выводится при той или иной совершенной задаче
    //     failure: 'Что-то пошло не так...'
    // };

    // let form = document.querySelector('.main-form'), //Получаем из HTML саму форму
    //     input = form.getElementsByTagName('input'), //Получаем из HTML инпуты формы
    //     contact = document.getElementById('form'),
    //     contactInput = contact.getElementsByTagName('input'),
    //     statusMessage = document.createElement('div'); //Создаем div для вывода сообщения
    //     statusMessage.classList.add('status'); //Добавляем класс div который создали

    // form.addEventListener('submit', function (event) { //Обращение должно быть именно к ФОРМЕ, а не к кнопке или инпуту.
    //     event.preventDefault(); //Отмена стандартного поведения браузера, благодаря ей страница не перезагружается. Но так же, не отправляет форму на сервер.
    //     form.appendChild(statusMessage); //Добавление div при отправке, вывод выше написанных сообщений

    //     let request = new XMLHttpRequest();
    //     request.open('POST', 'server.php'); //POST - отправляет форму, GET - получает форму от сервера
    //     request.setRequestHeader ('Content-Type', 'application/json; charset=utf-8'); //Преобразует Ключ:Значение - из формата JSON, в обычный

    //     let formData = new FormData(form);

    //     let obj = {};
    //     formData.forEach(function(value, key) {
    //         obj[key] = value;
    //     });

    //     let json = JSON.stringify(obj);
    //     request.send(json);

    //     request.addEventListener('readystatechange', function () {
    //         if (request.readyState < 4) {
    //             statusMessage.innerHTML = message.loading;
    //         } else if (request.status === 4 && request.status == 200) {
    //             statusMessage.innerHTML = message.succes;
    //         } else {
    //             statusMessage.innerHTML = message.failure;
    //         }
    //     });

    //     for (let i = 0; i < input.length; i++) {
    //         input[i].value = '';
    //     }
    // });

    // contact.addEventListener('submit', function (event) { //Обращение должно быть именно к ФОРМЕ, а не к кнопке или инпуту.
    //     event.preventDefault(); //Отмена стандартного поведения браузера, благодаря ей страница не перезагружается. Но так же, не отправляет форму на сервер.
    //     contact.appendChild(statusMessage); //Добавление div при отправке, вывод выше написанных сообщений

    //     let request = new XMLHttpRequest(); //API подключение для общение клиента и сервера
    //     request.open('POST', 'server.php'); //POST - отправляет форму, GET - получает форму от сервера
    //     request.setRequestHeader ('Content-Type', 'application/json; charset=utf-8'); //Преобразует Ключ:Значение - из формата JSON, в обычный

    //     let contactData = new FormData(contact); //Получает данные из формы, внутри скобок FormData помещаем ту форму, из которой хотим получить данные ()

    //     let obj = {};
    //     contactData.forEach(function(value, key) {
    //         obj[key] = value;
    //     });

    //     let json = JSON.stringify(obj);
    //     request.send(json);

    //     request.addEventListener('readystatechange', function () {
    //         if (request.readyState < 4) {
    //             statusMessage.innerHTML = message.loading;
    //         } else if (request.status === 4 && request.status == 200) {
    //             statusMessage.innerHTML = message.succes;
    //         } else {
    //             statusMessage.innerHTML = message.failure;
    //         }
    //     });

    //     for (let i = 0; i < contactInput.length; i++) {
    //         contactInput[i].value = '';
    //     }
    // });
    
    let message = { 
        loading: 'Загрузка...',
        succes: 'Спасибо, скоро мы с вами свяжемся!', //Задаем объекты (сообщения), которые будут выводится при той или иной совершенной задаче
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'), //Получаем из HTML саму форму
        input = form.getElementsByTagName('input'), //Получаем из HTML инпуты формы
        contact = document.getElementById('form'),
        contactInput = contact.getElementsByTagName('input'),
        statusMessage = document.createElement('div'); //Создаем div для вывода сообщения
        statusMessage.classList.add('status'); //Добавляем класс div который создали

    form.addEventListener('submit', function (event) { //Обращение должно быть именно к ФОРМЕ, а не к кнопке или инпуту.
        event.preventDefault(); //Отмена стандартного поведения браузера, благодаря ей страница не перезагружается. Но так же, не отправляет форму на сервер.
            form.appendChild(statusMessage); //Добавление div при отправке, вывод выше написанных сообщений
            let formData = new FormData(elem);

            function postData(data) {
                return new Promise (function(resolve,reject) {
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php'); //POST - отправляет форму, GET - получает форму от сервера
                    request.setRequestHeader ('Content-Type', 'application/json; charset=utf-8'); //Преобразует Ключ:Значение - из формата JSON, в обычный

                    request.onreadystatechange = function () {
                        if (request.readyState < 4) {
                            resolve()
                        } else if (request.status === 4) {
                            if (request.status == 200 && request.status < 3) {
                                resolve()
                            } else {
                                reject()
                            }
                        }
                    }
                    request.send(data);
                });
            }
            function clearInput () {
                for (let i = 0; i < input.length; i++) {
                input[i].value = '';
                }
            }
            postData(formData)
                .then(() => statusMessage.innerHTML = message.loading)
                .then(() => {
                    thanksModal.style.display = 'block';
                    mainModal.style.display = 'none';
                    statusMessage.innerHTML = '';
                })
                .catch(() => statusMessage.innerHTML = message.failure)
                .then(() => clearInput)
    }); 

    //Slider

    let slideIndex = 1, //Параметр текущего слайда
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(slideIndex); //Вызывает функцию, которая будет выполняться ниже

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none'); //Перебирает все слайды и скрывает их
        // for (let i = 0; i < slides.length; i++) { //Тот же перебор, только другой вариант написания
        //     slides[i].style.display = 'none'
        // }
        dots.forEach((item) => item.classList.remove('dot-active')); //Перебирает все полученные элементы и удалеяет указанный класс
        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }
    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlides(-1);
    });
    next.addEventListener('click', function() {
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event) {
        for (let i = 0; i < dots.length + 1; i++) {
            if (event.target.classList.contains('dot') && event.target == dots[i - 1]) {
                currentSlide(i);
            }
        }
    });

    //Calc

    let persons = document.querySelectorAll('.counter-block-input')[0], // Выбрали первый интпут из двух в форме.
        restDays = document.querySelectorAll('.counter-block-input')[1], // соответственно, выбрали втоорой инпут
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;
        
        totalValue.innerHTML = 0; //Заменяет значение на страницы HTML на 0

        persons.addEventListener('change', function() {
            personsSum = +this.value;
            total = (daysSum + personsSum)*4000;

            // Проверка
            if(restDays.value == '' || persons.value == '') { //Если поле не заполненно, то возвращать только ноль, ничего не пытаться рассчитывать
                totalValue.innerHTML = 0;
            } else { //Если все заполненно, возвращает корректно
                totalValue.innerHTML = total;
            }
        });

        restDays.addEventListener('change', function() {
            daysSum = +this.value;
            total = (daysSum + personsSum)*4000;

            // Проверка
            if(persons.value == '' || restDays.value == '') { //Если поле не заполненно, то возвращать только ноль, ничего не пытаться рассчитывать
                totalValue.innerHTML = 0;
            } else { //Если все заполненно, возвращает корректно
                totalValue.innerHTML = total;
            }
        });
        
        place.addEventListener('change', function() {
            if (restDays.value == '' || persons.value == '') {
                totalValue.innerHTML = 0;
            } else {
                let a = total;
                totalValue.innerHTML = a * this.options[this.selectedIndex].value;
            }
        })     
}); 