var screens = document.querySelectorAll('.screen');
var board = document.querySelector('#board');
var timeEl = document.querySelector('#time');
var time;
var score = 0;
var colors = ['#FF0000', '#26e3c7', '#b700ff', '#17b000', '#d3a811', '#0008f5', '#ccc2ae', '#3ff523', '#543708'];
var setColor = function () {
    var number = Math.floor(Math.random() * colors.length);
    var color = colors[colors.length - number];
    return color;
};
var setTime = function (time) {
    timeEl.innerHTML = "00:".concat(time);
};
var getRandomNumber = function (min, max) {
    return Math.floor(min + (Math.random() * (max + 1 - min)));
};
var createCircles = function () {
    var circle = document.createElement('div');
    var size = getRandomNumber(15, 30).toString() + 'px';
    var _a = board.getBoundingClientRect(), width = _a.width, height = _a.height;
    var x = getRandomNumber(0, width - parseInt(size)).toString() + 'px';
    var y = getRandomNumber(0, height - parseInt(size)).toString() + 'px';
    circle.classList.add('circle');
    circle.style.width = size;
    circle.style.height = size;
    circle.style.top = y;
    circle.style.left = x;
    circle.style.backgroundColor = setColor();
    board.append(circle);
};
var startGame = function () {
    setTime(time);
    createCircles();
    var timer = (setInterval(function () {
        if (time === 0) {
            finishGame();
            clearInterval(timer);
        }
        else if (time > 0) {
            var current = --time;
            if (current < 10) {
                current = "0".concat(current);
            }
            setTime(current);
        }
    }, 1000));
};
var finishGame = function () {
    document.querySelector('#time-full').classList.add('hide');
    board.innerHTML =
        "\n        <div class=\"end-wrap\">\n            <h1>C\u0447\u0451\u0442: <span class=\"primary\">".concat(score, "</span></h1>    \n            <button id=\"retry\">\u041F\u043E\u043F\u0440\u043E\u0431\u043E\u0432\u0430\u0442\u044C \u0441\u043D\u043E\u0432\u0430</button>\n        </div>\n    ");
    document.querySelector('#retry').addEventListener('click', function () {
        location.reload();
        // board.innerHTML =
        //     `
        //         <h3 id="time-full">Осталось <span id="time">00:00</span></h3>
        //         <div class="board" id="board"></div>
        //     `
        document.querySelector('#retry').removeEventListener('click', function () { return false; });
    });
};
board.addEventListener('click', function (event) {
    var target = event.target;
    if (target.classList.contains('circle')) {
        score++;
        target.remove();
        createCircles();
    }
});
document.querySelector('#start').addEventListener('click', function (event) {
    event.preventDefault();
    screens[0].classList.add('up');
    document.querySelector('#start').removeEventListener('click', function () { return false; });
});
document.querySelector('#time-list').addEventListener('click', function (event) {
    var target = event.target;
    if (target.classList.contains('time-btn')) {
        time = parseInt(target.getAttribute('data-time'));
        startGame();
        screens[1].classList.add('up');
    }
    document.querySelector('#time-list').removeEventListener('click', function () { return false; });
});
