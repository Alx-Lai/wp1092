let pics = ["https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg",
            "https://cdn.pixabay.com/photo/2015/03/27/13/16/cat-694730_1280.jpg",
            "https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262_1280.jpg",
            "https://cdn.pixabay.com/photo/2013/04/01/03/45/cat-98359_1280.jpg",
            "https://cdn.pixabay.com/photo/2019/05/08/21/21/cat-4189697_1280.jpg"] ;
let pic_index = 0 ;

function prePic() {
    if (pic_index > 0)
    {
        pic_index = pic_index - 1
        document.getElementById("IM").src = pics[pic_index];
        document.getElementById("IMS").href = pics[pic_index];
        document.getElementById("IMS").innerHTML = pics[pic_index];

        if (pic_index === 0)
        {
            document.getElementById("BP").className = "disabled";
        }

        if (pic_index < 4 )
        {
            document.getElementById("BN").className = "image-viewer__button";
        }
    }
}

function nextPic() {
    if (pic_index < 4)
    {
        pic_index = pic_index + 1
        document.getElementById("IM").src = pics[pic_index];
        document.getElementById("IMS").href = pics[pic_index];
        document.getElementById("IMS").innerHTML = pics[pic_index];

        if (pic_index === 4)
        {
            document.getElementById("BN").className = "disabled";
        }

        if (pic_index > 0)
        {
            document.getElementById("BP").className = "image-viewer__button";
        }
    }
}



