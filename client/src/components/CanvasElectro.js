import React, {useEffect, useRef} from "react";

const CanvasElectro = props => {

    const canvasRef = useRef(null)

    let ctx,
        canvas,
        w,
        h,
        mouse = {},
        // last_mouse = {},
        maxl = 300,
        minl = 50,
        n = 30,
        numt = 500,
        tent = [],
        // clicked = false,
        target = {x: 0, y: 0},
        last_target = {},
        t = 0,
        q = 10;

    function dist(p1x, p1y, p2x, p2y) {
        return Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2));
    }

    class segment {
        constructor(parent, l, a, first) {
            this.first = first;
            if (first) {
                this.pos = {
                    x: parent.x,
                    y: parent.y
                };
            } else {
                this.pos = {
                    x: parent.nextPos.x,
                    y: parent.nextPos.y
                };
            }
            this.l = l;
            this.ang = a;
            this.nextPos = {
                x: this.pos.x + this.l * Math.cos(this.ang),
                y: this.pos.y + this.l * Math.sin(this.ang)
            };
        }

        update(t) {
            this.ang = Math.atan2(t.y - this.pos.y, t.x - this.pos.x);
            this.pos.x = t.x + this.l * Math.cos(this.ang - Math.PI);
            this.pos.y = t.y + this.l * Math.sin(this.ang - Math.PI);
            this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
            this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
        }

        fallback(t) {
            this.pos.x = t.x;
            this.pos.y = t.y;
            this.nextPos.x = this.pos.x + this.l * Math.cos(this.ang);
            this.nextPos.y = this.pos.y + this.l * Math.sin(this.ang);
        }

        show() {
            ctx.lineTo(this.nextPos.x, this.nextPos.y);
        }
    }

    class tentacle {
        constructor(x, y, l, n, a) {
            this.x = x;
            this.y = y;
            this.l = l;
            this.n = n;
            this.t = {};
            this.rand = Math.random();
            this.segments = [new segment(this, this.l / this.n, 0, true)];
            for (let i = 1; i < this.n; i++) {
                this.segments.push(
                    new segment(this.segments[i - 1], this.l / this.n, 0, false)
                );
            }
        }

        move(last_target, target) {
            this.angle = Math.atan2(target.y - this.y, target.x - this.x);
            this.dt = dist(last_target.x, last_target.y, target.x, target.y) + 5;
            this.t = {
                x: target.x - 0.8 * this.dt * Math.cos(this.angle),
                y: target.y - 0.8 * this.dt * Math.sin(this.angle)
            };
            if (this.t.x) {
                this.segments[this.n - 1].update(this.t);
            } else {
                this.segments[this.n - 1].update(target);
            }
            for (let i = this.n - 2; i >= 0; i--) {
                this.segments[i].update(this.segments[i + 1].pos);
            }
            if (
                dist(this.x, this.y, target.x, target.y) <=
                this.l + dist(last_target.x, last_target.y, target.x, target.y)
            ) {
                this.segments[0].fallback({x: this.x, y: this.y});
                for (let i = 1; i < this.n; i++) {
                    this.segments[i].fallback(this.segments[i - 1].nextPos);
                }
            }
        }

        show(target) {
            if (dist(this.x, this.y, target.x, target.y) <= this.l) {
                ctx.globalCompositeOperation = "lighter";
                ctx.beginPath();
                ctx.lineTo(this.x, this.y);
                for (let i = 0; i < this.n; i++) {
                    this.segments[i].show();
                }
                ctx.strokeStyle = "hsl(" + (this.rand * 60 + 180) + ",100%," + (this.rand * 60 + 25) + "%)";
                ctx.lineWidth = this.rand * 2;
                ctx.lineCap = "round";
                ctx.lineJoin = "round";
                ctx.stroke();
                ctx.globalCompositeOperation = "source-over";
            }
        }

        show2(target) {
            ctx.beginPath();
            if (dist(this.x, this.y, target.x, target.y) <= this.l) {
                ctx.arc(this.x, this.y, 2 * this.rand + 1, 0, 2 * Math.PI);
                ctx.fillStyle = "white";
            } else {
                ctx.arc(this.x, this.y, this.rand * 2, 0, 2 * Math.PI);
                ctx.fillStyle = "darkcyan";
            }
            ctx.fill();
        }
    }

    function draw() {
        //animation
        if (mouse.x) {
            target.errx = mouse.x - target.x;
            target.erry = mouse.y - target.y;
        } else {
            target.errx =
                w / 2 +
                (h / 2 - q) *
                Math.sqrt(2) *
                Math.cos(t) /
                (Math.pow(Math.sin(t), 2) + 1) -
                target.x;
            target.erry =
                h / 2 +
                (h / 2 - q) *
                Math.sqrt(2) *
                Math.cos(t) *
                Math.sin(t) /
                (Math.pow(Math.sin(t), 2) + 1) -
                target.y;
        }

        target.x += target.errx / 10;
        target.y += target.erry / 10;

        t += 0.01;

        ctx.beginPath();
        ctx.arc(target.x, target.y, dist(last_target.x, last_target.y, target.x, target.y) + 5, 0, 2 * Math.PI);
        ctx.fillStyle = "hsl(210,100%,80%)";
        ctx.fill();

        for (let i = 0; i < numt; i++) {
            tent[i].move(last_target, target);
            tent[i].show2(target);
        }
        for (let i = 0; i < numt; i++) {
            tent[i].show(target);
        }
        last_target.x = target.x;
        last_target.y = target.y;
    }

    function initCanvas() {
        //ctx = ctx
        //canvas = cvs

        canvas = canvasRef.current
        ctx = canvas.getContext('2d')


        w = (canvas.width = window.innerWidth)
        h = (canvas.height = window.innerHeight)
        mouse = {x: false, y: false}
        //last_mouse = {}
        maxl = 300
        minl = 50
        n = 30
        numt = 500
        tent = []
        // clicked = false
        target = {x: 0, y: 0}
        last_target = {}
        t = 0
        q = 10

        for (let i = 0; i < numt; i++) {
            tent.push(
                new tentacle(
                    Math.random() * w,
                    Math.random() * h,
                    Math.random() * (maxl - minl) + minl,
                    n,
                    Math.random() * 2 * Math.PI
                )
            );
        }

        //---------------------------------------------------------------
        /* document.addEventListener(
        "mousemove",
        function(e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
            console.log('mouse',mouse)
        },
        false
    );

    window.addEventListener("mouseleave", function(e) {
        mouse.x = false;
        mouse.y = false;
    });

    window.addEventListener(
        "mousedown",
        function(e) {
            console.log('mousedown')
            clicked = true;
        },
        false
    );

    window.addEventListener(
        "mouseup",
        function(e) {
            clicked = false;
        },
        false
    );*/

        //---------------------------------------------------------------


    }


    useEffect(() => {

        initCanvas()
        let animationFrameID

        const render = () => {
            ctx.clearRect(0, 0, w, h);
            draw()
            animationFrameID = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameID)
        }

    }, [])

    useEffect(() => {

        // initiate the event handler
        window.addEventListener("resize", initCanvas);

        // this will clean up the event every time the component is re-rendered
        return () => {
            window.removeEventListener("resize", initCanvas);
        }
    }, [])


    return <canvas ref={canvasRef} {...props}/>
}


export default CanvasElectro