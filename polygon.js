var flag_line = 1;
function drawdbx(e) {//每次鼠标移动调用
    toX = e.clientX-ofstX;
    toY = e.clientY-ofstY;
    ctx.putImageData(imgdata,0,0);
    var message = document.getElementById("message");
    message.innerHTML = 'x_start='+point[0].x+' y_start='+point[0].y+ ' x_now='+toX+' y_now='+toY+' 分辨精度='+r+'px';
    if(Math.abs(toX-point[0].x)<10 && Math.abs(toY-point[0].y)<10){
        draw_line(moveX/r, moveY/r, point[0].x/r, point[0].y/r, r);
    }//线段终点在多边形起始点附近，直接连接到起始点，多边形封闭，结束。
    else{
        draw_line(moveX/r, moveY/r, toX/r, toY/r, r);
    }
}

function link(e){//每次单击调用
    moveX = e.clientX-ofstX;
    moveY = e.clientY-ofstY;
    if(Math.abs(moveX-point[0].x)<10 && Math.abs(moveY-point[0].y)<10){
        canvas.removeEventListener('mousemove', drawdbx);//判断为试图封闭整个多变形
        // fill(point,r);
        imgdata = ctx.getImageData(0,0,c.width,c.height);
        flag_line = 1;
    }
    else{
        if (flag_line){//起始点
            point = [{x:-1,y:-1}];
            point.pop();
            flag_line--;
        }
        point.push({x:moveX,y:moveY});
        canvas.addEventListener('mousemove', drawdbx);
        imgdata = ctx.getImageData(0,0,c.width,c.height);
    }
}

function poly(){
    remove();
    imgdata = ctx.getImageData(0,0,c.width,c.height);
    point = [{x:-1,y:-1}];
    flag_circle=0;
    canvas.addEventListener('mouseup', link);
}
