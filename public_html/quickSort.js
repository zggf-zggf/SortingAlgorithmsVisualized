let B;
let pivotType = "left";
function Initialize(){
    if(type=="bars") elements = getRandomSimpleBars(elementsCount, elementsRange, width, height);
    if(type=="points") elements = getRandomPoints(elementsCount, elementsRange, width, height);

    if(gen!="rand"){
        elements.sort(compare);
    }
    if(gen=="inverted"){
        elements.reverse();
    }
    if(pivotType == "left") B = new QuickSort(elements, pivotLeft, 0);
    if(pivotType == "random") B = new QuickSort(elements, pivotRandom, 0);
    if(pivotType == "medianOfThree") B = new QuickSort(elements, pivotThreeMedian, 0);
    if(pivotType == "exactMedian") B = new QuickSort(elements, pivotExactMedian, 0);
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
                if(B.findPivot&&B.pivot==i) B.arr[i].Draw(i*(width/elementsCount), height, ctx, "#9ad3bc");
                else if(!B.findPivot&&B.b==i) B.arr[i].Draw(i*(width/elementsCount), height, ctx, "#9ad3bc");
                else if(B.pt2==i||B.pt1==i) B.arr[i].Draw(i*(width/elementsCount), height, ctx, "#ec524b");
                else B.arr[i].Draw(i*(width/elementsCount), height, ctx);
            }
        }
    }
    operationsCountText.innerHTML = "Liczba kroków: "+B.operationsCount;
}

function setLeftPivot(){
    pivotType = "left";
    paused = true;
    Initialize();
}

function setRandomPivot(){
    pivotType = "random";
    paused = true;
    Initialize();
}

function setMedianOfThreePivot(){
    pivotType = "medianOfThree";
    paused = true;
    Initialize();
}

function setExactMedianPivot(){
    pivotType = "exactMedian";
    paused = true;
    Initialize();
}