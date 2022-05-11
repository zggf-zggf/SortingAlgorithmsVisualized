PRIMARY_COLOR = "#F3EAC2";

class SimpleBar{
    constructor(value, width, scale){
        this.value = value;
        this.width = width;
        this.scale = scale;
    }

    Draw(x, y, context, color=PRIMARY_COLOR){
        context.fillStyle = color;
        context.fillRect(x, y-(this.value*this.scale), this.width+0.5, this.value*this.scale+0.5);
    }
}

class Point{
    constructor(value, width, scale){
        this.value = value;
        this.width = width;
        this.scale = scale;
    }

    Draw(x, y, context, color=PRIMARY_COLOR){
        context.fillStyle = color;
        context.fillRect(x, y-(this.value*this.scale), 5+0.5, 5+0.5);
    }
}

function compare(a, b) {
    if (a.value < b.value){
      return -1;
    }
    if (a.value > b.value){
      return 1;
    }
    return 0;
  }

function getRandomSimpleBars(cnt, range, width, height){
    bars = [];
    for(let i = 0; i < cnt; i++){
        let r = Math.floor(Math.random()*(range))+1;
        bars.push(new SimpleBar(r, width/(cnt+1), Math.floor(height/range)));
    }
    return bars;
}

function getRandomPoints(cnt, range, width, height){
    points = [];
    var wid = 5;
    if(cnt<=10) wid =10;
    for(let i = 0; i < cnt; i++){
        let r = Math.floor(Math.random()*(range))+1;
        points.push(new Point(r, wid, Math.floor(height/range)));
    }
    return points;
}