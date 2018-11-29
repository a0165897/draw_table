function ellipsePlotPoints (xCenter,yCenter,x,y,r) {//用色块模拟像素
    ctx.fillRect((xCenter + x) * r, (yCenter + y) * r, r, r);
    ctx.fillRect((xCenter - x) * r, (yCenter + y) * r, r, r);
    ctx.fillRect((xCenter - x) * r, (yCenter - y) * r, r, r);
    ctx.fillRect((xCenter + x) * r, (yCenter - y) * r, r, r);
}

function draw_circle(x0,y0,x1,y1,thelta,r){
    x0 = Math.round(x0);//取整
    x1 = Math.round(x1);
    y0 = Math.round(y0);
    y1 = Math.round(y1);

    ctx.fillStyle = "#666";
    ctx.save();
    if(thelta !=0){
        var xmin = x0>x1?x1:x0;
        var ymin = y0>y1?y1:y0;
        ctx.translate(xmin,ymin);
        ctx.rotate(thelta);
        x0 -= xmin;
        x1 -= xmin;
        y0 -= ymin;
        y1 -= ymin;
    }

    if((y1-y0)==0){//X轴方向
        ctx.fillRect(x0*r, y0*r, r*(x1-x0), r);
        return 0;
    }
    var xCenter = Math.round((x0+x1)/2);
    var yCenter = Math.round((y0+y1)/2);
    var Rx = Math.abs((x0-x1)/2);
    var Ry = Math.abs((y0-y1)/2);

    var Rx2 = Rx * Rx;
    var Ry2 = Ry * Ry;
    var twoRx2 = 2 * Rx2;
    var twoRy2 = 2 * Ry2;
    var p;
    var x = 0;
    var y = Ry;
    var px = 0;
    var py = twoRx2 * y;
    ellipsePlotPoints(xCenter,yCenter,x,y,r);

    // Region 1 上半椭圆
    p = Math.round(Ry2 - Rx2 * Ry + 0.25 * Rx2);
    while(px<py){
        x++;
        px+=twoRy2;
        if(p<0){
            p += Ry2 + px;
        }
        else{
            y--;
            py -= twoRx2;
            p += Ry2 + px - py;
        }
        ellipsePlotPoints(xCenter,yCenter,x,y,r);
    }

    // Region 2 下半椭圆
    p = Math.round(Ry2*(x+0.5)*(x+0.5)+Rx2*(y-1)*(y-1)-Rx2*Ry2);
    while(y>0){
        y--;
        py -= twoRx2;
        if (p>0){
            p += Rx2 - py;
        }
        else{
            x++;
            px += twoRy2;
            p += Rx2 - py + px;
        }
        ellipsePlotPoints(xCenter,yCenter,x,y,r);
    }

    ctx.restore();
}



function downcircle(e) {
    moveX = e.clientX-ofstX;
    moveY = e.clientY-ofstY;
    canvas.addEventListener('mousemove', drawcircle)
}

function upcircle (e) {
    canvas.removeEventListener('mousemove', drawcircle);
    imgdata = ctx.getImageData(0,0,c.width,c.height);
    point = [{x:-1,y:-1}];
    thelta = 0;
    point.pop();
    point.push({x:moveX,y:moveY});
    point.push({x:toX,y:toY});

}

function drawcircle(e) {
    toX = e.clientX-ofstX;
    toY = e.clientY-ofstY;
    ctx.putImageData(imgdata,0,0);
    var message = document.getElementById("message");
    message.innerHTML = 'x_start='+moveX+' y_start='+moveY+ ' x_now='+toX+' y_now='+toY+' 分辨精度='+r+'px';
    draw_circle(moveX/r, moveY/r, toX/r, toY/r, 0,r);

}

function ellipse(){
    flag_circle = 1;
    point = [{x:-1,y:-1}];
    imgdata = ctx.getImageData(0,0,c.width,c.height);
    remove();
    canvas.addEventListener('mousedown', downcircle);
    canvas.addEventListener('mouseup', upcircle);
}