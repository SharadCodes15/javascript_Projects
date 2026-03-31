const board = document.querySelector('.board');
const startbtn = document.querySelector('.btn-start'); 
const modal = document.querySelector('.modal');
const startGameModal = document.querySelector('.start-game');
const gameOverModal = document.querySelector('.game-over');
const restartbtn = document.querySelector('.btn-restart');

const scoreboardElem = document.querySelector('#score');
const highscoreElem = document.querySelector('#high-score');
const timeElem = document.querySelector('#time');

let score = 0;
let highscore = 0;
let time ='00-00';
 
const rows = 20;
const cols = 20;



let blocks = [];
let snake = [{
    x:1,
    y:3,
},]
let direct = 'down';
let intervalId = null;
let food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}


for (let r = 0; r < rows; r++) {
    blocks[r] = [];

    for (let c = 0; c < cols; c++) {
        const div = document.createElement('div');
        div.classList.add('block');
        board.appendChild(div);
        blocks[r][c] = div;
    }
}

function render(){
    let head = null;
    blocks[food.x][food.y].classList.add('food');
    let localstoreScore = localStorage.getItem('hScore');
    highscoreElem.innerHTML = localstoreScore;

    if(direct === 'left'){
        head = {x:snake[0].x,y:snake[0].y-1};
    }else if(direct === 'right'){
        head = {x:snake[0].x,y:snake[0].y+1};
    }else if(direct === 'down'){
        head = {x:snake[0].x+1,y:snake[0].y};
    }else if(direct === 'up'){
        head = {x:snake[0].x-1,y:snake[0].y};
    }

    if(head.x<0 || head.x>=rows || head.y<0 || head.y>=cols ){
        alert("Game Over");
        clearInterval(intervalId);
        modal.style.display = 'flex';
        startGameModal.style.display = 'none';
        gameOverModal.style.display = 'flex';
        if(Number(localstoreScore) < score){
            localStorage.setItem('hScore',score);
        }
        return;
    }
    
    if(food.x == head.x && food.y == head.y){
        blocks[food.x][food.y].classList.remove('food');
        food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
        blocks[food.x][food.y].classList.add('food');
        snake.unshift(head);
        score+= 10;
        scoreboardElem.innerHTML = score;
    }

    snake.forEach(segment=>{
        blocks[segment.x][segment.y].classList.remove('fill');
    });

    snake.unshift(head);
    snake.pop();
    snake.forEach((segment)=>{
        blocks[segment.x][segment.y].classList.add('fill');
    })
}


startbtn.addEventListener('click',()=>{
    modal.style.display='none';
    intervalId = setInterval(() => {
        render();
    }, 300);
    timeintervalId = setInterval(() => {
        let [min,sec] = time.split('-');
        if(sec == 59){
            min = Number(min)+1;
            sec = '00';
        }else{
            sec = Number(sec)+1;
        }
        time = `${min}-${sec}`;
        timeElem.innerHTML = time;
    }, 1000);
    
});

restartbtn.addEventListener('click',restartfnc);

function restartfnc(){
    score = 0;
    scoreboardElem.innerHTML = 0;
     blocks[food.x][food.y].classList.remove('food');
     snake.forEach(segment=>{
        blocks[segment.x][segment.y].classList.remove('fill');
    });
    direct = 'down';
    modal.style.display = 'none';
    snake = [{
        x:1,
        y:3,
    },]
    food = {x:Math.floor(Math.random()*rows),y:Math.floor(Math.random()*cols)}
    intervalId = setInterval(()=>{render()},300);
}

function restart(){
    

}

addEventListener("keydown",(e)=>{
    if (e.key == 'ArrowUp'){
        direct = 'up';
    }else if(e.key == 'ArrowDown'){
        direct = 'down';
    }else if(e.key == 'ArrowRight'){
        direct = 'right';        
    }else if(e.key == 'ArrowLeft'){
        direct = 'left';        
    }
})


