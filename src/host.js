function hostStart(){

    document.body.innerHTML = '';
    const canvas = document.createElement("canvas");
    canvas.width    = 800;
    canvas.height   = 600;
    canvas.style    = "border:1px solid #000000;";
    const body = document.getElementsByTagName("body")[0];
    body.appendChild(canvas);
    const ctx = canvas.getContext("2d");

    ctx.font = "20px Arial Bold Italic";
    ctx.font.fontStretch="ultra-condensed";
    fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        ctx.fillText("your adress:" + data.ip, 100, 60);
    })
    .catch(error => {
        ctx.fillText("error" + error, 100, 50);
        console.log("error:", error);
    });

    ctx.beginPath();
    ctx.rect(100, 100, 150, 100);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.stroke();

    
}

function draw(){

}
setInterval(draw, 10);

