/**
 * Created by JamesMartins on 2015/1/18.
 */
var WINDOW_HEIGHT=800;
var WINDOW_WIDTH=1366;
var WINDOW_HEIGHT_TURN=WINDOW_HEIGHT;
var WINDOW_WIDTH_TURN=WINDOW_WIDTH;

var setFontSize=20;//random set

const LengthNum=108;
var RADIUS=Math.round(WINDOW_WIDTH*2/5/LengthNum)-1;

var MARGIN_LEFT=0;
var MARGIN_TOP=60;

const endTime=new Date(2015,1,13,12,0,0);
var curShowTimeSeconds=0;

var balls=[];
const colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
const VISCOSITY=0.5;

var angle=0;
var num=0;
var isIncrease;
window.onload=function(){
    WINDOW_HEIGHT=document.body.clientHeight;
    WINDOW_WIDTH=document.body.clientWidth;
    //WINDOW_HEIGHT=document.documentElement.clientHeight;
    //WINDOW_WIDTH=document.documentElement.clientWidth;    // auto size

    var canvas=document.getElementById("canvas");
    var context=canvas.getContext("2d");
    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;

    var canvas1=document.getElementById("canvas1");
    var context1=canvas1.getContext("2d");
    canvas1.width=WINDOW_WIDTH;
    canvas1.height=WINDOW_HEIGHT;

   findDimensions();//update the WINDOW_para
    //WINDOW_HEIGHT=WINDOW_HEIGHT_TURN;
    //WINDOW_WIDTH=WINDOW_WIDTH_TURN;
    MARGIN_LEFT=WINDOW_WIDTH/5*1.75;
    //alert(MARGIN_LEFT)
    RADIUS=Math.round(WINDOW_WIDTH*2.5/5/LengthNum)-1;
    //alert(RADIUS);
    MARGIN_TOP=WINDOW_HEIGHT/24*8
    ;




    // context.font="50px Georgia";
    //context.fillText("Hello World!",400,400);
    context1.save();
    var backgroundImage=new Image();
    backgroundImage.src="background.jpg";
    context1.globalAlpha=0.005;
    context1.drawImage(backgroundImage,0,0,2005,1338,0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    context1.restore();

    //alert(canvas1.height);
    curShowTimeSeconds=getCurrentShowTime();
    setInterval(
        function() {
            render(context,context1);
            update();
        },
        50
    );
};
function update(){
    var nextShowTimeSeconds=getCurrentShowTime();

    var nextHour=parseInt(nextShowTimeSeconds/3600);
    var nextMinute=parseInt((nextShowTimeSeconds-nextHour*3600)/60);
    var nextSeconds=parseInt(nextShowTimeSeconds%60);

    var curHour=parseInt(curShowTimeSeconds/3600);
    var curMinute=parseInt((curShowTimeSeconds-curHour*3600)/60);
    var curSeconds=parseInt(curShowTimeSeconds%60);
    if(nextSeconds!=curSeconds) {
        if(parseInt(curHour/10)!=parseInt(nextHour/10))
            addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curHour/10));
        if(parseInt(curHour%10)!=parseInt(nextHour%10))
            addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHour%10));
        if(parseInt(curMinute/10)!=parseInt(nextMinute/10))
            addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curHour/10));
        if(parseInt(curMinute%10)!=parseInt(nextMinute%10))
            addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curHour%10));
        if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10))
            addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curHour/10));
        if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10))
            addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curHour%10));
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
function render(cxt,context1){


    cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);//refresh the
    cxt.save();
   /*var gr=cxt.createLinearGradient(WINDOW_WIDTH,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    gr.addColorStop(0,"#fff");
    gr.addColorStop(0.5,"#ddd");
    gr.addColorStop(0.6,"#dce");
    gr.addColorStop(0.7,"#dff");
    gr.addColorStop(0.8,"#edf");
    gr.addColorStop(0.9,"#ee8");
    gr.addColorStop(0.98,"#ee3");
    gr.addColorStop(1,"#fff");

    cxt.fillStyle=gr;*/
    cxt.globalAlpha=1;

    cxt.fillStyle="#ffa";
    
    cxt.fillRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    cxt.restore();

    /*cxt.save();
    var backgroundImage=new Image();
    backgroundImage.src="background.jpg";
    cxt.globalAlpha=0.5;
    cxt.drawImage(backgroundImage,0,0,2005,1338,0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    cxt.restore();*/
    context1.save();
    var backgroundImage=new Image();
    backgroundImage.src="background.jpg";
    context1.globalAlpha=1;
    context1.drawImage(backgroundImage,0,0,2005,1338,0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    context1.restore();



    if(WINDOW_HEIGHT!=WINDOW_HEIGHT_TURN||WINDOW_WIDTH!=WINDOW_WIDTH_TURN)
    {
        var canvas=document.getElementById("canvas");
        WINDOW_HEIGHT=WINDOW_HEIGHT_TURN;
        WINDOW_WIDTH=WINDOW_WIDTH_TURN;
        canvas.width=WINDOW_WIDTH;
        canvas.height=WINDOW_HEIGHT;//change the size of canvas
        canvas1.width=WINDOW_WIDTH;
        canvas1.height=WINDOW_HEIGHT;
        MARGIN_LEFT=WINDOW_WIDTH/5*1.5;
        RADIUS=Math.round(WINDOW_WIDTH*2.5/5/LengthNum)-1;
        MARGIN_TOP=WINDOW_HEIGHT/24*5.3;
         }

    var hour=parseInt(curShowTimeSeconds/3600);
    var minute=parseInt((curShowTimeSeconds-hour*3600)/60);
    var seconds=parseInt(curShowTimeSeconds%60);

    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hour/10),cxt);
    renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hour%10),cxt);

    renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,cxt);

    renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minute/10),cxt);
    renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minute%10),cxt);

    renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,cxt);

    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),cxt);
    renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),cxt);

    for(var i=0;i<balls.length;i++){
        cxt.fillStyle=balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
        cxt.closePath();

        cxt.fill();
    }


    setFontSize=Math.max(WINDOW_HEIGHT,WINDOW_WIDTH)/18;
    //var temp=setFontSize+"px "+"Georgia";
    cxt.font="bold "+setFontSize+"px "+"Verdana, Geneva, sans-serif";
    //alert(cxt.font);
    cxt.save();


    cxt.fillStyle="olive";

    cxt.textAlign="center";
    cxt.textBaseline="ideographic";
    /*cxt.shadowColor="gray";
    cxt.shadowOffsetX=3;
    cxt.shadowOffsetY=3;
    cxt.shadowBlur=2;*/
    cxt.fillText("衡阳市大学生联合会四周年",(WINDOW_WIDTH)/2,WINDOW_HEIGHT/24*3.5);//10*(RADIUS+1)
    //cxt.textAlign="center";
    cxt.restore();


    cxt.save();
    cxt.textAlign="right";
    cxt.textBaseline="bottom";
    setFontSize=Math.max(WINDOW_HEIGHT,WINDOW_WIDTH)/18;
    cxt.font="bold "+setFontSize+"px "+"Verdana, Geneva, sans-serif";
    setFontSize=Math.max(WINDOW_HEIGHT,WINDOW_WIDTH)/25;
    var gr=cxt.createLinearGradient((WINDOW_WIDTH/24*3.5-5/2*parseInt(setFontSize)),0
        ,(WINDOW_WIDTH/24*3.5+5/2*parseInt(setFontSize)),0);
    gr.addColorStop(0,"coral");
    gr.addColorStop(0.4,"brown");
    gr.addColorStop(0.6,"olive");
    gr.addColorStop(1,"gold");
    cxt.fillStyle=gr;
    cxt.font="bold "+setFontSize+"px "+"Verdana, Geneva, sans-serif";
    cxt.fillText("年会倒计时：",MARGIN_LEFT,MARGIN_TOP+(RADIUS+1)*5*2);
    cxt.restore();




    cxt.save();
    setFontSize=Math.max(WINDOW_HEIGHT,WINDOW_WIDTH)/25;
    setFontSize+=parseFloat(num/10);
    cxt.font="bold "+setFontSize+"px "+"Georgia";
    cxt.textAlign="center";
    cxt.textBaseline="ideographic";
    cxt.shadowColor="gray";
    cxt.fillStyle="blue";
    cxt.globalAlpha=Math.abs(Math.sin(angle));
    if(angle>500)
        angle=0;
    else angle+=0.09;

    if(num>30)
        isIncrease=false;
    else if(num<=0)
        isIncrease=true;
    if(isIncrease)
        num++;
    else num--;


    cxt.fillText("——有趣的灵魂 总会相遇",(WINDOW_WIDTH)/2,WINDOW_HEIGHT/24*14);//10*(RADIUS+1)
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