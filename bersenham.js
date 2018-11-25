function getMax( x ,  y){//最大公约数
    var max,min,temp;
    max = x > y ? x : y ;
    min = x < y ? x : y ;
    while( max % min ){
        temp = max % min;
        max = min;
        min = temp;
    }
    return min;
}

function draw_line(x0,y0,x1,y1,r) {
    x0 = Math.round(x0);//取整
    x1 = Math.round(x1);
    y0 = Math.round(y0);
    y1 = Math.round(y1);


    ctx.fillStyle = "#345";


    if((y1-y0)==0){//X轴方向
        ctx.fillRect(x0*r, y0*r, r*(x1-x0), r);
        return;
    }
    if((x1-x0)==0){//Y轴方向
        ctx.fillRect(x0*r, y0*r, r, r*(y1-y0),r);
        return;
    }


    if((x0>x1)&&(y0>y1)){//终点相对起点在第三象限，交换起点和终点
        var tmp = x0;
        x0 = x1;
        x1 = tmp;

        tmp = y0;
        y0 = y1;
        y1 = tmp;
    }
    var xswitcher = 1;//用来表示某种仿射关系
    var yswitcher = 1;
    if((x0<x1)&&(y0>y1)){//终点相对起点在第四象限，映射到第一象限
        y1 = y0+(y0-y1);
        yswitcher = -1;
    }
    if((x0>x1)&&(y0<y1)){//终点相对起点在第二象限，映射到第一象限
        x1 = x0+(x0-x1);
        xswitcher = -1;
    }
    var flag = 0;
    if ((y1-y0)>(x1-x0)){//斜率大于1
        flag = 1;
        var tmp = x0;
        x0 = y0;
        y0 = tmp;

        tmp = x1;
        x1 = y1;
        y1 = tmp;
    }


    var x = x1 - x0 ;
    var y = y1 - y0 ;
    var gcd = getMax(x,y);//计算长度为x,y的最小公倍数的线段分量
    x = x / gcd +x0 ;
    y = y / gcd +y0 ;
    var arr = [{x:0,y:0}];//一个线段分量的bersenham微元变化存在数组中

    var dx = x - x0 ;
    var dy = y - y0 ;
    var tmpx = x0;
    var tmpy = y0;

    var p = 2*dy - dx;
    for(var i = 1;i < dx;i++){
        tmpx++;
        if(p<0){
            arr.push({x:tmpx-x0,y:tmpy-y0});
            p = p + 2*dy;
        }
        else{
            tmpy++;
            arr.push({x:tmpx-x0,y:tmpy-y0});
            p = p + 2*dy - 2*dx;
        }
    }


    if(!flag){//斜率小于1
        var xs = x0;
        var ys = y0;
        for(var j = 1 ; j <= gcd ; j++) {
            for (var i = 0; i < dx; i++) {
                ctx.fillRect((xs + xswitcher*arr[i].x )* r, (ys + yswitcher*arr[i].y )* r, r, r);

            }
            xs += xswitcher*dx;//线段分量增加
            ys += yswitcher*dy;
        }
    }
    else{//斜率大于1，将x,y交换回来输出
        var xs = x0;
        var ys = y0;
        for(var j = 1 ; j <= gcd ; j++) {
            for (var i = 0; i < dx; i++) {
                if(xswitcher==-1||yswitcher==-1) {//从第一象限映射回原象限
                    ctx.fillRect((2 * y0 - ys - yswitcher * arr[i].y) * r, (2 * x0 - xs - xswitcher * arr[i].x) * r, r, r);
                }
                else {
                    ctx.fillRect((ys + yswitcher * arr[i].y) * r, (xs + xswitcher * arr[i].x) * r, r, r);
                }


            }
            xs += xswitcher*dx;
            ys += yswitcher*dy;
        }
    }

}

function downline(e) {
    moveX = e.clientX-ofstX;
    moveY = e.clientY-ofstY;
    canvas.addEventListener('mousemove', drawline)
}

function upline (e) {
    canvas.removeEventListener('mousemove', drawline);
    imgdata = ctx.getImageData(0,0,c.width,c.height);
    point = [{x:-1,y:-1}];
    point.pop();
    point.push({x:moveX,y:moveY});
    point.push({x:toX,y:toY});
}

function drawline(e) {//被Listener调用或取消
    toX = e.clientX-ofstX;
    toY = e.clientY-ofstY;
    ctx.putImageData(imgdata,0,0);
    var message = document.getElementById("message");
    message.innerHTML = 'x_start='+moveX+' y_start='+moveY+ ' x_now='+toX+' y_now='+toY+' 分辨精度='+r+'px';
    draw_line(moveX/r, moveY/r, toX/r, toY/r, r);

}


function liner(){
    remove();//清除所有绑定事件
    imgdata = ctx.getImageData(0,0,c.width,c.height);//获取当前图像
    flag_circle=0;
    point = [{x:-1,y:-1}];//重置
    canvas.addEventListener('mousedown', downline);
    canvas.addEventListener('mouseup', upline);
}
