let i=0,text;
text="Kateqoriyalar"
function typing(){
    if(i<text.length){
        document.querySelector('h1').innerText+=text.charAt(i);
        i++;
        setTimeout(typing,400)
    }
}
typing();
///////////////////////////////////////////////////////////////////////
var daire=document.querySelector('.daire')
document.addEventListener('mousemove', function(e){
 var x= e.clientX;
 var y= e.clientY;
 daire.style.left=x+"px";
 daire.style.top=y+"px";    
})
///////////////////////////////////////////////////////////////////////////////
const kateqori=[
   {
    catid:"man",
    Name:"Kişi ətirləri"
    },
    {
    catid:"woman",
    Name:"Qadın ətirləri"
    },
    {
    catid:"famous",
    Name:"Popular ətirlər"
    },
    {
    catid:"sirin",
    Name:"Şirin ətirlər"
    },
    {
    catid:"tund",
    Name:"Tünd ətirlər"
    },
    {
    catid:"cicek",
    Name:"Çiçək ətirləri"
    },
]
kateqori.forEach(x=>{
    document.querySelector(".kat ul").innerHTML+=`<li catid="${x.catid}">${x.Name}</li>`
})
document.querySelectorAll(".kat li").forEach(x=>{
    x.addEventListener("click", function(){
        document.querySelectorAll(".col-md-3").forEach(item=>{
            if(!x.getAttribute("catid")){
                item.style.display="block"
            }
            else{
                item.style.display="none"
            } 
        })
        document.querySelectorAll(".c"+x.getAttribute("catid")).forEach(item=>{
            item.style.display="block"
        })
    })
})
$(document).ready(function () {
    $(".kat li").click(function () {
        $(".kat li").removeClass("active") 
        $(this).addClass("active") 
    });
});
////////////////////////////////////////////////////////////////////
const etirler=[
    {
        id:1,
        img:"./img/etir1.png",
        price:'345',
        name:"Versace",
        catid:"famous"
    },
    {
        id:2,
        img:"./img/etir9.jpg",
        price:"399",
        name:"Escada",
        catid:"famous"
    },
    {
        id:3,
        img:"./img/etir4.jpg",
        price:"269",
        name:"Poison",
        catid:"famous"
    },
    {
        id:4,
        img:"./img/etir5.jpg",
        price:"299",
        name:"My Way",
        catid:"famous"
    },
    {
        id:5,
        img:"./img/etir2.jpg",
        price:"268",
        name:"Daisy",
        catid:"woman"
    },
    {
        id:6,
        img:"./img/etir3.jpg",
        price:"379",
        name:"Pure XS",
        catid:"woman"
    },
    {
        id:7,
        img:"./img/etir6.jpg",
        price:"255",
        name:"Chanel",
        catid:"woman"
    },
    {
        id:8,
        img:"./img/etir7.jpg",
        price:"300",
        name:"Miss Dior",
        catid:"woman"
    },
    {
        id:9,
        img:"./img/etir8.jpg",
        price:"244",
        name:"Bleu Chanel",
        catid:"man"
    },
    {
        id:10,
        img:"./img/etir10.jpg",
        price:"349",
        name:"Tom Ford",
        catid:"man"
    },
    {
        id:11,
        img:"./img/etir12.jpg",
        price:"329",
        name:"Mugler",
        catid:"man"
    },
    {
        id:12,
        img:"./img/etir11.jpg",
        price:"399",
        name:"Calvin Klein",
        catid:"man"
    },
    {
        id:13,
        img:'./img/etir13.jpg',
        price:'399',
        name:'Dolce & Gabbana',
        catid:'sirin'
    },
    {
        id:14,
        img:'./img/etir14.jpg',
        price:'276',
        name:'My Burberro',
        catid:'sirin'
    },
    {
        id:15,
        img:'./img/etir20.png',
        price:'245',
        name:'Valentino',
        catid:'sirin'
    }, 
    {
        id:16,
        img:'./img/etir21.jpg',
        price:'215',
        name:'Narciso',
        catid:'sirin'
    }, 
    {
        id:17,
        img:'./img/etir15.jpg',
        price:'412',
        name:'Encre Noire',
        catid:'tund'
    },
    {
        id:18,
        img:'./img/etir16.jpg',
        price:'288',
        name:'Sauvage Dior',
        catid:'tund'
    },
    {
        id:19,
        img:'./img/etir19.jpg',
        price:'389',
        name:'Goldea',
        catid:'tund'
    },
    {
        id:20,
        img:'./img/etir22.jpg',
        price:'245',
        name:'Signorina',
        catid:'tund'
    },
    {
        id:21,
        img:'./img/etir17.jpg',
        price:'325',
        name:'Dior Homme',
        catid:'cicek'
    },
    {
        id:22,
        img:'./img/etir18.jpg',
        price:'425',
        name:'Majestic Rose',
        catid:'cicek'
    },
    {
        id:23,
        img:'./img/etir23.jpg',
        price:'299',
        name:'Amethyst',
        catid:'cicek'
    }, 
    {
        id:24,
        img:'./img/etir24.jpg',
        price:'379',
        name:'Black Opium',
        catid:'cicek'
    },              
]
etirler.forEach((x)=>{
    document.querySelector('.etir').innerHTML+=
    `<div class="col-md-3 py-2 c${x.catid}">
    <div class="xana">
      <div class="sekil">
        <img class="w-100 " src="${x.img}">
      </div>
      <div class="yazilar">
        <h3 class="text-center">${x.name}</h3>
        <div class="d-flex">
          <p class="fs-5">${x.price}<span>$</span></p>
          <button type="button" class="bg-dark text-light px-3" onclick="addbasket(${x.id})">
           Səbətə əlavə et 
          </button>
        </div>
      </div>
      </div>`
    })
let sebet=[ ]
function sebetload(){
    document.querySelector("table").innerHTML=" "
    let total=0 ;
    sebet.forEach((s,index)=>{
        const test=etirler.filter((item)=>{
            return item.id==s.id
        })[0]
        test.count=s.count  
        document.querySelector("table").innerHTML+=
        `<tr>
    <td><img src="${test.img}"></td>
    <td>${test.name}</td>
    <td><p class="pt-3"><span class="btn" onclick="azalt(${test.id})"><i class="bi bi-dash-lg"></i></span>${test.count}<span class="btn" onclick="artir(${test.id})"><i class="bi bi-plus-lg"></i></span></p></td>
    <td><span>${test.count*test.price}</span> $</td>
    <td onclick="removerow(${index})"><span class="dlt"><i class="bi bi-x"></i></span></td>
  </tr>`
    total+=test.price*test.count
    })
    document.querySelector("#totalprice").innerHTML=total+" $ "
}
function removerow(x){
    sebet.splice(x,1)
    sebetload()
    document.querySelector("#btnbasket span").innerHTML=sebet.length
}
function addbasket(x){
    let axtar=sebet.filter((s)=>{
        return s.id==x
    })
    if(axtar.length==0){
        sebet.push({
            id: x,
            count:1
        })
    }else{
        axtar[0].count++
    }
    document.querySelector("#btnbasket span").innerHTML=sebet.length
}
function azalt(x){
    let axtar=sebet.filter((s)=>{
        return s.id==x
    })[0];
    axtar.count--
    if(axtar.count==0){
        sebet.splice(sebet.indexOf(axtar),1)
    }
    sebetload()
    document.querySelector("#btnbasket span").innerHTML=sebet.length
}
function artir(x){
    sebet.filter((s)=>{
        return s.id==x
    })[0].count++;
    sebetload()
}
document.querySelector("#btnbasket").onclick=()=>{
    sebetload()
    document.querySelector("#basket").style.display="block"
}
document.querySelector(".modal-bas1 span").onclick=()=>{
    document.querySelector("#basket").style.display="none"
}