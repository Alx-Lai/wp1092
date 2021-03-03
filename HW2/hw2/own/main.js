var image_source_link=[
    "https://cdn2.ettoday.net/images/5424/d5424601.jpg",
    "https://cdn2.ettoday.net/images/5424/d5424603.jpg",
    "https://cdn2.ettoday.net/images/5424/d5424605.jpg",
    "https://cdn2.ettoday.net/images/5424/d5424604.jpg",
    "https://cdn2.ettoday.net/images/5424/d5424602.jpg"
]
var image =$("#display");
image.attr("src",image_source_link[0]);
document.getElementById("source").innerHTML=image_source_link[0];
var now_pos=0;
var len=image_source_link.length;
$("#back_button").click(function(){
    if(now_pos>=1){
        now_pos--;
    }
    if(now_pos==len-1){
        $("#next_button").attr("class","disabled");
        $("#back_button").attr("class","");
    }else if(now_pos==0){
        $("#next_button").attr("class","");
        $("#back_button").attr("class","disabled");
    }else{
        $("#next_button").attr("class","");
        $("#back_button").attr("class","");
    }
    //image.css('background-image',"url('images/loading.gif')");
    image.attr("src",'images/loading.gif');
    image.attr("src",image_source_link[now_pos]);
    document.getElementById("source").innerHTML=image_source_link[now_pos];
})
$("#next_button").click(function(){
    if(now_pos<len-1){
        now_pos++;
    }
    if(now_pos==len-1){
        $("#next_button").attr("class","disabled");
        $("#back_button").attr("class","");
    }else if(now_pos==0){
        $("#next_button").attr("class","");
        $("#back_button").attr("class","disabled");
    }else{
        $("#next_button").attr("class","");
        $("#back_button").attr("class","");
    }
    //image.css('background-image',"url('images/loading.gif')");
    image.attr("src",'images/loading.gif');
    image.attr("src",image_source_link[now_pos]);
    document.getElementById("source").innerHTML=image_source_link[now_pos];
})
