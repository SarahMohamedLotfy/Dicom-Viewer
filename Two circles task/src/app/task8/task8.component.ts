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
    ctx.rect(0, 0, 180, 60);
    ctx.stroke();
    ctx.fillStyle = "blue";
    ctx.font = "16px Arial";
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
    

   

    pointerEl.style.left = cen[0]-26 + "px"
    pointerEl.style.top = cen[1]-21 + "px";
    
    pointerE2.style.left = cen[0]+26 + "px";
    pointerE2.style.top = cen[1]+21 + "px";
    
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


          console.log(radiusCanvas);
          console.log("distance");
          var a = cen[0] - x;
          var b = cen[1]- y;
          var c = Math.sqrt( a*a + b*b );
          console.log(c);

          var a = cen[0] - result.x;
          var b = cen[1]- result.y;
          var c = Math.sqrt( a*a + b*b );
          console.log("222222");
          console.log(c);
    
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

      var x;
      var y;
    
      if (result.x <cen[0])
      {if (result.y>cen[1]){
        x= result2.x;
        y= result2.y;
        }}
      
        
          if (result.x <cen[0])
          {
           if (result.y<cen[1]) {
           x= result2.x;
           y= result2.y;
          }}

            if (result.x >cen[0])
            {if (result.y<cen[1]){
             x= result2.x;
             y= result2.y;
     
            }
          }


          if (result.x >cen[0])
          {
            if (result.y>cen[1]){
   x= result2.x;
   y= result2.y;
            }}
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
    console.log(radians);

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
ImageClick() {
  console.log("sunn");
}
ImageClick2() {
  console.log("mercury");
}
ImageClick3() {
  console.log("venus");
}

  
first()
{
  let test = document.getElementById("picker-circle2");
  var self = this;
  test.addEventListener("mouseenter", function( event ) { 
     // self.circ2();
    (<HTMLTextAreaElement>event.target).style.background = "yellow";
  }, false);
  test.addEventListener("mouseout", function( event ) {  
   // self.circw(); 
    (<HTMLTextAreaElement>event.target).style.background = "red";
  }, false);
  
 /* let test2 = document.getElementById("picker-circle");
  var self = this;
  test2.addEventListener("mouseenter", function( event ) { 
      self.circ1();
    (<HTMLTextAreaElement>event.target).style.background = "yellow";
  }, false);

  test2.addEventListener("mouseout", function( event ) {  
   self.circw();
    (<HTMLTextAreaElement>event.target).style.background = "white";
  }, false);*/


}
  circ1()
  {
    var circle = document.getElementById('circle'),
				picker = document.getElementById('picker'),
				pickerCircle = picker.firstElementChild,
        picker2 = document.getElementById('picker2'),
				pickerCircle2 = picker2.firstElementChild,

				rect = circle.getBoundingClientRect(),
				
				center = {
					x: rect.left + rect.width / 2,
					y: rect.top + rect.height / 2
				},
				
                transform = (function(){
                    var prefs = ['t', 'WebkitT', 'MozT', 'msT', 'OT'],
                        style = document.documentElement.style,
                        p
                    for(var i = 0, len = prefs.length; i < len; i++){
                        if( (p = prefs[i] + 'ransform') in  style ) return p
                    }
                    
                    alert('your browser doesnt support css transforms!')
                })(),
                
				rotate = function(x, y){
					var deltaX = x - center.x,
					deltaY = y - center.y,
					angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI
					return angle
				},
				
				// DRAGSTART
				mousedown = function(event){
					event.preventDefault()
					document.body.style.cursor = 'move'
					mousemove(event)
					document.addEventListener('mousemove', mousemove)
					document.addEventListener('mouseup', mouseup)
				},
			
				// DRAG
				mousemove = function(event){
					picker.style[transform] = 'rotate(' + rotate(event.x, event.y) + 'deg)'
        	picker2.style[transform] = 'rotate(' + rotate(event.x, event.y) + '-deg)'
				},
			
				// DRAGEND
				mouseup = function(){
					document.body.style.cursor = null;
					document.removeEventListener('mouseup', mouseup)
					document.removeEventListener('mousemove', mousemove)
				}
			
			// DRAG START
			pickerCircle.addEventListener('mousedown', mousedown)
			pickerCircle2.addEventListener('mousedown', mousedown)

			// ENABLE STARTING THE DRAG IN THE BLACK CIRCLE
			circle.addEventListener('mousedown', function(event){
				if(event.target == this) mousedown(event)
		})
  }

  circw()
  {
    var circle = document.getElementById('circle'),
				picker = document.getElementById('picker'),
				pickerCircle = picker.firstElementChild,
        picker2 = document.getElementById('picker2'),
				pickerCircle2 = picker2.firstElementChild,

				rect = circle.getBoundingClientRect(),
				
				center = {
					x: rect.left + rect.width / 2,
					y: rect.top + rect.height / 2
				},
				
                transform = (function(){
                    var prefs = ['t', 'WebkitT', 'MozT', 'msT', 'OT'],
                        style = document.documentElement.style,
                        p
                    for(var i = 0, len = prefs.length; i < len; i++){
                        if( (p = prefs[i] + 'ransform') in  style ) return p
                    }
                    
                    alert('your browser doesnt support css transforms!')
                })(),
                
				rotate = function(x, y){
					var deltaX = x - center.x,
					deltaY = y - center.y,
					angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI
					return angle
				},
				
				// DRAGSTART
				mousedown = function(event){
					event.preventDefault()
					document.body.style.cursor = 'move'
					mousemove(event)
					document.addEventListener('mousemove', mousemove)
					document.addEventListener('mouseup', mouseup)
				},
			
				// DRAG
				mousemove = function(event){
					picker.style[transform] = 'rotate(' + rotate(event.x, event.y) + 'deg)'
        	picker2.style[transform] = 'rotate(' + rotate(event.x, event.y) + '-deg)'
				},
			
				// DRAGEND
				mouseup = function(){
					document.body.style.cursor = null;
					document.removeEventListener('mouseup', mouseup)
					document.removeEventListener('mousemove', mousemove)
				}
			
			// DRAG START
			pickerCircle.addEventListener('mousedown', mousedown)
			pickerCircle2.addEventListener('mousedown', mousedown)

			// ENABLE STARTING THE DRAG IN THE BLACK CIRCLE
			circle.addEventListener('mousedown', function(event){
				if(event.target == this) mousedown(event)
		})
  }


  

}
