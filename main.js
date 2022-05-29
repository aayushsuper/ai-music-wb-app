song1 = "";
song2 = "";
song1_status="";
song2_status = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    song1 = loadSound("fight back.mp3");
     song2 = loadSound("fearless.mp3");
 }
 

function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("posenet is initialized !");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log(scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWristX+" leftWrist_y = "+leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWristX+" rightWrist_y = "+rightWristY);
    }
}

function draw(){
    image(video,0,0,600,530);

     song1_status = song1.isPlaying();
     song2_status = song2.isPlaying();

     fill("#ff0000");
     stroke("#ff0000");
   
    if(scoreRightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        song2.stop();
        if(song1_status == false){
            song1.play();
            document.getElementById("song_id").innerHTML = "playing : fearless";
        }
        
    }

    if(scoreLeftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song1.stop();
        if(song2_status == false){
            song2.play();
            document.getElementById("song_id").innerHTML = "Song Name: Fight back";
        }
       
    }
}



function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}