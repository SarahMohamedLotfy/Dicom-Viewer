import { Component, OnInit } from '@angular/core';
import * as Kinetic from 'src/kinetic.min.js';
import * as  $ from 'jquery';

@Component({
  selector: 'app-cylinder',
  templateUrl: './cylinder.component.html',
  styleUrls: ['./cylinder.component.css']
})

export class CylinderComponent implements OnInit {
  
  constructor() {}
  //Inputs
  backgroundColor='white';
  maxLength :number=300;
  rectColor ='#26C000';
  rectWidth_intitial =100;
  rectLength_intitial = 190;
  maxWidth =100;

  inputLength:number =100;
  rect;
  layer;
  rectWidth:number;
  types: any = [
    'Simple',
    'Complex'
  ];

  ngOnInit(): void {
      var self =this;
      var canvas = <HTMLCanvasElement> document.getElementById('simpleCanvas'),
      ctx = canvas.getContext('2d'),
      handlesSize = 8,
      currentHandle = false,
      drag = false;
      self.rectWidth=3;

      this.rect = {
            x: 130,
            y:0,
            w: this.rectWidth_intitial,
            h: this.rectLength_intitial
        };


    function init(self) {
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
        if (dist(mouse, point(self.rect.x, self.rect.y)) <= handlesSize) return 'topleft';
        if (dist(mouse, point(self.rect.x + self.rect.w, self.rect.y)) <= handlesSize) return 'topright';
        if (dist(mouse, point(self.rect.x, self.rect.y + self.rect.h)) <= handlesSize) return 'bottomleft';
        if (dist(mouse, point(self.rect.x + self.rect.w, self.rect.y + self.rect.h)) <= handlesSize) return 'bottomright';
        if (dist(mouse, point(self.rect.x + self.rect.w / 2, self.rect.y)) <= handlesSize) return 'top';
        if (dist(mouse, point(self.rect.x, self.rect.y + self.rect.h / 2)) <= handlesSize) return 'left';
        if (dist(mouse, point(self.rect.x + self.rect.w / 2, self.rect.y + self.rect.h)) <= handlesSize) return 'bottom';
        if (dist(mouse, point(self.rect.x + self.rect.w, self.rect.y + self.rect.h / 2)) <= handlesSize) return 'right';
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
                    self.rect.w += self.rect.x - mousePos.x;
                    self.rect.h += self.rect.y - mousePos.y;
                    self.rect.x = mousePos.x;
                    self.rect.y = mousePos.y;
                    self.rectWidth=self.rect.w;

                    break;
                case 'topright':
                    self.rect.w = mousePos.x - self.rect.x;
                    self.rect.h += self.rect.y - mousePos.y;
                    self.rect.y = mousePos.y;
                    self.rectWidth=self.rect.w;
                    break;
                case 'bottomleft':
                    self.rect.w += self.rect.x - mousePos.x;
                    self.rect.x = mousePos.x;
                    self.rect.h = mousePos.y - self.rect.y;
                    self.rectWidth=self.rect.w;
                    break;
                case 'bottomright':
                    self.rect.w = mousePos.x - self.rect.x;
                    self.rect.h = mousePos.y - self.rect.y;
                    self.rectWidth=self.rect.w;
                    break;
    
                case 'top':
                    self.rect.h += self.rect.y - mousePos.y;
                    self.rect.y = mousePos.y;
                    self.rectWidth=self.rect.w;
                    break;
    
                case 'left':
                    self.rect.w += self.rect.x - mousePos.x;
                    self.rect.x = mousePos.x;
                    self.rectWidth=self.rect.w;
                    break;
    
                case 'bottom':
                    self.rect.h = mousePos.y - self.rect.y;
                    self.rectWidth=self.rect.w;
                    break;
    
                case 'right':
                    self.rect.w = mousePos.x - self.rect.x;
                    self.rectWidth=self.rect.w;
                    break;
            }
        }
        if (drag || currentHandle != previousHandle) draw();
    }
    var self= this;
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = self.rectColor;
        ctx.fillRect(self.rect.x, self.rect.y, self.rect.w, self.rect.h);
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        if (self.inputLength<=self.maxLength)
        {
        ctx.fillText(self.inputLength.toString(),130, 90);
        }
        else{
            ctx.fillText(self.maxLength.toString(),130, 90);
        }
      
        if (currentHandle) {
            var posHandle = point(0, 0);
            var dir;
            switch (currentHandle) {
                case 'topleft':
                    dir={x:self.rect.w>0?'w':'e',y:self.rect.h>0?'n':'s'};
                    canvas.style.cursor= dir.y+dir.x+'-resize';
                case 'topright':
                    dir={x:self.rect.w>0?'e':'w',y:self.rect.h>0?'n':'s'};
                    canvas.style.cursor= dir.y+dir.x+'-resize';
                case 'bottomleft':
                    dir={x:self.rect.w>0?'w':'e',y:self.rect.h>0?'s':'n'};
                    canvas.style.cursor= dir.y+dir.x+'-resize';
                case 'bottomright':
                    dir={x:self.rect.w>0?'e':'w',y:self.rect.h>0?'s':'n'};
                    canvas.style.cursor= dir.y+dir.x+'-resize';
                    break;
                case 'top':
                    canvas.style.cursor= (self.rect.h>0?'n':'s')+'-resize';
                    break;
                case 'left':
                    canvas.style.cursor= (self.rect.w>0?'w':'e')+'-resize';
                    break;
                case 'bottom':
                    canvas.style.cursor= (self.rect.h>0?'s':'n')+'-resize';
                    break;
                case 'right':
                    canvas.style.cursor= (self.rect.w>0?'e':'w')+'-resize';
                    break;
            }
        }else 
        {canvas.style.cursor='';
        console.log(self.rect.w);
    }
}

init(self);
draw();


var width = self.rect.w;
var w =$('#rwidth');
w.attr({min:0,max:100}).val(width);
w.on('input change',self,function(){
    width=parseInt($(this).val().toString());
    self.rect.w= width;
    draw();
});

var width = self.rect.w;
var w =$('#rwidth2');
w.attr({min:0,max:100}).val(width);
w.on('input change',self,function(){
    width=parseInt($(this).val().toString());
    self.rect.w= width;
    draw();
});

var width = self.rect.w;
var w =$('#rwidth3');
w.attr({min:0,max:100}).val(width);
w.on('input change',self,function(){
    width=parseInt($(this).val().toString());
    self.rect.w= width;
    draw();
});

var width = self.rect.w;
var w =$('#rwidth4');
w.attr({min:0,max:100}).val(width);
w.on('input change',self,function(){
    width=parseInt($(this).val().toString());
    self.rect.w= width;
    draw();
});
this.rectWidth=self.rect.w;
}

makeRoom(x, y, w, h,backgroundColor) {
   
    var self=this;
    var g = new Kinetic.Group({
        x: x,
        y: y,
        draggable: true
    });
    this.layer.add(g);

    var c =  <HTMLCanvasElement>document.getElementById("complexCanvas");
    var ctx = c.getContext("2d");
    c.style.left = "466px";
    c.style.top = "70px";
    c.style.position = "absolute";
    ctx.fillStyle=this.rectColor;
    ctx.fillRect(0,0,c.width,c.height);
    ctx.font = "12px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("100".toString(),3, 20);
  
    ctx.fillStyle=backgroundColor;

    var room = new Kinetic.Shape({
        x: 0,
        y: 0,
        width: w,
        height: h,
        stroke: self.rectColor,
        fill: self.rectColor,
        drawFunc: function (context) {
            var x = this.x();
            var y = this.y();
            var w = this.width();
            var h = this.height();
            context.beginPath();

            context.moveTo(0,0);
            ctx.clearRect(0,0,c.width,c.height);

            ctx.fillStyle='#26C000';
            ctx.fillRect(0,0,c.width,c.height);

            ctx.strokeStyle = backgroundColor;
            ctx.stroke();
            ctx.fillStyle=backgroundColor;
            ctx.fillRect(this.anchorTR.x(),0,c.width-this.anchorTR.x(),this.anchorTR.y());
           
            ctx.strokeStyle = backgroundColor;
            ctx.stroke();
            var sWidth = c.width;
            var sHeight = c.height;
            var path=new Path2D();
            path.moveTo(sWidth,0);
            path.lineTo(this.anchorBR.x(),this.anchorBR.y());
            path.lineTo( this.anchorTR.x(),this.anchorTR.y());
            
            ctx.fill(path);

            ctx.fillStyle=backgroundColor;
            ctx.strokeStyle = backgroundColor;
            ctx.stroke();
            var path2=new Path2D();
            path2.moveTo(sWidth,0);
            path2.lineTo(this.anchorBR.x(),this.anchorBR.y());
            path2.lineTo( sWidth,this.anchorBR.y());

            ctx.strokeStyle = backgroundColor;
            ctx.stroke();
            ctx.fill(path2);

            ctx.fillRect(this.anchorBR.x(),this.anchorBR.y(),c.width-this.anchorBR.x(),c.height-this.anchorBR.y());

            if (this.anchorBR.x()<this.anchorTR.x())
            {
                ctx.fillStyle='#26C000';
                var path3=new Path2D();
                path3.moveTo(this.anchorBR.x(),this.anchorBR.y());
                path3.lineTo(this.anchorTR.x(),this.anchorTR.y());
                path3.lineTo( this.anchorTR.x(),0);
    
                ctx.strokeStyle = '#26C000';
                ctx.stroke();
                ctx.fill(path3);
            }
            ctx.fillStyle=backgroundColor;
            ctx.strokeStyle = backgroundColor;

            ctx.font = "12px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(Math.ceil(this.anchorTR.y()/2).toString(),3, 24);
          
            ctx.font = "12px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(Math.ceil(((this.anchorBR.y()-this.anchorTR.y())/2)).toString(),3, 106);
          

            ctx.font = "12px Arial";
            ctx.fillStyle = "black";
            ctx.fillText(Math.ceil(((c.height-this.anchorBR.y())/2)).toString(),3, c.height-6);
          
            var self=this;
            $(document).ready(function()
            {
                var w =$('#rwidth');
                w.attr({min:0,max:100}).val( self.anchorTR.x());
            
                var w =$('#rwidth2');
                w.attr({min:0,max:100}).val( self.anchorTR.x());
           
                var w =$('#rwidth3');
                w.attr({min:0,max:100}).val( self.anchorBR.x());
    
                var w =$('#rwidth4');
                w.attr({min:0,max:100}).val( self.anchorBR.x());
            })
            context.closePath();
            context.fillStrokeShape(this);
        }
    });
    g.add(room);
    var self=this;
    $(document).ready(function()
    {
        var w =$('#rwidth');
        w.attr({min:0,max:100}).val(room.anchorTR.x());
        w.on('input change',self,function(){
            room.anchorTR.remove();
            var width=parseInt($(this).val().toString());
            room.anchorTR = self.makeAnchor(width, room.anchorTR.y(), g,"blue");
            self.layer.draw();
        });
   
        var w =$('#rwidth3');
        w.attr({min:0,max:100}).val(room.anchorBR.x());
        w.on('input change',self,function(){
            room.anchorBR.remove();
            var width=parseInt($(this).val().toString());
            g.add(room);
            room.anchorBR = self.makeAnchor(width, room.anchorBR.y(), g,"red");
            self.layer.draw();
        });
    })
    room.anchorTR = this.makeAnchor(c.width, 0, g,"blue");
    room.anchorBR = this.makeAnchor(c.width, c.height, g,"red");

    this.layer.draw();

}

 makeAnchor(x, y, group,color) {
    var anchor = new Kinetic.Circle({
        x: x,
        y: y,
        radius: 6,
        fill: color,
        stroke: 'black',
        strokeWidth: 1,
        draggable: true
    });
    group.add(anchor);
    anchor.moveToTop();
    return (anchor);
}


radioChangeHandler (event: any) {
    
    var selectedCase = event.target.value;
    if (selectedCase =="Sample")
    {
        let div1 = document.getElementById('complexCanvas')
        let div2 = document.getElementById('simpleCanvas')
        let div3 = document.getElementById('roomAnchors');

        div2.style.display = "block"
        div1.style.display = "none"
        div3.style.display = "none";
    }
    else
    {
        let div1= document.getElementById('simpleCanvas')
        div1.style.display = "none"

        var stage = new Kinetic.Stage({
            container: 'roomAnchors',
            width: this.rectWidth_intitial+2,
            height: this.rectLength_intitial +10
        });
        this.layer = new Kinetic.Layer();
        stage.add(this.layer);
        var room1 = this.makeRoom(0, 0, 180, 180,this.backgroundColor);

        let div2 = document.getElementById('complexCanvas');
        let div3 = document.getElementById('roomAnchors');
        div2.style.display = "block";
        div3.style.display = "block";
    }
}

EnableCanvas(values:any){
    if (values.currentTarget.checked == true)
    {
        $(".simpleDiv").fadeTo(300, 1);
    }
    else
    {
        $(".simpleDiv").fadeTo(300, 0.2);
    }
}

widthVerify(event) {
    const inputValue = event.target.value;
    if (inputValue>this.maxWidth)
    {
        alert("width must be less than 100")
    }
}


lengthChange(event) {
        const inputValue = event.target.value;
        this.inputLength=parseInt( inputValue);
        if (inputValue> this.maxLength)
        {
            alert("Length must be less than "+this.maxLength )
        }
        var canvas = <HTMLCanvasElement> document.getElementById('simpleCanvas'),
        ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = this.rectColor;
        ctx.fillRect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
        ctx.font = "15px Arial";
        ctx.fillStyle = "black";
        if (this.inputLength>this.maxLength)
        {
        ctx.fillText(this.maxLength.toString(),130, 90);
        }
        else{
            ctx.fillText(this.inputLength.toString(),130, 90);
        }


}
}