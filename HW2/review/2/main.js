var idx = 0
var ref = [ 'https://twgreatdaily.com/images/elastic/OXD/OXDeSW4BMH2_cNUgeRmP.jpg', 
            'https://i1.read01.com/SIG=2m3pj5n/304b454177386a71586c.jpg',
            'https://i2.kknews.cc/SIG=v7capo/ctp-vzntr/s0n351o841so4ropo20253s3917nnq27.jpg',
            'https://ek21.com/news/anime/wp-content/uploads/sites/8/2019/07/4ffce04d92a4d6cb21c1494cdfcd6dc1-20.jpg',
            'https://www.lovemk.com/wp-content/uploads/2020/11/2020112715155483.jpg',
            'http://p1.pstatp.com/large/pgc-image/1538453122815bcf08fa690',
            'https://truth.bahamut.com.tw/s01/201812/dfab20f5ff496cabf1ec8bfc35eda634.JPG',
            'https://i1.kknews.cc/SIG=vp3ih5/ctp-vzntr/n62pq44291644457943374rr2q1no4so.jpg',
            'http://d.zdqx.com/kttatongds_201811019/001.jpg']

loadImage()

function edge_check(){
    var previous_button = document.getElementById('previous');
    if(idx <= 0){
        previous_button.classList.add('disabled');
    } else {
        previous_button.classList.remove('disabled');
    }
    var next_button = document.getElementById('next');
    if(idx >= ref.length-1){
        next_button.classList.add('disabled');
    } else {
        next_button.classList.remove('disabled');
    }
    return;
}

function loadImage(){
    edge_check();
    var img_display = document.getElementById('display');
    var img_source = document.getElementById('source');
    var img_loading = document.getElementById('loading');
    img_display.style.display = "none"
    img_loading.style.display = "inline"
    img_display.src = './images/loading.gif';
    img_display.src = ref[idx];
    img_source.href = ref[idx];
    img_source.innerText = ref[idx];
    img_loading.style.display = "none"
    img_display.style.display = "inline"
}

function previousImage(){
    if(idx <= 0){
        console.log('No previous image');
        return;
    }
    idx -= 1;
    loadImage();
}

function nextImage(){
    if(idx >= ref.length-1){
        console.log('No next image');
        return;
    }
    idx += 1;
    loadImage();
}