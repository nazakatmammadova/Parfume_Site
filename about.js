var stop1;
var stop2;
var stop3;
var a=0;
var b=0;
var c=0;
window.addEventListener("scroll",function(){
    console.log(this.screenY)
    if(window.scrollY>900){
        clearInterval(stop1);
        stop1=setInterval(tecrube,480);
        clearInterval(stop2);
        stop2=setInterval(brend,80);
        clearInterval(stop3);
        stop3=setInterval(musteri,40)
    }else{
        a=0;
        b=0;
        c=0;
        document.querySelector('.tecrube').innerHTML=a;
        document.querySelector('.brend').innerHTML=b;
        document.querySelector('.musteri').innerHTML=c;
    }
})
function tecrube(){
    if(a==20){
        clearInterval(stop1)
    }else{
        document.querySelector('.tecrube').innerHTML=++a;
    }
}
function brend(){
    if(b==120){
        clearInterval(stop2)
    }else{
        document.querySelector('.brend').innerHTML=++b;
    }
}
function musteri(){
    if(c==240){
        clearInterval(stop3)
    }else{
        document.querySelector('.musteri').innerHTML=++c;
    }
}
///////////////////////////////////////////////////////////////////////////////
var daire=document.querySelector('.daire')
document.addEventListener('mousemove', function(e){
 var x= e.clientX;
 var y= e.clientY;
 daire.style.left=x+"px";
 daire.style.top=y+"px";    
})
///////////////////////////////////////////////////////////
let i=0,text;
text="Haqqımızda"
function typing(){
    if(i<text.length){
        document.querySelector('h1').innerText+=text.charAt(i);
        i++;
        setTimeout(typing,400)
    }
}
typing();