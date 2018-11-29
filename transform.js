function hint(){
    alert("点击绘制按钮后开始绘制图形");
    alert("绘制完成后在输入框输入" +
        "\n x轴平移像素(如20) y轴平移像素" +
        "\n x轴缩放倍数(如1.5) y轴缩放倍数" +
        "\n 旋转角度(如60) 无" );
}


function move(){//平移
    var tmpx = document.getElementById("movex").value;
    var tmpy = document.getElementById("movey").value;
    ctx.clearRect(0,0,c.width,c.height);
    for(var i=0;i<point.length;i++){
        point[i].x += Number(tmpx);
        point[i].y -= Number(tmpy);
    }
    if(flag_circle===0){//绘制线段
        for(var i=0;i<point.length-1;i++){
            draw_line(point[i].x/r, point[i].y/r, point[i+1].x/r, point[i+1].y/r, r);
        }
        draw_line(point[i].x/r,point[i].y/r,point[0].x/r,point[0].y/r,r);
        // fill(point,r);
    }else{//绘制椭圆
        draw_circle(point[0].x/r,point[0].y/r,point[1].x/r,point[1].y/r,thelta,r);
    }
    imgdata = ctx.getImageData(0,0,c.width,c.height);
}
function large(){//缩放
    var tmpx = document.getElementById("movex").value;
    var tmpy = document.getElementById("movey").value;
    ctx.clearRect(0,0,c.width,c.height);
    var xx = (point[0].x+point[1].x)*(Number(tmpx)-1)/2;
    var yy = (point[0].y+point[1].y)*(Number(tmpy)-1)/2;
    for(var i=0;i<point.length;i++){//倍乘
        point[i].x = point[i].x*Number(tmpx)-xx;
        point[i].y = point[i].y*Number(tmpy)-yy;
    }
    if(flag_circle===0){
        for(var i=0;i<point.length-1;i++){
            draw_line(point[i].x/r, point[i].y/r, point[i+1].x/r, point[i+1].y/r, r);
        }
        draw_line(point[i].x/r,point[i].y/r,point[0].x/r,point[0].y/r,r);
        // fill(point,r);

    }else{
        draw_circle(point[0].x/r,point[0].y/r,point[1].x/r,point[1].y/r,thelta,r);
    }
    imgdata = ctx.getImageData(0,0,c.width,c.height);
}
function trans(){//旋转
    var tmpx = document.getElementById("movex").value;
    tmpx = (tmpx/180)*Math.PI;//角度->弧度
    ctx.clearRect(0,0,c.width,c.height);
    if(flag_circle===0){
        for(var i=1;i<point.length;i++){
            var xx,yy;//矩阵运算
            xx = point[i].x-point[0].x;
            yy = point[i].y-point[0].y;
            point[i].x = xx*Math.cos(Number(tmpx)) - yy*Math.sin(Number(tmpx));
            point[i].y = xx*Math.sin(Number(tmpx)) + yy*Math.cos(Number(tmpx));
            point[i].y=point[i].y+point[0].y;
            point[i].x=point[i].x+point[0].x;
        }
        for(var i=0;i<point.length-1;i++){
            draw_line(point[i].x/r, point[i].y/r, point[i+1].x/r, point[i+1].y/r, r);
        }
        draw_line(point[i].x/r,point[i].y/r,point[0].x/r,point[0].y/r,r);
        // fill(point,r);
    }else{
        thelta+=Number(tmpx);//椭圆旋转倾斜角
        draw_circle(point[0].x/r,point[0].y/r,point[1].x/r,point[1].y/r,thelta,r);
    }
    imgdata = ctx.getImageData(0,0,c.width,c.height);
}
