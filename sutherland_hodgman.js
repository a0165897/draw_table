

function port(e){
    var curX = e.clientX-ofstX;
    var curY = e.clientY-ofstY;
    var d = 256;
    var h = 144;
    ctx.clearRect(0,0,c.width,c.height);
    var tpoint = [].concat(point);
    // SH剪裁
    for(var i=0;i<tpoint.length;i++){
        if(tpoint[i].x<(curX-d)){
            var prior,after;
            prior = tpoint[i].y+(tpoint[(i-1+tpoint.length)%tpoint.length].y-tpoint[i].y)*(curX-d-tpoint[i].x)/(tpoint[(i-1+tpoint.length)%tpoint.length].x-tpoint[i].x);
            after = tpoint[(i+1)%tpoint.length].y+(tpoint[i].y-tpoint[(i+1)%tpoint.length].y)*(curX-d-tpoint[(i+1)%tpoint.length].x)/(tpoint[i].x-tpoint[(i+1)%tpoint.length].x);
            tpoint.splice(i,1,{x:(curX-d),y:prior},{x:(curX-d),y:after});
        }
    }
    for(var i=0;i<tpoint.length;i++){
        if(tpoint[i].x>(curX+d)){
            var prior,after;
            prior = tpoint[i].y+(tpoint[(i-1+tpoint.length)%tpoint.length].y-tpoint[i].y)*(curX+d-tpoint[i].x)/(tpoint[(i-1+tpoint.length)%tpoint.length].x-tpoint[i].x);
            after = tpoint[(i+1)%tpoint.length].y+(tpoint[i].y-tpoint[(i+1)%tpoint.length].y)*(curX+d-tpoint[(i+1)%tpoint.length].x)/(tpoint[i].x-tpoint[(i+1)%tpoint.length].x);
            tpoint.splice(i,1,{x:(curX+d),y:prior},{x:(curX+d),y:after});
        }
    }
    for(var i=0;i<tpoint.length;i++){
        if(tpoint[i].y>(curY+h)){
            var prior,after;
            prior = tpoint[i].x+(tpoint[(i-1+tpoint.length)%tpoint.length].x-tpoint[i].x)*(curY+h-tpoint[i].y)/(tpoint[(i-1+tpoint.length)%tpoint.length].y-tpoint[i].y);
            after = tpoint[(i+1)%tpoint.length].x+(tpoint[i].x-tpoint[(i+1)%tpoint.length].x)*(curY+h-tpoint[(i+1)%tpoint.length].y)/(tpoint[i].y-tpoint[(i+1)%tpoint.length].y);
            tpoint.splice(i,1,{x:(prior),y:(curY+h)},{x:after,y:(curY+h)});
        }
    }
    for(var i=0;i<tpoint.length;i++){
        if(tpoint[i].y<(curY-h)){
            var prior,after;
            prior = tpoint[i].x+(tpoint[(i-1+tpoint.length)%tpoint.length].x-tpoint[i].x)*(curY-h-tpoint[i].y)/(tpoint[(i-1+tpoint.length)%tpoint.length].y-tpoint[i].y);
            after = tpoint[(i+1)%tpoint.length].x+(tpoint[i].x-tpoint[(i+1)%tpoint.length].x)*(curY-h-tpoint[(i+1)%tpoint.length].y)/(tpoint[i].y-tpoint[(i+1)%tpoint.length].y);
            tpoint.splice(i,1,{x:(prior),y:(curY-h)},{x:after,y:(curY-h)});
        }
    }
    for(var i=0;i<tpoint.length;i++){
        if(tpoint[i].x<(curX-d)){
            var prior,after;
            prior = tpoint[i].y+(tpoint[(i-1+tpoint.length)%tpoint.length].y-tpoint[i].y)*(curX-d-tpoint[i].x)/(tpoint[(i-1+tpoint.length)%tpoint.length].x-tpoint[i].x);
            after = tpoint[(i+1)%tpoint.length].y+(tpoint[i].y-tpoint[(i+1)%tpoint.length].y)*(curX-d-tpoint[(i+1)%tpoint.length].x)/(tpoint[i].x-tpoint[(i+1)%tpoint.length].x);
            tpoint.splice(i,1,{x:(curX-d),y:prior},{x:(curX-d),y:after});
        }
    }
    for(var i=0;i<tpoint.length;i++){
        if(tpoint[i].x>(curX+d)){
            var prior,after;
            prior = tpoint[i].y+(tpoint[(i-1+tpoint.length)%tpoint.length].y-tpoint[i].y)*(curX+d-tpoint[i].x)/(tpoint[(i-1+tpoint.length)%tpoint.length].x-tpoint[i].x);
            after = tpoint[(i+1)%tpoint.length].y+(tpoint[i].y-tpoint[(i+1)%tpoint.length].y)*(curX+d-tpoint[(i+1)%tpoint.length].x)/(tpoint[i].x-tpoint[(i+1)%tpoint.length].x);
            tpoint.splice(i,1,{x:(curX+d),y:prior},{x:(curX+d),y:after});
        }
    }



    for(var i=0;i<tpoint.length-1;i++){
        draw_line(tpoint[i].x/r, tpoint[i].y/r, tpoint[i+1].x/r, tpoint[i+1].y/r, r);
    }
    draw_line(tpoint[i].x/r,tpoint[i].y/r,tpoint[0].x/r,tpoint[0].y/r,r);
    draw_line((curX-d)/r, (curY-h)/r, (curX+d)/r, (curY-h)/r, r);
    draw_line((curX-d)/r, (curY+h)/r, (curX+d)/r, (curY+h)/r, r);
    draw_line((curX-d)/r, (curY-h)/r, (curX-d)/r, (curY+h)/r, r);
    draw_line((curX+d)/r, (curY-h)/r, (curX+d)/r, (curY+h)/r, r);
}

function clip(){
    imgdata = ctx.getImageData(0,0,c.width,c.height);
    remove();
    canvas.addEventListener('mousemove', port);
}