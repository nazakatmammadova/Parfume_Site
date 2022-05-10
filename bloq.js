let i=0,text;
text="Bloqlarımız"
function typing(){
    if(i<text.length){
        document.querySelector('h2').innerText+=text.charAt(i);
        i++;
        setTimeout(typing,400)
    }
}
typing();
////////////////////////////////////////////////////
var daire=document.querySelector('.daire')
document.addEventListener('mousemove', function(e){
 var x= e.clientX;
 var y= e.clientY;
 daire.style.left=x+"px";
 daire.style.top=y+"px";    
})