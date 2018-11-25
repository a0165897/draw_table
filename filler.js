var compare = function (x, y) {//比较函数
    if (x < y) {
        return -1;
    } else if (x > y) {
        return 1;
    } else {
        return 0;
    }
};
// 填色
function fill(point,r){
    var et = [{x0:point[0].x,y0:point[0].y,x1:point[1].x,y1:point[1].y}];
    var i;
    var ymin=et[0].y0,ymax=et[0].y0;
    for(i=1;i<(point.length-1);i++){
        et.push({x0:point[i].x,y0:point[i].y,x1:point[i+1].x,y1:point[i+1].y});
        if(point[i].y<ymin){
            ymin = point[i].y;
        }
        if (point[i].y>ymax){
            ymax = point[i].y;
        }
    }
    et.push({x0:point[i].x,y0:point[i].y,x1:point[0].x,y1:point[0].y});
    if(point[i].y<ymin){
        ymin = point[i].y;
    }
    if (point[i].y>ymax){
        ymax = point[i].y;
    }
    var line = ymin+1;
    for(;line<=ymax;line++){
        var aet=[];
        var j,k,tmp;
        for(j=0;j<et.length;j++){
            if((line-et[j].y0)*(line-et[j].y1)<=0){
                tmp = Math.floor(et[j].x1 + (et[j].x0-et[j].x1)*(line-et[j].y1)/(et[j].y0-et[j].y1));
                if(aet[aet.length-1]!==tmp && aet[0]!==tmp && (et[j].y0-et[j].y1)!==0){
                    aet.push(tmp);
                }
                else {
                    if(aet[aet.length-1]===tmp && (line-et[j-1].y0)*(line-et[j].y1)>0){
                        aet.push(tmp);
                    }
                    if(aet[0]===tmp && (line-et[0].y1)*(line-et[j].y0)>0){
                        aet.push(tmp);
                    }
                }
            }
        }
        aet.sort(compare);
        for(k=0;k<aet.length;k=k+2){
            for(j=aet[k];j<aet[k+1];j++){
                ctx.fillRect(j,line,r,r);
            }
        }
    }
}


