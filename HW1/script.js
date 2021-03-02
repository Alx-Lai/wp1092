var load_audio = $('#audio');
var total_song=2;
var now_song=0;
var song_info=[['給我一首歌的時間','周杰倫'],['東區東區','八三夭']];
var mute=false;
function next_song(){
    now_song+=1;
    now_song%=total_song;
    $('#music_source').attr("src","musics/music"+(now_song+1)+".mp3");
    var play_or_pause_flag=false;
    if(audio.paused){
        play_or_pause_flag=false;
    }else{
        play_or_pause_flag=true;
    }
    audio.load();
    $('#song_name').html(song_info[now_song][0]);
    $('#singer_name').html(song_info[now_song][1]);
    console.log(song_info[now_song][0] +song_info[now_song][1]);
    $('.song_covering').css('background-image',"url(\'music" +(now_song+1)+"_cover.jpg\')");
    if(play_or_pause_flag){
        audio.play();
        $('.play-pause').css('background-image',"url('pause_button.png')");
    }else{
        audio.pause();
        $('.play-pause').css('background-image',"url('play_button.png')");
    }
    
};
function detect_song_end(){
    if(audio.ended){
        next_song();
        audio.play();
    }
    initProgressBar();
    refresh();
}
function refresh(){
    setTimeout(detect_song_end,950);
}
refresh();

function initProgressBar(){
    var length = audio.duration;
    var current_time =audio.currentTime;
    $("#progress_bar").attr("value",current_time/length);
    //console.log(current_time);
}
function last_song(){
    now_song-=1;
    if(now_song<0){
        now_song+=total_song;
    }
    $('#music_source').attr("src","musics/music"+(now_song+1)+".mp3");
    var play_or_pause_flag=false;
    if(audio.paused){
        play_or_pause_flag=false;
    }else{
        play_or_pause_flag=true;
    }
    audio.load();
    if(play_or_pause_flag){
        audio.play();
    }else{
        audio.pause();
    }
};
$('.play-pause').click(function(){
    if(audio.paused){
        audio.play();
        $('.play-pause').css('background-image',"url('pause_button.png')");
    }else{
        audio.pause();
        $('.play-pause').css('background-image',"url('play_button.png')");
    }
})


$('.next').click(function(){
    next_song();
})
$('.last').click(function(){
    last_song();
})
$('.mute').click(function(){
    mute=!mute;
    if(mute){
        $('.mute').css('background-image',"url('mute.png')");
        document.getElementById('audio').volume=0;
    }else{
        $('.mute').css('background-image',"url('sound.png')");
        document.getElementById('audio').volume=1;
    }
})
$('#volume').change(function(){
    console.log(document.getElementById('volume').value/100);
      document.getElementById('audio').volume=document.getElementById('volume').value/100;
})  