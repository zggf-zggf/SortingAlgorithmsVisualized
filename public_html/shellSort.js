let B;
let gapType = "shell";
const gapText = document.getElementById('gapText');
function Initialize(){
    if(type=="bars") elements = getRandomSimpleBars(elementsCount, elementsRange, width, height);
    if(type=="points") elements = getRandomPoints(elementsCount, elementsRange, width, height);

    if(gen!="rand"){
        elements.sort(compare);
    }
    if(gen=="inverted"){
        elements.reverse();
    }
    if(gapType=="knuth") B = new ShellSort(elements, Math.floor(gapKnuth(elementsCount)/3), gapKnuth);
    if(gapType=="shell") B = new ShellSort(elements, Math.floor(elementsCount/2), gapShell);
    DrawFrame();
}
function DrawFrame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(type=="points"){
        for(let i = 0; i < elementsCount; i++){
            B.arr[i].Draw(i*(width/elementsCount), height, ctx, "#000000");
        }
    }
    if(type=="bars"){
        if(B.finished){
            for(let i = 0; i < elementsCount; i++){
                B.arr[i].Draw(i*(width/elementsCount), height, ctx, "#f5b461");
            }
        }else{
            for(let i = 0; i < elementsCount; i++){
                if(B.pt==i||B.pt-B.gap==i) B.arr[i].Draw(i*(width/elementsCount), height, ctx, "#ec524b");
                else B.arr[i].Draw(i*(width/elementsCount), height, ctx);
            }
        }
    }
    operationsCountText.innerHTML = "Liczba kroków: "+B.operationsCount;
    gapText.innerHTML = "h: "+B.gap;
}

function setShellGap(){
    gapType = "shell";
    paused = true;
    Initialize();
}

function setKnuthGap(){
    gapType = "knuth";
    paused = true;
    Initialize();
}