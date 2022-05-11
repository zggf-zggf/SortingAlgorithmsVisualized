class BubbleSort{
    constructor(arr, slow){
        this.arr = arr;
        this.step = 0;
        this.pt = 0;
        this.slow = slow;
        this.swaping = false;
        this.iter = 0;
        this.stck = [];
        this.operationsCount = 0;
        this.invertionsCount = 0;
        this.hasSwapped = 0;
        this.finished = false;
    }

    nextStep(){
        console.log(this.finished);
        if(this.finished) return;
        this.operationsCount++;
        console.log(this.pt);
        console.log(this.iter);
        if(this.pt+1<this.arr.length-this.iter) {
            if(this.arr[this.pt+1].value<this.arr[this.pt].value){
                console.log(this.arr[this.pt].value);
                console.log(this.arr[this.pt+1].value);
                console.log("swap");
                this.hasSwapped++;
                swap(this.arr[this.pt+1], this.arr[this.pt]);
                console.log(this.arr[this.pt].value);
                console.log(this.arr[this.pt+1].value);
                this.stck.push(1);
            }else{
                    if(this.pt+1==this.arr.length-this.iter-1){
                        this.iter++;
                        this.pt=0;
                        if(this.hasSwapped==0){
                            this.finished = true;
                        }
                        this.hasSwapped=0;
                        this.stck.push(2);
                    }else{
                        this.stck.push(3);
                        this.pt++;
                    }
            }
        }else{
            this.finished = true;
            this.iter++;
            this.pt=0;
            this.stck.push(2);
        }
    }

    prevStep(){
        if(this.finished) {
            this.finished = false;
            this.hasSwapped=0;
            this.stck.pop();
            this.pt=this.arr.length-this.iter-1;
            this.iter--;
            this.operationsCount--;
            return;
        }
        if(this.stck.length==0)return;
        this.operationsCount--;
        let x = this.stck[this.stck.length-1];
        this.stck.pop();
        switch(x){
            case 1:
                swap(this.arr[this.pt], this.arr[this.pt+1]);
                this.hasSwapped--;
                break;
            case 2:
                this.pt=this.arr.length-this.iter-1;
                this.iter--;
                this.hasSwapped = 100000;
                break;
            case 3:
                this.pt--;
                break;
        };
    }
}

class CombSort{
    constructor(arr){
        this.arr = arr;
        this.stck = [];
        this.step = 0;
        this.pt = 0;
        this.operationsCount = 0;
        this.k = 1.3;
        this.gap = Math.floor(arr.length/this.k);
        this.iter = 0;
        this.finished = false;
        this.hasSwapped=0;
    }

    nextStep(){
        if(this.finished) return;
        this.operationsCount++;
        if(this.arr[this.pt].value>this.arr[this.pt+this.gap].value){
            swap(this.arr[this.pt], this.arr[this.pt+this.gap]);
            this.hasSwapped++;
            this.stck.push(1);
        }else{
            if(this.pt+1+this.gap>=this.arr.length){
                if(this.gap==1&&this.hasSwapped==0) {this.finished = true; return;}
                this.iter++;
                this.gap = Math.floor((this.arr.length)/Math.pow(this.k, this.iter));
                this.pt=0;
                this.hasSwapped=0;
                this.stck.push(2);
            }else{
                this.pt++;
                this.stck.push(3);
            }
        }
    }

    prevStep(){
        if(this.finished){
            this.finished = false;
            this.hasSwapped=0;
            return;
        }
        if(this.stck.length<=0) return;
        this.operationsCount--;
        var x = this.stck[this.stck.length-1];
        this.stck.pop();
        switch(x){
            case 1:
                this.hasSwapped--;
                swap(this.arr[this.pt], this.arr[this.pt+this.gap]);
                break;
            case 2:
                this.iter--;
                this.gap = Math.floor((this.arr.length)/Math.pow(this.k, this.iter));
                this.pt=this.arr.length-1-this.gap;
                this.hasSwapped = 10000000;
                break;
            case 3:
                this.pt--;
                break;
        }
    }
}

class ShellSort{
    constructor(arr, gap, nextGap, start = 0, end = arr.length){
        this.end = end;
        this.start = start;
        this.arr = arr;
        this.nextGap = nextGap;
        this.gap = gap;
        this.stck = [];
        this.step = 0;
        this.pt = this.start+this.gap;
        this.operationsCount = 0;
        this.iter = this.start+this.gap;
        this.finished = false;
        this.goBack = false;
    }

    nextStep(){
        console.log("shellsort pt: "+this.pt);
        if(this.finished){
            return;
        }
        this.operationsCount++;
        if(this.goBack){
            if(this.pt-this.gap*2>=0) this.pt-=this.gap;
            else{
                if(this.iter==this.end-1) {
                    if(this.gap==1){this.finished = true;return;}
                    this.gap=this.nextGap(this.gap);
                    this.iter =this.start+ this.gap;
                    this.pt = this.iter;
                    this.goBack=false;
                    return;
                }
                this.iter++;
                this.pt = this.iter;
            }
            this.goBack=false;
            return;
        }
        if(this.arr[this.pt].value<this.arr[this.pt-this.gap].value){
            swap(this.arr[this.pt], this.arr[this.pt-this.gap]);
            this.goBack = true;
        }else{
            if(this.iter==this.end-1) {
                if(this.gap==1){this.finished = true;return;}
                this.gap=this.nextGap(this.gap);
                this.iter = this.start+this.gap;
                this.pt = this.iter;
                return;
            }
            this.iter++;
            this.pt = this.iter;
        }
    }
}

class SelectionSort{
    constructor(arr){
        this.arr = arr;
        this.stck = [];
        this.step = 0;
        this.pt = 1;
        this.minPt = -1;
        this.operationsCount = 0;
        this.iter = 0;
        this.finished = false;
    }

    nextStep(){
        if(this.iter==this.arr.length-1) this.finished = true;
        if(this.finished) return;
        this.operationsCount++;
        var coc;
        if(this.pt==this.arr.length){
            if(this.arr[this.iter].value>this.arr[this.minPt].value) swap(this.arr[this.minPt], this.arr[this.iter]);
            this.iter++;
            this.pt = this.iter+1;
            this.minPt = -1;
            coc=true;
        }else
        if(this.pt!=this.minPt){
            if(this.minPt==-1){
                coc = true;
                this.minPt = this.pt;
                this.pt++;
            }else if(this.arr[this.pt].value<this.arr[this.minPt].value){
                coc = true;
                this.minPt = this.pt;
                this.pt++;
            }
        }
        if(!coc){
            this.pt++;
        }
    }
}

class HeapSort{
    constructor(arr){
        this.arr = arr;
        this.pt = 1;
        this.operationsCount = 0;
        this.iter = 0;
        this.finished = false;
        this.phase = 1;
        this.goBack = false;
        this.repair = false;
        this.goDown = 0;
    }

    nextStep(){
        if(this.finished) return;
        this.operationsCount++;
        if(this.phase == 1){
            if(this.pt==1){
                this.iter++;
                if(this.iter==this.arr.length) {this.phase = 2; this.pt = this.iter; return;}
                this.pt = this.iter+1;
                return;
            }
            if(this.goBack){
                this.pt = Math.floor(this.pt/2);
                this.goBack = false;
                return;
            }
            if(this.arr[this.pt-1].value>this.arr[Math.floor(this.pt/2)-1].value){
                swap(this.arr[this.pt-1], this.arr[Math.floor(this.pt/2)-1]);
                this.goBack = true;
            }else{
                this.iter++;
                if(this.iter==this.arr.length) {this.phase = 2; this.pt = this.iter; return;}
                this.pt = this.iter+1;
                return;
            }
        }else{
            if(this.iter==1) this.finished = true;
            if(this.finished) return;
            this.operationsCount++;
            if(this.goDown==1){
                this.pt = this.pt*2;
                this.repair = true;
                this.goDown = 0;
                return;
            }
            if(this.goDown==2){
                this.pt = this.pt*2+1;
                this.repair = true;
                this.goDown = 0;
                return;
            }
            if(this.pt*2>=this.iter&&this.repair){
                this.repair = false;
                this.iter--;
                this.pt = this.iter;
                return;
            }
            if(this.repair){
                var pt2 = this.pt*2;
                if((this.arr[pt2-1].value>this.arr[pt2].value)||(this.pt*2+1>=this.iter)){
                    if(this.arr[this.pt-1].value<this.arr[pt2-1].value){
                        swap(this.arr[this.pt-1], this.arr[pt2-1]);
                        this.goDown = 1;
                        return;
                    }else{
                        this.repair = false;
                        this.iter--;
                        this.pt = this.iter;
                    }
                }else{
                    if(this.arr[this.pt-1].value<this.arr[pt2].value){
                        swap(this.arr[this.pt-1], this.arr[pt2]);
                        this.goDown = 2;
                        return;
                    }else{
                        this.repair = false;
                        this.iter--;
                        this.pt = this.iter;
                    }
                }
            }else{
                swap(this.arr[this.pt-1], this.arr[0]);
                this.pt = 1;
                this.repair = true;
                return;
            }
        }
    }
}

class MergeSort{
    constructor(arr){
        this.arr = arr;
        this.pom = [];
        for(let i = 0; i < arr.length; i++) this.pom[i] = {value: 0};
        this.merging = false;
        this.operationsCount = 0;
        this.pt1 = 0;
        this.pt2 = 1;
        this.iter = 0;
        this.pot2 = 1;
        this.wsk = 0;
        this.cnt = 0;
    }

    nextStep(){
        console.log(this.merging);
        if(this.finished) return;
        this.operationsCount++;
        if(this.merging){
            
            this.arr[this.pt1].value = this.pom[this.pt1].value;
            this.pt1++;
            if(this.pt1>=this.wsk+this.pot2*2){
                this.merging = false;
                this.wsk+=2*this.pot2;
                if(this.wsk+2*this.pot2>this.arr.length){
                    this.pot2*=2;
                    if(this.pot2>=this.arr.length) {this.finished = true; return;}
                    this.wsk=0;
                    this.cnt = 0;
                }
                this.pt1=this.wsk;
                this.pt2=this.wsk+this.pot2;
                return;
            }
            return;
        }else{
            console.log("pt1: "+this.pt1);
            console.log("pt2: "+this.pt2);
            console.log("cnt: "+this.cnt);
            if(this.pt1==this.wsk+this.pot2){
                if(this.pt2==this.wsk+this.pot2*2){
                    this.merging = true;
                    this.pt1=this.wsk;
                    this.pt2=-1;
                    return;
                }
                this.pom[this.cnt].value = this.arr[this.pt2].value;
                this.cnt++;
                this.pt2++;
                return;
            }
            if(this.pt2==this.wsk+this.pot2*2){
                this.pom[this.cnt].value = this.arr[this.pt1].value;
                this.cnt++;
                this.pt1++;
                return;
            }
            if(this.arr[this.pt1].value<=this.arr[this.pt2].value){
                this.pom[this.cnt].value = this.arr[this.pt1].value;
                this.cnt++;
                this.pt1++;
                return;
            }else{
                this.pom[this.cnt].value = this.arr[this.pt2].value;
                this.cnt++;
                this.pt2++;
                return;
            }
        }
    }
}

class QuickSort{
    constructor(arr, getPivot, cutoff = 0){
        this.arr = arr;
        this.depth = 0;
        this.stck = [];
        this.operationsCount = 0;
        this.pt1 = 0;
        this.pt2 = 0;
        this.pivot = -1;
        this.a = 0;
        this.b = this.arr.length-1;
        this.findPivot = true;
        this.goLeft = false;
        this.goRight = false;
        this.cutoff = cutoff;
        this.getPivot = getPivot;
    }

    nextStep(){
        console.log("a: "+this.a);
        console.log("b: "+this.b);
        if(this.finished) return;
        this.operationsCount++;
        if(this.findPivot){
            if(this.b-this.a<=this.cutoff){
                if(this.stck.length == 0) {this.finished = true; return;}
                this.a = this.stck[this.stck.length-1].left;
                this.b = this.stck[this.stck.length-1].right;
                this.pivot = -1;
                this.depth=this.stck[this.stck.length-1].glb;
                this.stck.pop();
                return;
            }
            if(this.pivot==-1){
                this.pivot = this.getPivot(this.arr, this.a, this.b);
                this.pt1 = this.a;
                this.pt2 = this.b;
                return;
            }
            swap(this.arr[this.pivot], this.arr[this.b]);
            this.findPivot = false;
            this.goRight = true;
            return;
        }
        if(this.goRight){
            this.pt2--;
            if(this.pt2==this.pt1){
                if(this.arr[this.pt2].value<=this.arr[this.b].value){
                    this.pt1++;
                }
                swap(this.arr[this.pt1], this.arr[this.b]);
                this.stck.push({left: this.pt1+1, right: this.b, glb: this.depth+1});
                this.goLeft = false;
                this.goRight = false;
                this.b = this.pt1-1;
                this.pivot = -1;
                this.findPivot = true;
                return;
            }
            if(this.arr[this.pt2].value<this.arr[this.b].value){
                this.goRight = false;
                this.goLeft = true;
            }
            return;
        }
        if(this.goLeft){
            if(this.arr[this.pt1].value>this.arr[this.b].value){
                swap(this.arr[this.pt1], this.arr[this.pt2]);
                this.goLeft = false;
                this.goRight = true;
                return;
            }
            this.pt1++;
            if(this.pt1==this.pt2){
                this.pt1++;
                swap(this.arr[this.pt1], this.arr[this.b]);
                this.stck.push({left: this.pt1+1, right: this.b, glb: this.depth+1});
                this.goLeft = false;
                this.goRight = false;
                this.b = this.pt1-1;
                this.pivot = -1;
                this.findPivot = true;
                return;
            }
        }
    }
}

class IntroSort{
    constructor(arr, getPivot, cutoff, emergencyAlgo){
        this.state = "quicksort";
        this.emergencyAlgo = emergencyAlgo;
        this.stckMaxSize = Math.round(Math.log2(arr.length)*2);
        this.arr = arr;
        this.cutoff = cutoff;
        this.quicksort = new QuickSort(arr, getPivot, cutoff);
        this.insertsort = new ShellSort(this.arr, 1);
        this.operationsCount = 0;
        this.emergency = false;
    }

    nextStep(){
        if(this.emergency){
            this.operationsCount++;
            if(this.nlognsort.finished){
                this.emergency = false;
                if(this.quicksort.stck.length == 0) {this.quicksort.finished = true; return;}
                this.quicksort.a = this.quicksort.stck[this.quicksort.stck.length-1].left;
                this.quicksort.b = this.quicksort.stck[this.quicksort.stck.length-1].right;
                this.quicksort.pivot = -1;
                this.quicksort.depth=this.quicksort.stck[this.quicksort.stck.length-1].glb;
                this.quicksort.stck.pop();
                return;
            }
            this.nlognsort.nextStep();
            return;
        }
        if(this.quicksort.finished){
            if(this.insertsort.finished) {this.finished = true; return;}
            this.state = "insertsort";
            this.insertsort.nextStep();
            this.operationsCount++;
            return;
        }
        if(this.quicksort.depth>this.stckMaxSize){
            this.emergency = true;
            this.operationsCount++;
            this.state = "emergency";
            if(this.emergencyAlgo=="heapsort") this.nlognsort = new HeapSort(this.arr);
            if(this.emergencyAlgo=="shellsort") this.nlognsort = new ShellSort(this.arr, Math.floor(gapKnuth(this.arr.length-this.quicksort.a)/3), gapKnuth, this.quicksort.a, this.arr.length);
            this.quicksort.stck.pop();
            return;
        }
        this.operationsCount++;
        this.quicksort.nextStep();
    }
}

function pivotLeft(arr, a, b){
    return a;
}

function pivotRandom(arr, a, b){
    return Math.round(Math.random()*(b-a)+a);
}

function pivotThreeMedian(arr, a, b){
    let p1=arr[Math.floor((a+b)/2)].value, p2 = arr[a].value, p3 = arr[b].value;
    let coc = [p1, p2, p3];
    coc.sort(function(a, b) {
        return a - b;
      });
    arr[a].value = coc[0];
    arr[Math.floor((a+b)/2)].value = coc[1]
    arr[b].value = coc[2];
    return Math.floor((a+b)/2);

}

function pivotExactMedian(arr, a, b){
    tab = []
    for(let i = a; i <= b; i++){
        tab[i] = arr[i].value;
    }
    tab.sort(function(a, b) {
        return a - b;
      });
    let x = tab[Math.round(tab.length/2)];
    for(let i = a; i <= b; i++){
        if(arr[i].value==x) return i;
    }
    return a;
}

function gapShell(x){
    return x/2;
}

function gapKnuth(x){
    let a = 1;
    while(a<x){
        a=a*3+1;
    }
    a=Math.floor(a/3);
    return a;
}

function swap(e1, e2, slow=false){
    if(!slow){
        var x = e1.value;
        e1.value = e2.value;
        e2.value = x;
        return;
    }
}
