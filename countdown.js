/**
 * Created by JamesMartins on 2015/1/18.
 */
var WINDOW_HEIGHT=600;
var WINDOW_WIDTH=800;
var WINDOW_HEIGHT_TURN=WINDOW_HEIGHT;
var WINDOW_WIDTH_TURN=WINDOW_WIDTH;

var setFontSize=20;//random set

const LengthNum=147;
var RADIUS=Math.round(WINDOW_WIDTH*4/5/LengthNum)-1;

var MARGIN_LEFT=0;
var MARGIN_TOP=60;

const endTime=new Date(2015,1,13,12,0,0);
var curShowTimeSeconds=0;

var balls=[];
const colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
const VISCOSITY=0.4;

var angle=0;
var num=0;
window.onload=function(){
    //WINDOW_HEIGHT=document.body.clientHeight;
    //WINDOW_WIDTH=document.body.clientWidth;
    WINDOW_HEIGHT=document.documentElement.clientHeight;
    WINDOW_WIDTH=document.documentElement.clientWidth;    // auto size
    var canvas=document.getElementById("canvas");
    var context=canvas.getContext("2d");

   //findDimensions();//update the WINDOW_para
    //WINDOW_HEIGHT=WINDOW_HEIGHT_TURN;
    //WINDOW_WIDTH=WINDOW_WIDTH_TURN;
    MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
    RADIUS=Math.round(WINDOW_WIDTH*4/5/LengthNum)-1;
    MARGIN_TOP=WINDOW_HEIGHT/2-30*(RADIUS+1)-60;

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
    //updateScreen(context);
    window.onresize=findDimensions;
    console.log(balls.length);
}


function findDimensions()  {//函数：获取尺寸
      var winWidth;
      var winHeight;
      //获取窗口宽度
      if (window.innerWidth)
           winWidth = window.innerWidth;
      else if ((document.body) && (document.body.clientWidth))
           winWidth = document.body.clientWidth;
      //获取窗口高度
       if (window.innerHeight)
           winHeight = window.innerHeight;
       else if ((document.body) && (document.body.clientHeight))
           winHeight = document.body.clientHeight;
      //通过深入Document内部对body进行检测，获取窗口大小
    if (document.documentElement  && document.documentElement.clientHeight && document.documentElement.clientWidth)
     {
           winHeight = document.documentElement.clientHeight;
           winWidth = document.documentElement.clientWidth;
      }
        WINDOW_HEIGHT_TURN=winHeight;
        WINDOW_WIDTH_TURN=winWidth;
        //alert(WINDOW_HEIGHT);
        //alert(WINDOW_WIDTH);

}
/*function updateScreen(context){
    WINDOW_HEIGHT=document.documentElement.clientHeight; // auto size
    WINDOW_WIDTH=document.documentElement.clientWidth;
    MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
    RADIUS=Math.round(WINDOW_WIDTH*4/5/LengthNum)-1;
    MARGIN_TOP=WINDOW_HEIGHT/2-25*(RADIUS+1)-60;
}*/
function updateBalls(){
    for(var i=0;i<balls.length;i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * (1-VISCOSITY);
            balls[i].vx = 1.1*balls[i].vx ;

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
    if(WINDOW_HEIGHT!=WINDOW_HEIGHT_TURN||WINDOW_WIDTH!=WINDOW_WIDTH_TURN)
    {
        var canvas=document.getElementById("canvas");
        WINDOW_HEIGHT=WINDOW_HEIGHT_TURN;
        WINDOW_WIDTH=WINDOW_WIDTH_TURN;
        canvas.width=WINDOW_WIDTH;
        canvas.height=WINDOW_HEIGHT;//change the size of canvas
        MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
        RADIUS=Math.round(WINDOW_WIDTH*4/5/LengthNum)-1;
        MARGIN_TOP=WINDOW_HEIGHT/2-30*(RADIUS+1)-60;
         }

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
    /*cxt.save();
    var globalgradient=cxt.createRadialGradient(0,WINDOW_WIDTH/2,WINDOW_HEIGHT/2,WINDOW_HEIGHT,WINDOW_WIDTH/2,WINDOW_HEIGHT/4*3);
    globalgradient.addColorStop(0,"#035");
    globalgradient.addColorStop(1,"#black");
    cxt.fillStyle=globalgradient;
    cxt.fillRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    cxt.restore();*/

    setFontSize=Math.max(WINDOW_HEIGHT,WINDOW_WIDTH)/15;
    //var temp=setFontSize+"px "+"Georgia";
    cxt.font="italic bold "+setFontSize+"px "+"Verdana, Geneva, sans-serif";
    //alert(cxt.font);
    cxt.save();
    cxt.fillStyle="blue";
    cxt.textAlign="center";
    cxt.textBaseline="ideographic";
    cxt.shadowColor="gray";
    cxt.shadowOffsetX=5;
    cxt.shadowOffsetY=5;
    cxt.shadowBlur=20;
    cxt.fillText("衡阳市大学生联合会",(WINDOW_WIDTH)/2,WINDOW_HEIGHT/24*13);//10*(RADIUS+1)
    //cxt.textAlign="center";
    cxt.restore();


    cxt.save();
    cxt.textAlign="center";
    cxt.textBaseline="ideographic";
    setFontSize=Math.max(WINDOW_HEIGHT,WINDOW_WIDTH)/15;
    cxt.font="italic bold "+setFontSize+"px "+"Verdana, Geneva, sans-serif";
   var gr=cxt.createLinearGradient((WINDOW_WIDTH-5*parseInt(setFontSize))/2,0
        ,(WINDOW_WIDTH+5*parseInt(setFontSize))/2,0);
    gr.addColorStop(0,"red");
    gr.addColorStop(0.4,"orange");
    gr.addColorStop(0.6,"blue");
    gr.addColorStop(1,"green");
   cxt.fillStyle=gr;
    cxt.fillText("四周年年会",(WINDOW_WIDTH)/2,WINDOW_HEIGHT/24*18);
    cxt.restore();


    cxt.save();
    setFontSize=Math.max(WINDOW_HEIGHT,WINDOW_WIDTH)/30;
    setFontSize+=parseFloat(num/10);
    cxt.font=setFontSize+"px "+"Georgia";
    cxt.textAlign="left";
    cxt.textBaseline="ideographic";
    cxt.shadowColor="gray";
    cxt.fillStyle="blue";
    cxt.globalAlpha=Math.abs(Math.sin(angle));
    if(angle>500)
        angle=0;
    else angle+=0.05;

    if(num>30)
        isIncrease=false;
    else if(num<=0)
        isIncrease=true;
    if(isIncrease)
        num++;
    else num--;


    cxt.fillText("——有趣的灵魂 总会相遇",MARGIN_LEFT,WINDOW_HEIGHT/24*21);//10*(RADIUS+1)
    //cxt.textAlign="center";
    cxt.restore();


    //setFontSize="20";
    //cxt.fillStyle="rgb(0,102,153)";
   //setFontSize=Math.max(WINDOW_HEIGHT,WINDOW_WIDTH)/60;
    //cxt.font=setFontSize+"px "+"Georgia";
    //cxt.fillText("FoYu",MARGIN_LEFT,WINDOW_HEIGHT-parseInt(setFontSize)*2);
    //cxt.fillText("FaYe",MARGIN_LEFT,WINDOW_HEIGHT-parseInt(setFontSize));
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