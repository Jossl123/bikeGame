var c = document.getElementById('canvas');
c.height = innerHeight
c.width = innerWidth
var ctx = c.getContext('2d');

var player = new function() {
    this.x = innerWidth / 20;
    this.y = innerHeight / 20;
    //this.h = 300;
    //this.w = 300;
    this.h = 200;
    this.w = 360;
    this.rot = 0;
    // this.wheelB = {
    //     "x": 68,
    //     "y": 176,
    //     "r": 46
    // };
    // this.wheelF = {
    //     "x": 225,
    //     "y": 176,
    //     "r": 46
    // }
    this.wheelB = {
        "x": 35,
        "y": 65,
        "r": 35
    };
    this.wheelF = {
        "x": 145,
        "y": 65,
        "r": 35
    }

    this.img = new Image();
    this.img.src = "bike.png"
    this.draw = function() {
        ctx.save()
        ctx.rotate(this.rot * Math.PI / 180);
        ctx.translate(this.x, this.y)
            //ctx.translate(this.x - this.w / 2, this.y - this.h / 2)
            //ctx.drawImage(this.img, 0, 0, this.w, this.h)
        ctx.beginPath()
        ctx.arc(this.wheelB.x, this.wheelB.y, this.wheelB.r, 0, Math.PI * 2);
        ctx.arc(this.wheelF.x, this.wheelF.y, this.wheelF.r, 0, Math.PI * 2);
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.fill()
        ctx.restore()
    }
    this.update = function() {
        var wBpos = c.height / 2 - noise(this.x + this.wheelB.x + t) - this.wheelB.y - this.wheelB.r
        var wFpos = c.height / 2 - noise(this.x + this.wheelF.x + t) - this.wheelF.y - this.wheelF.r
        this.rot = (wFpos - wBpos) / 6
        this.y = c.height / 2 - noise(this.x + this.wheelB.x + t) - this.wheelB.y - this.wheelB.r
        this.draw()
    }
}
var t = 0

function noise(n) {
    return Math.sin(n * 0.001) * Math.cos(n * 0.01) * 50
}

function loop() {
    t++
    ctx.fillStyle = "#19f"
    ctx.fillRect(0, 0, c.width, c.height)

    ctx.fillStyle = "black"
    ctx.beginPath()
    ctx.lineTo(0, c.height)
    for (let i = 0; i < c.width; i++) {
        ctx.lineTo(i, c.height / 2 - noise(i + t))
    }
    ctx.lineTo(c.width, c.height)
    ctx.fill()
    player.update();
    requestAnimationFrame(loop)
}

loop()