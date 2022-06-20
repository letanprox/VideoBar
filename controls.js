window.onload = function(){
// change atribute
var color_thumb = "white";
var color_bar   = "rgb(130, 255, 57)";
// get elementDom 
var customvideo  = document.getElementsByClassName("CustomVideo").item(0);
    var wrapvideo  = document.getElementsByClassName("WrapVideo").item(0);
        var myvideo  = document.querySelector(".WrapVideo #myVideo"); 

        var startvideo  = document.getElementsByClassName("Startvideo").item(0);
            var playstart = document.getElementById("playstart");

        var play = document.getElementsByClassName("Play").item(0);
            var play_btn = document.getElementById("play_btn");
            var pause_btn = document.getElementById("pause_btn");

        var seekbar = document.getElementsByClassName("Seekbar").item(0);
            var thumb    = document.getElementById("thumb");
            var progress = document.getElementById("progress");

        var timewrap = document.getElementsByClassName("Time").item(0);
            var time = document.getElementById("time");

        var volume    = document.getElementsByClassName("Volume").item(0);
            var volumebtn = document.getElementById("volume_btn");
            var xbtn = document.getElementById("x_btn");
                var maxvolume = document.getElementById("max_volume");
                var midvolume = document.getElementById("mid_volume");
                var minvolume = document.getElementById("min_volume");
            var thumbvolume    = document.getElementById("thumbvolume");
            var progressvolume = document.getElementById("progressvolume");

        var expand    = document.getElementsByClassName("Expand").item(0);   
            var expandbtn = document.getElementById("expand_btn");
            var miniaturebtn = document.getElementById("miniature_btn");

        var loadingvideo    = document.getElementsByClassName("LoadingVideo").item(0);   
// displayControlbar        
        function displayControlbar(x){
            if(isVideoStart === true){
            if(x=="block"){
                isdisplaybar = true;
            }else{
                isdisplaybar = false;
            }    

            play.style.display = x,
            seekbar.style.display = x,
            timewrap.style.display = x;
            if(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent) ) {
                volume.style.display = "none";
                timewrap.style.right = "35px";
                seekbar.style.right = "95px";
            }else{
                volume.style.display = x;
            }
            expand.style.display = x;
            }
        }   
        var isVideoStart = false;
        var myLimitTimeBar;
        var isdisplaybar =true;


        function displayControlbarTime(){
            if(isVideoStart === true){
            clearTimeout(myLimitTimeBar);
            displayControlbar("block");
            myLimitTimeBar = setTimeout(function(){ 
                displayControlbar("none");
                }, 2500);
            }

            setInterval(function(){
                if(myvideo.readyState>=3){
                    loadingvideo.style.display = "none";
                    if(isdisplaybar==true){
                        playstart.style.display = "block";
                    }else{
                        playstart.style.display = "none";
                    }
                }else{
                    loadingvideo.style.display = "block";   
                    playstart.style.display = "none";
                }
            }, 100); 
        }
        
// function controls
function TimeVideo(myvideo,progress,thumb,time,startvideo,loadingvideo,play,play_btn,pause_btn){        
    //change element about time video 
    this.changeTime = function(){
        //change time video
        var changeTimeVideo = function(curTime){
            var timeremain = myvideo.duration - curTime;
            var remin = Math.floor(timeremain/60);
            var resec = Math.floor(timeremain - remin * 60);
            if(remin<10){remin = "0" + remin;}
            if(resec<10){resec = "0" + resec;}
            time.innerHTML = "-"+remin +":"+resec;  
        }
        //change seekbar value
        thumb.oninput = function(){
            //change value video when seekbar change
            progress.value = this.value;
            myvideo.currentTime = myvideo.duration * (thumb.value / 1000);
            //change time when seekbar change
            changeTimeVideo(myvideo.duration * (thumb.value / 1000));
        }
        //keep video when mousedown seekbar
        var checkvideoisplaying = false;
        var touchseekbar = function(){
            if(myvideo.paused){
                checkvideoisplaying = false;
            }else{
                checkvideoisplaying = true;
                myvideo.pause();
                play_btn.style.display = "block";
                pause_btn.style.display = "none";
            }
        }
        var outtounchseekbar = function(){
            if(checkvideoisplaying == true){
                myvideo.play();
                play_btn.style.display = "none";
                pause_btn.style.display = "block";
            }
        }
        if(/Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            thumb.ontouchstart = function(){
                touchseekbar();
            }
            thumb.ontouchend = function(){
                outtounchseekbar();
            }
        } else{
            thumb.onmousedown = function(){
                touchseekbar();
            }
            thumb.onmouseup = function(){
                outtounchseekbar();
            }
        }        
        //chage seekbar and time when video play
        myvideo.ontimeupdate = function(){
            //change value progress and seekbar
            thumb.value = myvideo.currentTime * (1000 / myvideo.duration);
            progress.value = thumb.value;
            //change time value
            changeTimeVideo(myvideo.currentTime);
        }
    }

    // function to switch play pause
    function turnplay(){
        if(myvideo.paused){
            myvideo.play();
            play_btn.style.display = "none";
            pause_btn.style.display = "block";
          }else{
            myvideo.pause();
            play_btn.style.display = "block";
            pause_btn.style.display = "none";
          }
    }
    this.changePlayPause = function(){
        //click to start video
        startvideo.onclick = function(){
            isVideoStart = true;
            displayControlbarTime();
            turnplay();
        } 
        ////click to video to stop or..
        myvideo.onclick = function(){
            turnplay();
        }
        ////click to playpause pc
        play.onclick = function(){
            turnplay();
        }
        //// click to video to stop on space
        document.onkeyup = function(event) {
            if (event.code === 'Space') {
            turnplay();
            }
        };

    }
}


function VolumeVideo(myvideo,maxvolume,midvolume,xbtn,volumebtn,thumbvolume,progressvolume){
    var savepoint = 100;
    var a = "block";
    var b = "none";
    ////////////////////////////////////////
    var changSpeakerStatus = function(x,y,z){
        maxvolume.style.display = x;
        midvolume.style.display = y;
        xbtn.style.display      = z;
    } 
    ////////////////////////////////////////
    var changespeaker = function (){
        if(thumbvolume.value>=65){
            changSpeakerStatus(a,a,b);
        }
        if(thumbvolume.value>=25 && thumbvolume.value <65){
            changSpeakerStatus(b,a,b);
        }
        if(thumbvolume.value<25 && thumbvolume.value > 0){
            changSpeakerStatus(b,b,b);
        }
        if(thumbvolume.value <= 0  ){
            changSpeakerStatus(b,b,a);
            myvideo.muted = true;  
        }
    }
////change all volume
    this.changeVolume = function(){
        thumbvolume.oninput = function(){
            myvideo.muted = false;  
            progressvolume.value = this.value;
            myvideo.volume = thumbvolume.value / 100;
            savepoint = thumbvolume.value; 
            changespeaker();
        }
/////////////////////////////////////////////
        volumebtn.onclick = function(){
            if(myvideo.muted){
                myvideo.muted = false;                
                thumbvolume.value = savepoint ;
                progressvolume.value = thumbvolume.value;
                myvideo.volume = savepoint / 100;
                changespeaker();
            }else{
                myvideo.muted = true;
                thumbvolume.value=0;
                progressvolume.value=0;
                changespeaker();
            }
        }
    }
    
}

function ExpandVideo(fullelement,expand,miniaturebtn,expandbtn,myvideo){
////change atr of custom
    var changeAtr = function(a,b,c,d,e){
        myvideo.style.maxHeight = a;
        myvideo.style.top = b;
        myvideo.style.transform = c;
        miniaturebtn.style.display = d;
        expandbtn.style.display = e;
    }
////open///////////////
    var openFullScreen = function(){
        changeAtr("100%", "50%","translateY(-50%)","block","none");
    if (fullelement.requestFullscreen) {
        fullelement.requestFullscreen();
      } else if (fullelement.mozRequestFullScreen) { /* Firefox */
        fullelement.mozRequestFullScreen();
      } else if (fullelement.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        fullelement.webkitRequestFullscreen();
      } else if (fullelement.msRequestFullscreen) { /* IE/Edge */
        fullelement.msRequestFullscreen();
      }
    }
    var openFullScreenIos = function(){
        myvideo.webkitEnterFullscreen();
    }
////close//////////////////////
    var closeFullScreen = function(){
        changeAtr("540px", "0%","translateY(-0%)","none","block");
        if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) { /* Firefox */
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) { /* IE/Edge */
            document.msExitFullscreen();
          }
    }
////switch ful screen///////////
    this.fullScreen = function(){
    expand.onclick = function(){
        if(/iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
            openFullScreenIos();
        }else{
            if (document.fullscreenElement) {
                closeFullScreen();
            } else {
                openFullScreen();
            }
        }
    };
    document.onfullscreenchange = function() {
        if (document.fullscreenElement) {
            changeAtr("100%", "50%","translateY(-50%)","block","none");
        } else {
            changeAtr("540px", "0%","translateY(-0%)","none","block");
        }
      };
    }
}

function HoverVideo(wrapvideo){
    var displayControlbarHover = function(element){
        element.onmousemove = function(){
            displayControlbarTime();
        }
        element.onmouseout = function(){
            clearTimeout(myLimitTimeBar);
            displayControlbar("none");
        }
    }
    this.hoverControlbar = function(){
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
              
        }else{
            displayControlbarHover(wrapvideo);
        }
    }
}


const hovervideo_obj = new HoverVideo(wrapvideo);
hovervideo_obj.hoverControlbar();

const timevideo_obj = new TimeVideo(myvideo,progress,thumb,time,startvideo,loadingvideo,play,play_btn,pause_btn);
timevideo_obj.changeTime();
timevideo_obj.changePlayPause();

const volumevideo_obj = new VolumeVideo(myvideo,maxvolume,midvolume,xbtn,volumebtn,thumbvolume,progressvolume);
volumevideo_obj.changeVolume();

const expandvideo = new ExpandVideo(wrapvideo,expand,miniaturebtn,expandbtn,myvideo);
expandvideo.fullScreen();

////////////////////////////////////////////////////////////////////////////////////////////////////////////
function changeColor(color_bar,color_thumb){
    var style_color = document.createElement('style');
    style_color.innerHTML =
        '#thumb::-webkit-slider-thumb{' +
            'background-color:'+color_thumb+
        '}'+
        '#thumb::-moz-range-thumb {' +
            'background-color:'+color_thumb+
        '}'+
        '#thumb::-ms-thumb {' +
            'background-color:'+color_thumb+
        '}'+

        '#progress{' +
            'color:'+color_bar+
        '}'+
        '#progress::-moz-progress-bar {' +
            'background-color:'+color_bar+
        '}'+
        '#progress::-webkit-progress-value {' +
            'background:'+color_bar+
        '}' +
        '#progress::-webkit-progress-bar{' +
            'background-color:white'+
        '}' +

        '#thumbvolume::-webkit-slider-thumb{' +
           'background-color:'+color_thumb+
        '}'+

        '#thumbvolume::-moz-range-thumb {' +
            'background-color:'+color_thumb+
        '}'+

        '#thumbvolume::-ms-thumb {' +
            'background-color:'+color_thumb+
        '}'+

        '#progressvolume{' +
            'color:'+color_bar+
        '}'+
        '#progressvolume::-moz-progress-bar {' +
            'background-color:'+color_bar+
        '}'+

        '#progressvolume::-webkit-progress-value {' +
            'background:'+color_bar+
        '}' +
        '#progressvolume::-webkit-progress-bar{' +
            'background-color:white'+
        '}' 
        ;

    var put_element = document.getElementsByTagName('body')[0];
    put_element.appendChild(style_color);
}
changeColor(color_bar,color_thumb);



// const loadvideo = new LoadVideo();

// var x =  document.getElementById("cac");
// x.onclick = function(){
    
// }

}

