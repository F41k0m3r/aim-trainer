const screens:NodeListOf<HTMLDivElement> = document.querySelectorAll('.screen')
const board:HTMLDivElement = document.querySelector('#board')
const timeEl:HTMLSpanElement = document.querySelector('#time')
let time:number;
let score:number = 0;
const colors:string[] = ['#FF0000', '#26e3c7', '#b700ff', '#17b000', '#d3a811', '#0008f5', '#ccc2ae', '#3ff523', '#543708']
const setColor = ():string =>{
    const number = Math.floor(Math.random() * colors.length)
    const color = colors[colors.length - number]
    return color
}
const setTime = (time:number|string):void => {
    timeEl.innerHTML = `00:${time}`
}
const getRandomNumber = (min:number, max:number):number => {
    return Math.floor(min + (Math.random() * (max + 1 - min)))
}
const createCircles = ():void => {
    const circle:HTMLDivElement = document.createElement('div')
    const size:string = getRandomNumber(15, 30).toString() + 'px'
    const {width, height}:{width:number, height:number} = board.getBoundingClientRect()
    const x:string = getRandomNumber(0, width - parseInt(size)).toString() + 'px'
    const y:string = getRandomNumber(0, height - parseInt(size)).toString() + 'px'

    circle.classList.add('circle')
    circle.style.width = size
    circle.style.height = size
    circle.style.top = y
    circle.style.left = x
    circle.style.backgroundColor = setColor()

    board.append(circle)
}

const startGame = ():void => {
    setTime(time)
    createCircles()
    const timer:number = (
    setInterval(():void=>{
        if (time === 0) {
            finishGame()
            clearInterval(timer)
        }else if (time > 0) {
            let current:number|string = --time
            if (current<10) {
                current = `0${current}`
            }
            setTime(current)
        }
    }, 1000, ))
}
const finishGame = ():void => {
    document.querySelector('#time-full').classList.add('hide')
    board.innerHTML =
    `
        <div class="end-wrap">
            <h1>Cчёт: <span class="primary">${score}</span></h1>    
            <button id="retry">Попробовать снова</button>
        </div>
    `
    document.querySelector('#retry').addEventListener('click', ():void=>{
        location.reload()
        // board.innerHTML =
        //     `
        //         <h3 id="time-full">Осталось <span id="time">00:00</span></h3>
        //         <div class="board" id="board"></div>
        //     `
        document.querySelector('#retry').removeEventListener('click', ():boolean=>false)
    })
}

board.addEventListener('click', (event)=>{
    const target = event.target as Element
    if (target.classList.contains('circle')){
        score++
        target.remove()
        createCircles()
    }
})
document.querySelector('#start').addEventListener('click', (event:Event):void=>{
    event.preventDefault()
    screens[0].classList.add('up')
    document.querySelector('#start').removeEventListener('click', ():boolean=>false)
})

document.querySelector('#time-list').addEventListener('click', (event:Event):void=>{
    const target = event.target as Element
    if (target.classList.contains('time-btn')) {
        time = parseInt(target.getAttribute('data-time'))
        startGame()
        screens[1].classList.add('up')
    }
    document.querySelector('#time-list').removeEventListener('click', ():boolean=>false)
})