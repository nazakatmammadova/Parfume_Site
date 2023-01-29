var daire=document.querySelector('.daire')
document.addEventListener('mousemove', function(e){
 var x= e.clientX;
 var y= e.clientY;
 daire.style.left=x+"px";
 daire.style.top=y+"px";    
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////
const etirler=[
    {
        id:1,
        img:"./img/etir1.png",
        price:'345',
        name:"Versace"
    },
    {
        id:2,
        img:"./img/etir9.jpg",
        price:"399",
        name:"Escada"
    },
    {
        id:3,
        img:"./img/etir4.jpg",
        price:"269",
        name:"Poison"
    },
    {
        id:4,
        img:"./img/etir5.jpg",
        price:"299",
        name:"My Way"
    },
    {
        id:5,
        img:"./img/etir2.jpg",
        price:"268",
        name:"Daisy"
    },
    {
        id:6,
        img:"./img/etir3.jpg",
        price:"379",
        name:"Pure XS"
    },
    {
        id:7,
        img:"./img/etir6.jpg",
        price:"255",
        name:"Chanel"
    },
    {
        id:8,
        img:"./img/etir7.jpg",
        price:"300",
        name:"Miss Dior"
    },
    {
        id:9,
        img:"./img/etir8.jpg",
        price:"244",
        name:"Bleu Chanel"
    },
    {
        id:10,
        img:"./img/etir10.jpg",
        price:"349",
        name:"Tom Ford"
    },
    {
        id:11,
        img:"./img/etir12.jpg",
        price:"329",
        name:"Mugler"
    },
    {
        id:12,
        img:"./img/etir11.jpg",
        price:"399",
        name:"Calvin Klein"
    }
]
etirler.forEach((x)=>{
    document.querySelector('.etir').innerHTML+=
    `<div class="col-md-3 py-2">
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

