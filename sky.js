/**
 * Created by JamesMartins on 2015/2/24.
 */
var angle=0;
window.onload=function(){
    var canvas=document.getElementById("canvas");
    var context=canvas.getContext("2d");

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
    var WINDOW_HEIGHT=winHeight;
    var WINDOW_WIDTH=winWidth;
    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;

    //background color
    var skyStyle=context.createRadialGradient(
    canvas.width/2,canvas.height,0,
    canvas.width/2,canvas.height,canvas.height
    )
    skyStyle.addColorStop(0,"#035");
    skyStyle.addColorStop(1,"black");
    context.fillStyle=skyStyle;
    context.fillRect(0,0,canvas.width,canvas.height);


    var angle=0;
    //create the position of star
    var star=[];
    for (var i=0;i<200;i++)
    {
    var starObj={r:Math.random()*10+5,x:Math.random()*canvas.width,
    y:Math.random()*canvas.height*0.65,a:Math.random()*360};
    star.push(starObj);
    }
    setInterval(   function (){
        context.clearRect(0,0,canvas.width,canvas.height);
        context.fillStyle=skyStyle;
        context.fillRect(0,0,canvas.width,canvas.height);

        for (var i = 0; i < 200; i++) {
            angle += 2;
            context.save();
            context.beginPath();
            context.globalAlpha = 1;

            //context.rotate(angle*Math.PI/180);
            context.scale(Math.sin(angle * Math.PI / 180), Math.sin(angle * Math.PI / 180));
//                    if (i == Math.random() * 200) {
//                        for (var i = 0; i < 360; i++) {
//
////                            context.globalAlpha = Math.abs(Math.sin(i / 180 * Math.PI / 1000));
//                            context.save();
////                            context.scale(10*Math.sin(angle * Math.PI / 180), 10*Math.sin(angle * Math.PI / 180));
//                            drawStar(context, star[i].x, star[i].y, star[i].r, star[i].r / 2.0, star[i].a);
//                            context.restore();
//                        }
//
//                    } else drawStar(context, star[i].x, star[i].y, star[i].r, star[i].r / 2.0, star[i].a);
//                context.translate(x,y);
            drawStar(context, star[i].x, star[i].y, star[i].r, star[i].r / 2.0, star[i].a);
            context.restore();

        }
        //context.restore();
        context.fillStyle = skyStyle;
        //context.fillRect(0,0,canvas.width,canvas.height);
        drawLand(canvas,context);
    },400)
    //setInterval(update(canvas,context),60);

    }

function drawStar(context,x,y,outerR,innerR,rot){
    context.save();
    context.beginPath();
    for (var i=0;i<5;i++){
    context.lineTo(Math.cos((18+72*i-rot)/180*Math.PI)*outerR+x,
    -Math.sin((18+72*i-rot)/180*Math.PI)*outerR+y);
    context.lineTo(Math.cos((54+72*i-rot)/180*Math.PI)*innerR+x,
    -Math.sin((54+72*i-rot)/180*Math.PI)*innerR+y);

    }
    context.closePath();
    context.fillStyle="white";//#fb3
    context.lineJoin="round";
    context.strokeStyle="black";//#fd5
    context.lineWidth=3;
    context.fill();
    //context.stroke();
    context.restore();

    }
//    function drawStar(context,outerR,innerR,rot){
//        context.save();
//        context.beginPath();
//        for (var i=0;i<5;i++){
//            context.lineTo(Math.cos((18+72*i-rot)/180*Math.PI)*outerR,
//                            -Math.sin((18+72*i-rot)/180*Math.PI)*outerR);
//            context.lineTo(Math.cos((54+72*i-rot)/180*Math.PI)*innerR,
//                            -Math.sin((54+72*i-rot)/180*Math.PI)*innerR);
//
//        }
//        context.closePath();
//        context.fillStyle="#fb3";
//        context.lineJoin="round";
//        context.strokeStyle="#fd5";
//        context.lineWidth=3;
//        context.fill();
//        context.stroke();
//        context.restore();
//
//    }
function drawLand(canvas,cxt){
    cxt.save();

    cxt.beginPath();
    cxt.moveTo(0,0.75*canvas.height)
    cxt.bezierCurveTo(0.45*canvas.width,0.6*canvas.height,
    0.6*canvas.width,0.8*canvas.height,
    canvas.width,0.65*canvas.height)
    cxt.lineTo(canvas.width,canvas.height);
    cxt.lineTo(0,canvas.height);
    cxt.closePath();
    var landStyle=cxt.createLinearGradient(0,canvas.height,0,0);
    landStyle.addColorStop(0,"#030");
    landStyle.addColorStop(1,"#580");

    cxt.fillStyle=landStyle;
    cxt.fill();




    }

