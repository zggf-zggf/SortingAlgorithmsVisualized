let B;

function Initialize(){
    if(type=="bars") elements = getRandomSimpleBars(elementsCount, elementsRange, width, height);
    if(type=="points") elements = getRandomPoints(elementsCount, elementsRange, width, height);

    if(gen!="rand"){
        elements.sort(compare);
    }
    if(gen=="inverted"){
        elements.reverse();
    }
    B = new SelectionSort(elements);
    DrawFrame();
}
function DrawFrame(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(type=="points"){
        for(let i = 0; i < elementsCount; i++){
            B.arr[i].Draw(Math.floor(i*(width/elementsCount)), height, ctx, "#000000");
        }
    }
    if(type=="bars"){
        if(B.finished){
            for(let i = 0; i < elementsCount; i++){
                B.arr[i].Draw(Math.floor(i*(width/elementsCount)), height, ctx, "#f5b461");
            }
        }else{
            for(let i = 0; i < elementsCount; i++){
                if(B.minPt==i) B.arr[i].Draw(Math.floor(i*(width/elementsCount)), height, ctx, "#9ad3bc");
                else if(B.pt==i||B.iter==i) B.arr[i].Draw(Math.floor(i*(width/elementsCount)), height, ctx, "#ec524b");
                else if(i<B.iter) B.arr[i].Draw(Math.floor(i*(width/elementsCount)), height, ctx, "#f5b461");
                else B.arr[i].Draw(i*(width/elementsCount), height, ctx);
            }
        }
    }
    operationsCountText.innerHTML = "Liczba kroków: "+B.operationsCount;
}