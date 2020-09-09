import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-task8',
  templateUrl: './task8.component.html',
  styleUrls: ['./task8.component.css']
})
export class Task8Component implements OnInit {
  rot1=true;
  rot2=true;
  angle=0;
  constructor() { }

  ngOnInit(): void {
    
    var c =<HTMLCanvasElement> document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.beginPath();
    ctx.strokeStyle = "#87FF2A";
    ctx.rect(0, 0, 160, 50);
    ctx.stroke();
    ctx.fillStyle = "blue";
    ctx.font = "14px Arial";
    ctx.fillText("Native iliac Rotation:", 20, 20);
    ctx.fillStyle = "black";
    ctx.fillText("19°", 70, 40);

    this.angle=40;
    
    var mouseDown = false;
    var pointerEl = <HTMLElement>document.querySelector("#pointer");
    var pointerE2 = <HTMLElement>document.querySelector("#pointer2");

    var canvasEl = $("#canvas")[0];
    var canvas = {
      width: canvasEl.offsetWidth,
      height: canvasEl.offsetHeight,
      top: canvasEl.offsetTop,
      left: canvasEl.offsetLeft
    };
    
    var cen = [canvas.left + canvas.width / 2, canvas.top + canvas.height / 2  ] ;
    var radiusCanvas = canvas.width / 2;
    
    
    var radians = Math.atan2(cen[1], cen[0])
    var x= 594.1671842700025;
    var y= 164.58359213500125;
    
    var x2=647.8328157299975;
    var y2=191.41640786499875;

    pointerEl.style.left = x + "px"
    pointerEl.style.top = y + "px";
    
    pointerE2.style.left = x2 + "px";
    pointerE2.style.top = y2 + "px";
    
    pointerEl.ondragstart = function() {
      return false;
    };
    pointerEl.onmousedown = function(e) {
      mouseDown = true;
    }

    pointerE2.ondragstart = function() {
      return false;
    };
    pointerE2.onmousedown = function(e) {
      mouseDown = true;
    }
    
    window.onmouseup = function(e) {
      mouseDown = false;
    }
    
    let isMouseHover = false
    let test = document.getElementById("pointer");
    let test2 = document.getElementById("pointer2");
    
    if (this.rot1)
    {
      window.onmousemove = function(e) {
        if (mouseDown ) {
          var result = limit(e.clientX, e.clientY);
          pointerEl.style.left = result.x + "px";
          pointerEl.style.top = result.y + "px";
        }
      }
    }
    
    if (this.rot2)
    {
      window.onmousemove = function(e) {
        if (mouseDown ) {
          var result = limit(e.clientX, e.clientY);
          pointerE2.style.left = result.x + "px";
          pointerE2.style.top = result.y + "px";
        }
      }
    }
    test.addEventListener("mouseover", function (event) {
      isMouseHover = true;
      self.rot2=false;
      window.onmousemove = function(e) {
        if (mouseDown) {
          var result = limit(e.clientX, e.clientY);
          var result2 = limitNeg(e.clientX, e.clientY);
          pointerEl.style.left = result.x + "px";
          pointerEl.style.top = result.y + "px";
        
          var x= result2.x;
          var y= result2.y;
          console.log(result.x);
          console.log(result.y);

          console.log("gggg");
          console.log(x);
          console.log(y);
          console.log("5lass");

          pointerE2.style.left = x+ "px";
          pointerE2.style.top = y+ "px";
        }
      }
    }, false);
    
    var self=this;
    test2.addEventListener("mouseover", function (event) {
    isMouseHover = false;
    self.rot1=false;
    window.onmousemove = function(e) {
    if (mouseDown) {
      var result = limit(e.clientX, e.clientY);
      var result2 = limitNeg(e.clientX, e.clientY);

      var x= result2.x;
      var y= result2.y;

      pointerE2.style.left = result.x + "px";
      pointerE2.style.top = result.y + "px";
           
      pointerEl.style.left = x+ "px";
      pointerEl.style.top = y+ "px";
    }
  }
}, false);

function limit(x, y) {
  x = x -cen[0];
  y = y - cen[1];
  var radians = Math.atan2(y, x)
  var angle = Math.atan2(y, x) * 180 / Math.PI;
  self.angle=angle;
  return {
    x: Math.cos(radians) * radiusCanvas +cen[0],
    y: Math.sin(radians) * radiusCanvas + cen[1]
  }
}
function limitNeg(x, y) {
  x = x -cen[0];
  y = y - cen[1];
  var radians = Math.atan2(y, x)
  return {
    x:  Math.cos(radians) * -radiusCanvas +cen[0],
    y:  Math.sin(radians) * -radiusCanvas + cen[1]
  }
}
}
first() {
  console.log("First region is clicked");
}
middle() {
  console.log("Second region is clicked");
}
last() {
  console.log("Third region is clicked");
}
}
