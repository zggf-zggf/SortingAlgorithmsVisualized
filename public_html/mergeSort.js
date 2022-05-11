let B;

function Initialize(){
    if(this.elementsCount<=10) this.elementsCount = 8;
    else this.elementsCount = 128;
    if(type=="bars") elements = getRandomSimpleBars(elementsCount, elementsRange, width, height);
    if(type=="points") elements = getRandomPoints(elementsCount, elementsRange, width, height);

    if(gen!="rand"){
        elements.sort(compare);
    }
    if(gen=="inverted"){
        elements.reverse();
    }
    B = new MergeSort(elements, false);
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
                if((B.pt2==i&&B.pt2<B.wsk+2*B.pot2)||(B.pt1==i&&B.pt1>=B.wsk&&(B.merging||B.pt1<B.wsk+B.pot2))) B.arr[i].Draw(i*(width/elementsCount), height, ctx, "#ec524b");
                else B.arr[i].Draw(i*(width/elementsCount), height, ctx);
            }
        }
    }
    operationsCountText.innerHTML = "Liczba kroków: "+B.operationsCount;
}