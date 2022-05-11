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
    if(pivotType == "left") B = new IntroSort(elements, pivotLeft, 9, "shellsort");
    if(pivotType == "random") B = new IntroSort(elements, pivotRandom, 9, "shellsort");
    if(pivotType == "medianOfThree") B = new IntroSort(elements, pivotThreeMedian, 9, "shellsort");
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
            if(B.state=="quicksort"){
                for(let i = 0; i < elementsCount; i++){
                    if(B.quicksort.findPivot&&B.quicksort.pivot==i) B.arr[i].Draw(i*(width/elementsCount), height, ctx, "#9ad3bc");
                    else if(!B.quicksort.findPivot&&B.quicksort.b==i) B.quicksort.arr[i].Draw(i*(width/elementsCount), height, ctx, "#9ad3bc");
                    else if(B.quicksort.pt2==i||B.quicksort.pt1==i) B.quicksort.arr[i].Draw(i*(width/elementsCount), height, ctx, "#ec524b");
                    else B.quicksort.arr[i].Draw(i*(width/elementsCount), height, ctx);
                }
            }
            if(B.state=="insertsort"){
                for(let i = 0; i < elementsCount; i++){
                    if(B.insertsort.pt==i||B.insertsort.pt-1==i) B.arr[i].Draw(i*(width/elementsCount), height, ctx, "#ec524b");
                    else B.arr[i].Draw(i*(width/elementsCount), height, ctx);
                }
            }
            if(B.state=="emergency"){
                if(B.emergencyAlgo=="shellsort"){
                    for(let i = 0; i < elementsCount; i++){
                        if(B.nlognsort.pt==i||B.nlognsort.pt-B.nlognsort.gap==i) B.arr[i].Draw(i*(width/elementsCount), height, ctx, "#ec524b");
                        else B.arr[i].Draw(i*(width/elementsCount), height, ctx);
                    }
                }
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