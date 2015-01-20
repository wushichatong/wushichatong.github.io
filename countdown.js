/**
 * Created by JamesMartins on 2015/1/18.
 */
var WINDOW_HEIGHT=600;
var WINDOW_WIDTH=800;

const LengthNum=147;
var RADIUS=Math.round(WINDOW_WIDTH*4/5/LengthNum)-1;

var MARGIN_LEFT=0;
var MARGIN_TOP=60;

const endTime=new Date(2015,2,5,0,0,0);
var curShowTimeSeconds=0;

var balls=[];
const colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
const VISCOSITY=0.4;

window.onload=function(){
    //WINDOW_HEIGHT=document.body.clientHeight;
    WINDOW_WIDTH=document.body.clientWidth;
    WINDOW_HEIGHT=document.documentElement.clientHeight;
    //WINDOW_WIDTH=document.documentElement.clientWidth;    // auto size
    //alert(WINDOW_HEIGHT);
    //alert(WINDOW_WIDTH);
    MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
    RADIUS=Math.round(WINDOW_WIDTH*4/5/LengthNum)-1;
    MARGIN_TOP=WINDOW_HEIGHT/2-25*(RADIUS+1)-60;
    var canvas=document.getElementById("canvas");
    var context=canvas.getContext("2d");


    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;


    // context.font="50px Georgia";
    //context.fillText("Hello World!",400,400);


    curShowTimeSeconds=getCurrentShowTime();
    setInterval(
        function() {
            render(context);
            update();
        },
        50
    );
};
function update(){
    var nextShowTimeSeconds=getCurrentShowTime();
    var nextDay=parseInt(nextShowTimeSeconds/3600/24);
    var nextHour=parseInt((nextShowTimeSeconds-nextDay*24*3600)/3600);
    var nextMinute=parseInt((nextShowTimeSeconds-nextDay*24*3600-nextHour*3600)/60);
    var nextSeconds=parseInt(nextShowTimeSeconds%60);

    var curDay=parseInt(curShowTimeSeconds/3600/24);
    var curHour=parseInt((curShowTimeSeconds-curDay*24*3600)/3600);
    var curMinute=parseInt((curShowTimeSeconds-curDay*24*3600-curHour*3600)/60);
    var curSeconds=parseInt(curShowTimeSeconds%60);
    if(nextSeconds!=curSeconds) {
        if(parseInt(curDay/10)!=parseInt(nextDay/10))
            addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curDay/10));
        if(parseInt(curDay%10)!=parseInt(nextDay%10))
            addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curDay%10));
        if(parseInt(curHour/10)!=parseInt(nextHour/10))
            addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curHour/10));
        if(parseInt(curHour%10)!=parseInt(nextHour%10))
            addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curHour%10));
        if(parseInt(curMinute/10)!=parseInt(nextMinute/10))
            addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curHour/10));
        if(parseInt(curMinute%10)!=parseInt(nextMinute%10))
            addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curHour%10));
        if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10))
            addBalls(MARGIN_LEFT+117*(RADIUS+1),MARGIN_TOP,parseInt(curHour/10));
        if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10))
            addBalls(MARGIN_LEFT+132*(RADIUS+1),MARGIN_TOP,parseInt(curHour%10));
        curShowTimeSeconds = nextShowTimeSeconds;
    }
    updateBalls();
    console.log(balls.length);
}
function updateBalls(){
    for(var i=0;i<balls.length;i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * (1-VISCOSITY);
            balls[i].vx = 1.2*balls[i].vx ;

        }
        /*      if (balls[i].x>= WINDOW_WIDTH - RADIUS) {
         balls[i].x = WINDOW_WIDTH - RADIUS;
         balls[i].vx = -2*balls[i].vx ;
         }*/
    }
    var cnt=0;
    for(var t=0;t<balls.length;t++){
        if(balls[t].x+RADIUS>0&&balls[t].x-RADIUS<WINDOW_WIDTH)
            balls[cnt++]=balls[t];}
    //while(balls.length>cnt) {
    while(balls.length>Math.min(500,cnt) ){
        balls.pop();
    }
}
function addBalls(x,y,num){
    for(var i =0;i<digit[num].length;i++)
        for(var j=0;j<digit[num][i].length;j++)
            if(digit[num][i][j]==1){
                var aBall={
                    x:x+j*2*(RADIUS+1)+RADIUS+1,
                    y:y+i*2*(RADIUS+1)+RADIUS+1,
                    g:1+Math.random(),
                    vx:-2+Math.pow(-1,Math.ceil(Math.random()*1000))*3,
                    vy:-2-5*Math.random(),
                    color:colors[Math.floor(Math.random()*colors.length)]
                };
                balls.push(aBall);
            }

}
function getCurrentShowTime(){
    var curTime=new Date();
    var ret=endTime.getTime()-curTime.getTime();
    ret=Math.round(ret/1000);//ms transition s

    return ret>=0?ret:0;
}
function render(cxt){
    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);//refresh the
    var day=parseInt(curShowTimeSeconds/3600/24);
    var hour=parseInt((curShowTimeSeconds-day*24*3600)/3600);
    var minute=parseInt((curShowTimeSeconds-day*24*3600-hour*3600)/60);
    var seconds=parseInt(curShowTimeSeconds%60);

    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(day/10),cxt);
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(day%10),cxt);

    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);

    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(hour/10),cxt);
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(hour%10),cxt);

    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);

    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(minute/10),cxt);
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(minute%10),cxt);

    renderDigit(MARGIN_LEFT+108*(RADIUS+1),MARGIN_TOP,10,cxt);

    renderDigit(MARGIN_LEFT+117*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT+132*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);

    for(var i=0;i<balls.length;i++){
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
        cxt.closePath();

        cxt.fill();
    }

    cxt.font="100px Georgia";
    cxt.fillText("COUNTDOWN!",(WINDOW_WIDTH-7*100)/2,WINDOW_HEIGHT/2+10*(RADIUS+1));


    cxt.fillStyle="rgb(0,102,153)";//no then changeable
    cxt.font="20px Georgia";
    cxt.fillText("FoYu",MARGIN_LEFT,WINDOW_HEIGHT-40);
    cxt.fillText("FaYe",MARGIN_LEFT,WINDOW_HEIGHT-20);
    //cxt.fillText("For You",MARGIN_LEFT,500);
    //cxt.fillText("Fa   Ye ",MARGIN_LEFT,580);



}
function renderDigit(x,y,num,cxt){
    cxt.fillStyle="rgb(0,102,153)";

    for(var i =0;i<digit[num].length;i++)
        for(var j=0;j<digit[num][i].length;j++)
            if(digit[num][i][j]==1){
                cxt.beginPath();
                cxt.arc(x+j*2*(RADIUS+1)+RADIUS+1,y+i*2*(RADIUS+1)+RADIUS+1,RADIUS,0,2*Math.PI);
                cxt.closePath();
                cxt.fill();
            }
}