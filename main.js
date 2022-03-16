status = "";
video = "";
objects = [];
object_name = "";
var synth = window.speechSynthesis;

function preload() {

}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function draw() {
    image(video, 0, 0, 480, 380);

    if (status != "") {
        objectDetector.detect(video, gotResult);

        for (i = 0; i < objects.length; i++) {

            r = Math.floor(Math.random() * 100);
            g = Math.floor(Math.random() * 100);
            b = Math.floor(Math.random() * 100);

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);

            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();

            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            document.getElementById("object_status").innerHTML = object_name + " Found";

            if (objects[i].label == object_name) {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = object_name + "Found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + " Found");
                synth.speak(utterThis);
            } else {
                document.getElementById("object_status").innerHTML = object_name + " Not Found";
            }


        }
    }
}


function start() {
    document.getElementById("object").innerHTML = document.getElementById("object_name");
    object_name = document.getElementById("object").value;
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);

}


function modelLoaded() {
    console.log("Model Loaded!!")
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}