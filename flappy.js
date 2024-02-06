let bird = new Image();
bird.src = "img/bird.png";

let back = new Image();
back.src = "img/back.png";

let pipeBottom = new Image();
pipeBottom.src = "img/pipeBottom.png"; 

let pipeUp = new Image();
pipeUp.src = "img/pipeUp.png";

let road = new Image();
road.src = "img/road.png";

let fly = new Audio();
fly.src = "audio/fly.mp3";

let score_sound = new Audio();
score_sound.src = "audio/score.mp3";

let score_text = document.getElementById("score");
let best_score_text = document.getElementById("best_score");

const gravity = 0.3
let canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d")
canvas.height = 512;
canvas.width = 256;

let x = 10;
let y = 150;
let velY = 0;
let score = 0;
let best_score = 0;

// canvas.addEventListener('click', FlyUP)
// document.addEventListener('keydown', FlyUP)
//ctx.drawImage(object, 0, 0);
let gap = 110;
let pipes = []
pipes[0] = {
    x: canvas.width,
    y: 0
}



function draw() {
    if(!pause){
    ctx.drawImage(back, 0, 0);
    ctx.drawImage(bird, x, y);

    ctx.drawImage(road, 0, 400)

    if (y + bird.height >= canvas.height - road.height) {
        reload();
    }

    velY += gravity
    y += velY
    // if(y >= 383){
    //     reload()
    // }
  
    for(let i=0; i<pipes.length; i++){
        if (pipes[i].x<-pipeUp.width){
            pipes.shift
        } else {
            ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y)
            ctx.drawImage(pipeBottom, pipes[i].x, pipes[i].y + pipeUp.height + gap)
        

        pipes[i].x -= 2
        

        if(pipes[i].x == 80){
            pipes.push({
                x: canvas.width,
                y:Math.floor(Math.random()*225) * -1
                
            });
        
        }
    }


        if(pipes[i].x == 0){
            score_sound.play();
            score++;
        } 
       
        if(x + bird.width >= pipes[i].x && 
        x + bird.width <= pipes[i].x + pipeUp.width &&
        y + bird.height <= pipes[i].y + pipeUp.height || 
        x + bird.width >= pipes[i].x && 
        x + bird.width <= pipes[i].x + pipeBottom.width &&
        y + bird.height >= pipes[i].y+350) {
            reload()
            
        } 
        //console.log("BirdX: " + x + bird.width + "BirdY" + y + "PipeL: " + pipes[i].x + "PipeR: " + pipes[i].x + pipeUp.width + "PipeY: " + pipes[i].y + pipeUp.height);
       
    
    }
    score_text.innerHTML = "SCORE: " + score;
    best_score_text.innerHTML = "BEST SCORE: " + best_score;
} else {
    ctx.drawImage(back, 0, 0);
    ctx.drawImage(bird, x, y);
    for (let i = 0; i < pipes.length; i++) {
        ctx.drawImage(pipeUp, pipes[i].x, pipes[i].y);
        ctx.drawImage(pipeBottom, pipes[i].x, pipes[i].y + pipeUp.height + gap);
}
ctx.drawImage(road, 0, canvas.height - road.height);
ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
ctx.fillRect(0, 0, canvas.width, canvas.height);

}
}

function reload() {
    if (score > best_score) {
        best_score = score;
    }
    x = 10;
    y = 150;
    velY = 0;
    pipes = [];
    score = 0;
    pipes[0] = {
        x: canvas.width,
        y: 0
    }
}

document.addEventListener("keydown", function(e) {
    if (e.code == 'ArrowUp') {
        FlyUP();
    }
});

function FlyUP() {
    y=y-10
    if(y<0){
        y = 0
    }
    velY = -5
    if(velY<=-5){
        velY= velY - 0,1
    }
    fly.play()
}

let pause = false;
function game_pause() {
    pause = !pause;
}

setInterval(draw, 20);