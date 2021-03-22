// TODO:
let able_commented = false;
let now_comment_num = 1;
const input = document.querySelector('input');
input.addEventListener('input',check);
var comment_button_class = document.getElementById("comment-button").getAttribute('class');

function check(e){
    var str = e.target.value;
    var processed_str = str.replace(/\s*/g,"");
    if(processed_str.length==0){
        document.getElementById("comment-button").setAttribute('class','disabled');
        able_commented=false;
        //console.log("空字串");
    }else{
        document.getElementById("comment-button").setAttribute('class','enabled');
        able_commented=true;
        //console.log(e.target.value);
    }
}
function FocusOn(){
    //console.log('focus');
    document.getElementById('comment-button').style.display='block';
    document.getElementById('cancel-button').style.display='block';
}
function CancelClick(){
    document.getElementById('comment-input').value="";
    document.getElementById('comment-button').style.display='none';
    document.getElementById('cancel-button').style.display='none';
}
function CommentClick(){
    if(able_commented){
        var string = document.getElementById('comment-input').value;
        var processed_string = string.replace(/(^\s*)|(\s*$)/g, "");
        document.getElementById('comment-input').value="";
        document.getElementById("comment-button").setAttribute('class','disabled');
        var div1 = document.createElement('div');
        div1.setAttribute('class','comment');
        var img1 = document.createElement('img');
        img1.setAttribute('class',"comment-img");
        img1.setAttribute('src',"images/user-icon.jpg");
        var div2 = document.createElement('div');
        div2.setAttribute('class',"comment-right");
        var div3 = document.createElement('div');
        var span1 = document.createElement('span');
        span1.setAttribute('class',"comment-name");
        span1.textContent = 'Toby Chen';
        var span2 = document.createElement('span');
        span2.setAttribute('class',"comment-time");
        span2.textContent = '現在';
        var p1 = document.createElement('p');
        p1.setAttribute('class',"comment-text");
        p1.textContent = processed_string;
        div1.appendChild(img1);
        div1.appendChild(div2);
        div2.appendChild(div3);
        div3.appendChild(span1);
        div3.appendChild(span2);
        div2.appendChild(p1);
        document.getElementById('comment-group').appendChild(div1);
        now_comment_num++;
        document.getElementById('comment-num').textContent=now_comment_num+'則留言';
    }
    able_commented=false;
};

/*
<div class="comment">
    <img class="comment-img" src="images/user-icon.jpg"/>
    <div class="comment-right">
        <div>
            <span class="comment-name">Toby Chen</span>
            <span class="comment-time">現在</span>
        </div>
        <p class="comment-text">I am Toby Chen. This is a comment.</p>
    </div>
/div>
*/