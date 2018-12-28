var BezierMaker = function(canvas, bezierCtrlNodesArr, color) {
    this.canvas = canvas;//初始化
    this.ctx = this.canvas.getContext('2d');
    this.bezierCtrlNodesArr = bezierCtrlNodesArr ? bezierCtrlNodesArr : [];
    this.color = color ? color: '#ffffff';
    this.bezierArr = [];
};

BezierMaker.prototype.bezier = function(t) { //贝塞尔公式调用
    var x = 0,
        y = 0,
        bezierCtrlNodesArr = this.bezierCtrlNodesArr,
        n = bezierCtrlNodesArr.length - 1,
        self = this;
    bezierCtrlNodesArr.forEach(function(item, index) {
        if(!index) {
            x += item.x * Math.pow(( 1 - t ), n - index) * Math.pow(t, index);
            y += item.y * Math.pow(( 1 - t ), n - index) * Math.pow(t, index);
        } else {
            x += self.factorial(n) / self.factorial(index) / self.factorial(n - index) * item.x * Math.pow(( 1 - t ), n - index) * Math.pow(t, index);
            y += self.factorial(n) / self.factorial(index) / self.factorial(n - index) * item.y * Math.pow(( 1 - t ), n - index) * Math.pow(t, index);
        }
    });
    return {
        x: x, y: y
    }
};

BezierMaker.prototype.drawBezier = function() { //通过控制点算出实时xy值渲染到canvas
    var nodeArr = this.bezierCtrlNodesArr;
        var self = this;
        for(i = 0; i < 1; i+=0.01) {
            this.bezierArr.push(this.bezier(i))
        }
        this.bezierArr.forEach(function(obj, index) {
            if (index) {
                var startX = self.bezierArr[index - 1].x,
                    startY = self.bezierArr[index - 1].y,
                    x = obj.x,
                    y = obj.y;
                draw_line(startX/r, startY/r, x/r, y/r, r);
            }
        })
};
BezierMaker.prototype.factorial = function(num) { //递归阶乘
    if (num <= 1) {
        return 1;
    } else {
        return num * this.factorial(num - 1);
    }
};


function drawdbxb(e) {//每次鼠标移动调用
    toX = e.clientX-ofstX;
    toY = e.clientY-ofstY;
    ctx.putImageData(imgdata,0,0);
    var message = document.getElementById("message");
    message.innerHTML = 'x_start='+point[0].x+' y_start='+point[0].y+ ' x_now='+toX+' y_now='+toY+' 分辨精度='+r+'px';
    point.push({x:toX,y:toY});
    var beziertmp = new BezierMaker(canvas, point, 'black');
    beziertmp.drawBezier();
    for(var i = 0 ; i < point.length ; i++){
        ctx.fillRect(point[i].x, point[i].y, 3*r, 3*r);
    }
    point.pop();
}

function linkb(e){//每次单击调用
    moveX = e.clientX-ofstX;
    moveY = e.clientY-ofstY;
    var p = document.getElementById("p").value;
    p = p>2?p:3;
    if(point.length===p-1){
        point.push({x:moveX,y:moveY});
        canvas.removeEventListener('mousemove', drawdbxb);
        flag_lineb = 1;
    }
    else{
        if (flag_lineb){//起始点
            point = [{x:-1,y:-1}];
            point.pop();
            imgdata = ctx.getImageData(0,0,c.width,c.height);
            flag_lineb--;
            canvas.addEventListener('mousemove', drawdbxb);
        }
        point.push({x:moveX,y:moveY});
    }
}


function bcurve(){
    remove();
    point = [{x:-1,y:-1}];
    flag_circle=0;
    canvas.addEventListener('mouseup', linkb);
}