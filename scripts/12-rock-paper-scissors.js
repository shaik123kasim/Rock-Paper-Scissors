let score = JSON.parse(localStorage.getItem('score')) || {
  wins:0,
  losses:0,
  ties:0
};


updateScoreElement();


/*if (!score){
score={
  wins:0,
  losses:0,
  ties:0
};

}*/

let isAutoplaying = false;
let intervalId ;


function autoPlay(){
  if(!isAutoplaying){
   intervalId =  setInterval( () => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoplaying = true;
  }else{
    clearInterval(intervalId);
    isAutoplaying = false;
  }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
  playGame('Rock');
});

document.querySelector('.js-Paper-button').addEventListener('click', () => {
  playGame('Paper');
});

document.querySelector('.js-Scissors-button').addEventListener('click', () => {
  playGame('Scissors');
});

document.body.addEventListener('keydown',(event)=>{
  if(event.key === 'r'){
    playGame('Rock');
  }else if(event.key === 'p'){
    playGame('Paper');
  } else if(event.key === 's'){
    playGame('Scissors');
  }
})

function playGame(playerMove){
const computerMove = pickComputerMove();

let result='';

if(playerMove === 'Scissors'){

if(computerMove === 'Rock'){
result='You Lose';
} else if(computerMove === 'Paper'){
result='You Win';
} else if(computerMove === 'Scissors'){
result='Tie';
}

} else if(playerMove === 'Paper'){
if(computerMove === 'Rock'){
result='You Win';
} else if(computerMove === 'Paper'){
result='Tie';
} else if(computerMove === 'Scissors'){
result='You Lose';
}

}else if(playerMove === 'Rock'){
if(computerMove === 'Rock'){
result='Tie';
} else if(computerMove === 'Paper'){
result='You Lose';
} else if(computerMove ==='Scissors'){
result='You Win';
}
} 

if(result === 'You Win'){
score.wins+=1;
} else if(result === 'You Lose'){
score.losses+=1;
} else if(result=== 'Tie'){
score.ties+=1;
}
localStorage.setItem('score', JSON.stringify(score) );

updateScoreElement();

document.querySelector('.js-result').innerHTML = result;

document.querySelector('.js-moves').innerHTML = ` You <img src="images/${playerMove}-emoji.png" class="move-icon" alt="">
<img src="images/${computerMove}-emoji.png" class="move-icon" alt="">
Computer`;



}

function updateScoreElement(){

document.querySelector('.js-score')
.innerHTML = `Wins: ${score.wins},Losses: ${score.losses},Ties: ${score.ties}`;

}

function pickComputerMove(){
  const randomNumber=(Math.random());

  let computerMove='';

   
if(randomNumber >= 0 && randomNumber < 1/3){
computerMove='Rock';
} else if(randomNumber >=1/3 && randomNumber < 2/3){
computerMove='Paper';
}else{
computerMove='Scissors';
}

return computerMove;

}