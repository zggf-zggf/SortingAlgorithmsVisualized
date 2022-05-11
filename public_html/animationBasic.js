const canvas = document.getElementById('animationCanvas');
width = canvas.clientWidth;
height = canvas.clientHeight;
const operationsCountText = document.getElementById('p1');
width*=2;
height*=2;
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');

let elementsCount = 10;
let elementsRange = 10;
let paused = true;
let type = "bars";
let gen = "rand"
let timePerFrame = 500;
let animationsCount = 10;


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function AutoAdvance(){
    if(B.finished) return;
    if(paused) return;
    Advance();
    if(timePerFrame>0) await sleep(timePerFrame);
    requestAnimationFrame(AutoAdvance);
}

function Advance(){
    B.nextStep();
    DrawFrame();
}

function StepBack(){
    B.prevStep();
    paused = true;
    DrawFrame();
}

function ContinueAnimation(){
    paused = false;
    AutoAdvance();
}

async function ContinueAnimationFast(){
    paused = false;
    for(let i = 0; i<animationsCount; i++){
        await sleep(timePerFrame/animationsCount);
        AutoAdvance();
    }
}

function Pause(){
    paused = true;
}

function setMalo(){
    elementsCount = 16;
    elementsRange = 10;
    timePerFrame = 500;
    animationsCount = 10;
    paused = true;
    Initialize();
}

function setDuzo(){
    elementsCount = 128;
    elementsRange = 100;
    timePerFrame = 1;
    animationsCount = 15;
    paused = true;
    Initialize();
}

function setBardzoDuzo(){
    elementsCount = 512;
    elementsRange = 100;
    timePerFrame = 1;
    animationsCount = 37;
    paused = true;
    Initialize();
}

function setSlupki(){
    type = "bars";
    paused = true;
    Initialize();
}

function setPunkty(){
    type = "points";
    paused = true;
    Initialize();
}

function setRandom(){
    gen = "rand";
    paused = true;
    Initialize();
}

function setSorted(){
    gen = "sorted";
    paused = true;
    Initialize();
}

function setInverted(){
    gen = "inverted"
    paused = true;
    Initialize();
}

setRandom();
setMalo();
setSlupki();