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
    B = new HeapSort(elements);
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
            if(B.phase==1){
                for(let i = 0; i < elementsCount; i++){
                    if(Math.floor(B.pt/2)-1==i) B.arr[i].Draw(i*(width/elementsCount), height, ctx, "#9ad3bc");
                    else if(B.pt-1==i) B.arr[i].Draw(i*(width/elementsCount), height, ctx, "#ec524b");
                    else B.arr[i].Draw(i*(width/elementsCount), height, ctx);
                }
            }else{
                if(B.repair){
                    for(let i = 0; i < elementsCount; i++){
                        if(((B.pt*2-1==i)&&(B.pt*2<B.iter))||((i==B.pt*2)&&(B.pt*2+1<B.iter))) B.arr[i].Draw(i*(width/elementsCount), height, ctx, "#9ad3bc");
                        else if(B.pt-1==i) B.arr[i].Draw(i*(width/elementsCount), height, ctx, "#ec524b");
                        else B.arr[i].Draw(i*(width/elementsCount), height, ctx);
                    }
                }else{
                    for(let i = 0; i < elementsCount; i++){
                        if(i==0) B.arr[i].Draw(i*(width/elementsCount), height, ctx, "#9ad3bc");
                        else if(B.pt-1==i) B.arr[i].Draw(i*(width/elementsCount), height, ctx, "#ec524b");
                        else B.arr[i].Draw(i*(width/elementsCount), height, ctx);
                    }
                }
            }
        }
    }
    operationsCountText.innerHTML = "Liczba kroków: "+B.operationsCount;
}