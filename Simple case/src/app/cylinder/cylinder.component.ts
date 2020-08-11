import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import * as THREE from "src/three.min.js";
import { Options } from 'ng5-slider';
import { Ng2ImgMaxService } from 'ng2-img-max';
import * as Kinetic from 'src/kinetic.min.js';
import * as Konva from 'src/konva.min.js';
import * as  $ from 'jquery';

@Component({
  selector: 'app-cylinder',
  templateUrl: './cylinder.component.html',
  styleUrls: ['./cylinder.component.css']
})

export class CylinderComponent implements OnInit {
  
  constructor() {}
layer;
rectWidth:number;
widthInput1:number;
widthInput2: number;
pentagon;
lengthh:number =100;
  w;
  h;

  ngOnInit(): void {
    var self =this;

        var canvas = <HTMLCanvasElement> document.getElementById('canvasss'),
        ctx = canvas.getContext('2d'),
        rect = {
            x: 130,
            y:0,
            w: 100,
            h: 180
        },
        handlesSize = 8,
        currentHandle = false,
        drag = false;
        self.rectWidth=3;


    function init(self) {
        console.log("gjghg");

        console.log(self.rectWidth);

        canvas.addEventListener('mousedown', mouseDown, false);
        canvas.addEventListener('mouseup', mouseUp, false);
        canvas.addEventListener('mousemove',mouseMove, false);
    }
    
    function point(x, y) {
        return {
            x: x,
            y: y
        };
    }
    
    function dist(p1, p2) {
        return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
    }
    
    function getHandle(mouse) {
        if (dist(mouse, point(rect.x, rect.y)) <= handlesSize) return 'topleft';
        if (dist(mouse, point(rect.x + rect.w, rect.y)) <= handlesSize) return 'topright';
        if (dist(mouse, point(rect.x, rect.y + rect.h)) <= handlesSize) return 'bottomleft';
        if (dist(mouse, point(rect.x + rect.w, rect.y + rect.h)) <= handlesSize) return 'bottomright';
        if (dist(mouse, point(rect.x + rect.w / 2, rect.y)) <= handlesSize) return 'top';
        if (dist(mouse, point(rect.x, rect.y + rect.h / 2)) <= handlesSize) return 'left';
        if (dist(mouse, point(rect.x + rect.w / 2, rect.y + rect.h)) <= handlesSize) return 'bottom';
        if (dist(mouse, point(rect.x + rect.w, rect.y + rect.h / 2)) <= handlesSize) return 'right';
        return false;
    }
    
    function mouseDown(e) {
        if (currentHandle) drag = true;
        draw();
    }
    
    function mouseUp() {
        drag = false;
        currentHandle = false;
        draw();
    }
    self.rectWidth=50;
    function mouseMove(e) {
        var previousHandle = currentHandle;
        if (!drag) currentHandle = getHandle(point(e.pageX - this.offsetLeft, e.pageY - this.offsetTop));
        if (currentHandle && drag) {
            var mousePos = point(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            switch (currentHandle) {
                case 'topleft':
                    rect.w += rect.x - mousePos.x;
                    rect.h += rect.y - mousePos.y;
                    rect.x = mousePos.x;
                    rect.y = mousePos.y;
                    self.rectWidth=rect.w;
                    break;
                case 'topright':
                    rect.w = mousePos.x - rect.x;
                    rect.h += rect.y - mousePos.y;
                    rect.y = mousePos.y;
                    self.rectWidth=rect.w;
                    break;
                case 'bottomleft':
                    rect.w += rect.x - mousePos.x;
                    rect.x = mousePos.x;
                    rect.h = mousePos.y - rect.y;
                    self.rectWidth=rect.w;
                    break;
                case 'bottomright':
                    rect.w = mousePos.x - rect.x;
                    rect.h = mousePos.y - rect.y;
                    self.rectWidth=rect.w;
                    break;
    
                case 'top':
                    rect.h += rect.y - mousePos.y;
                    rect.y = mousePos.y;
                    self.rectWidth=rect.w;
                    break;
    
                case 'left':
                    rect.w += rect.x - mousePos.x;
                    rect.x = mousePos.x;
                    self.rectWidth=rect.w;
                    break;
    
                case 'bottom':
                    rect.h = mousePos.y - rect.y;
                    self.rectWidth=rect.w;
                    break;
    
                case 'right':
                    rect.w = mousePos.x - rect.x;
                    self.rectWidth=rect.w;
                    break;
            }
        }
        if (drag || currentHandle != previousHandle) draw();
    }
    var self = this;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#26C000';
        ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(self.lengthh.toString(),130, 90);
      
        if (currentHandle) {
            var posHandle = point(0, 0);
            var dir;
            switch (currentHandle) {
                case 'topleft':
                    dir={x:rect.w>0?'w':'e',y:rect.h>0?'n':'s'};
                    canvas.style.cursor= dir.y+dir.x+'-resize';
                case 'topright':
                    dir={x:rect.w>0?'e':'w',y:rect.h>0?'n':'s'};
                    canvas.style.cursor= dir.y+dir.x+'-resize';
                case 'bottomleft':
                    dir={x:rect.w>0?'w':'e',y:rect.h>0?'s':'n'};
                    canvas.style.cursor= dir.y+dir.x+'-resize';
                case 'bottomright':
                    dir={x:rect.w>0?'e':'w',y:rect.h>0?'s':'n'};
                    canvas.style.cursor= dir.y+dir.x+'-resize';
                    break;
                case 'top':
                    canvas.style.cursor= (rect.h>0?'n':'s')+'-resize';
                    break;
                case 'left':
                    canvas.style.cursor= (rect.w>0?'w':'e')+'-resize';
                    break;
                case 'bottom':
                    canvas.style.cursor= (rect.h>0?'s':'n')+'-resize';
                    break;
                case 'right':
                    canvas.style.cursor= (rect.w>0?'e':'w')+'-resize';
                    break;
            }
        }else 
        {canvas.style.cursor='';
        console.log(rect.w);
    }

    }
    
    init(self);
    draw();


    var width = rect.w;
    var w =$('#rwidth');
w.attr({min:0,max:100}).val(width);
w.on('input change',self,function(){
    width=parseInt($(this).val().toString());
    
    rect.w= width;
    draw();
});

var width = rect.w;
var w =$('#rwidth2');
w.attr({min:0,max:100}).val(width);
w.on('input change',self,function(){
width=parseInt($(this).val().toString());

rect.w= width;
draw();
});

var width = rect.w;
var w =$('#rwidth3');
w.attr({min:0,max:100}).val(width);
w.on('input change',self,function(){
width=parseInt($(this).val().toString());

rect.w= width;
draw();
});

var width = rect.w;
var w =$('#rwidth4');
w.attr({min:0,max:100}).val(width);
w.on('input change',self,function(){
width=parseInt($(this).val().toString());

rect.w= width;
draw();
});

 this.rectWidth=rect.w;
  }
   makeRoom(x, y, w, h) {

    var g = new Kinetic.Group({
        x: x,
        y: y,
        draggable: true
    });
    this.layer.add(g);

    var room = new Kinetic.Shape({
        x: 0,
        y: 0,
        width: w,
        height: h,
        stroke: "#26C000",
        fill: '#26C000',
        drawFunc: function (context) {
            var x = this.x();
            var y = this.y();
            var w = this.width();
            var h = this.height();
            var tlX = this.anchorTL.x();
            var tlY = this.anchorTL.y();
            context.beginPath();
            context.moveTo(tlX, tlY);
            // top
            context.bezierCurveTo(x + w / 2, y, x + w * 2 / 2, y, this.anchorTR.x(), this.anchorTR.y());
            // right
            context.bezierCurveTo(x + w, y + h / 2, x + w, y + h * 2 / 2, this.anchorBR.x(), this.anchorBR.y());
            // bottom
            context.bezierCurveTo(x + w * 2 / 2, y + h, x + w / 2, y + h, this.anchorBL.x(), this.anchorBL.y());
            // left
            context.bezierCurveTo(x, y + h * 2 / 2, x, y + h / 2, tlX, tlY);

            context.closePath();
            context.fillStrokeShape(this);
        }
    });
    g.add(room);
    room.anchorTR = this.makeAnchor(w, 0, g);
    room.anchorBR = this.makeAnchor(w, h, g);
    room.anchorBL = this.makeAnchor(0, h, g);
    room.anchorTL = this.makeAnchor(0, 0, g);
    this.layer.draw();
}

 makeAnchor(x, y, group) {
    var anchor = new Kinetic.Circle({
        x: x,
        y: y,
        radius: 8,
        fill: "green",
        stroke: 'black',
        strokeWidth: 1,
        draggable: true
    });
    group.add(anchor);
    anchor.moveToTop();
    return (anchor);
}

 

selectedDay: string = '';
types: any = [
    'Simple',
    'Complex'
  ];

  radioChangeHandler (event: any) {
    this.selectedDay = event.target.value;
if (this.selectedDay =="Simple")
{
  $(document).ready(function()
  {
  var canvas3= <HTMLCanvasElement>document.getElementById("canvas");
  var ctx=canvas3.getContext("2d");
  var cw=canvas3.width;
  var ch=canvas3.height;
  
  ctx.fillStyle='#26C000';
  ctx.strokeStyle='#26C000';
  ctx.lineWidth=3;
  var width=100;
  var height=180;

 
  canvas3.style.left = "400px";
  canvas3.style.top = "50px";
  canvas3.style.position = "absolute";

    ctx.clearRect(0,0,cw,ch);
      ctx.fillRect(20,20,width,height);
      ctx.strokeRect(20,20,width,height);
   
  var w =$('#rwidth');
  w.attr({min:0,max:100}).val(width);
  w.on('input change',function(){
      width=parseInt($(this).val().toString());
      
      ctx.clearRect(0,0,cw,ch);
      ctx.fillRect(20,20,width,height);
      ctx.strokeRect(20,20,width,height);
  });

  var w =$('#rwidth2');
  w.attr({min:0,max:100}).val(width);
  w.on('input change',function(){
      width=parseInt($(this).val().toString());
      
      ctx.clearRect(0,0,cw,ch);
      ctx.fillRect(20,20,width,height);
      ctx.strokeRect(20,20,width,height);
  });
  var w =$('#rwidth3');
  w.attr({min:0,max:100}).val(width);
  w.on('input change',function(){
      width=parseInt($(this).val().toString());
      
      ctx.clearRect(0,0,cw,ch);
      ctx.fillRect(20,20,width,height);
      ctx.strokeRect(20,20,width,height);
  });
  var w =$('#rwidth4');
  w.attr({min:0,max:100}).val(width);
  w.on('input change',function(){
      width=parseInt($(this).val().toString());
      
      ctx.clearRect(0,0,cw,ch);
      ctx.fillRect(20,20,width,height);
      ctx.strokeRect(20,20,width,height);
  });
  
  })
}
else
{
    var stage = new Kinetic.Stage({
        container: 'container',
        width: 350,
        height: 350
    });
    this.layer = new Kinetic.Layer();
    stage.add(this.layer);
    var room1 = this.makeRoom(50, 50, 180, 180);
}
}

EnableCanvas(values:any){
    console.log(values.currentTarget.checked);
    if (values.currentTarget.checked == true)
    {
    $(".MySelectorDiv").fadeTo(300, 1);
    let div2 = document.getElementById('canvasss')
    let div1 = document.getElementById('canvas3')
    
    div2.style.display = "block"
    div1.style.display = "none"
    }
    else
    {
        let div2= document.getElementById('canvasss')
        div2.style.display = "none"
        $(".MySelectorDiv").fadeTo(300, 0.2);
        $(document).ready(function()
    {
    var canvas= <HTMLCanvasElement>document.getElementById("canvas3");
    var canvasmain= <HTMLCanvasElement>document.getElementById("canvas");
    var ctx=canvas.getContext("2d");
    var cw=canvas.width;
    var ch=canvas.height;
    
    ctx.fillStyle='#26C000';
    ctx.strokeStyle='#26C000';
    ctx.lineWidth=3;
    var width=20;
    var height=180;

    canvas.style.left = "340px";
    canvas.style.top = "50px";
    canvas.style.position = "absolute";

    ctx.clearRect(0,0,cw,ch);
    ctx.fillRect(20,20,width,height);
    ctx.strokeRect(20,20,width,height);
    ctx.font = "15px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("100",20, 107);
  
    })
    let div1 = document.getElementById('canvas3');
    div1.style.display = "block";
    }
}

widthVerify(event) {const inputValue = event.target.value;
if (inputValue>100)
{
    console.log(inputValue);
    alert("width must be less than 100")
}}


lengthChange(event) {
        const inputValue = event.target.value;
        this.lengthh=parseInt( inputValue);
}
}