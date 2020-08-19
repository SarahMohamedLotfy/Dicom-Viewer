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
  rectLength_intitial = 200;
  maxWidth =100;

  inputLength:number =100;
  rect;
  ratio:number=1;
  ratioMax:number=1;
  inputLengthComplex;
  room;
  layer;
  rectWidth:number;
  types: any = [
    'Simple',
    'Complex'
  ];
  isDisabled = false;
  
  ngOnInit(): void {

    let div1 = document.getElementById('sliderComplex')
    div1.style.display = "none";
    let div3 = document.getElementById('lengthComplex')
    div3.style.display = "none";
    let div2 = document.getElementById('sliderSimple')
    div2.style.display = "block";
    let div4 = document.getElementById('lengthSimple')
    div4.style.display = "block";

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

if(this.disabledd)
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
    var self=this;

    this.room = new Kinetic.Shape({
        self:this,
        x: 0,
        y: 0,
        width: w,
        height: h,
        stroke: self.rectColor,
        fill: self.rectColor,
        drawFunc: function (context) {
            ctx.clearRect(0,0,c.width,c.height);

            ctx.fillStyle=self.rectColor;
            ctx.fillRect(0,0,c.width,c.height);

           
            ctx.fillStyle=self.backgroundColor;
            var path=new Path2D();
            path.moveTo(this.anchorTR.x(),0);
            path.lineTo(this.anchorTR.x(),this.anchorTR.y());
            path.lineTo(this.anchorBR.x(),this.anchorBR.y());
            path.lineTo(this.anchorBR.x(),self.rectLength_intitial);
            path.lineTo(self.rectWidth_intitial,self.rectLength_intitial);
            path.lineTo( self.rectWidth_intitial,0);
    
            ctx.strokeStyle = self.backgroundColor;
            ctx.stroke();
            ctx.fill(path);

        
            if (self.inputLengthComplex>self.maxLength)
            {
                ctx.fillStyle ='#26C000';
                ctx.font = "12px Arial";
                ctx.fillStyle = "black";
                ctx.fillText(Math.ceil((this.anchorTR.y()/2)*self.ratioMax).toString(),3, 24);
                     
                ctx.font = "12px Arial";
                ctx.fillStyle = "black";
                ctx.fillText(Math.ceil((((this.anchorBR.y()-this.anchorTR.y())/2))*self.ratioMax).toString(),3, 106);
                     
           
                ctx.font = "12px Arial";
                ctx.fillStyle = "black";
                ctx.fillText(Math.ceil((((c.height-this.anchorBR.y())/2))*self.ratioMax).toString(),3, c.height-6);
            }
            else{
                ctx.fillStyle ='#26C000';
                ctx.font = "12px Arial";
                ctx.fillStyle = "black";
                ctx.fillText(Math.ceil((this.anchorTR.y()/2)*self.ratio).toString(),3, 24);
                     
                ctx.font = "12px Arial";
                ctx.fillStyle = "black";
                ctx.fillText(Math.ceil((((this.anchorBR.y()-this.anchorTR.y())/2))*self.ratio).toString(),3, 106);
                     
                ctx.font = "12px Arial";
                ctx.fillStyle = "black";
                ctx.fillText(Math.ceil((((c.height-this.anchorBR.y())/2))*self.ratio).toString(),3, c.height-6)
            }
            var selff =this;
            $(document).ready(function()
            {
                var w =$('#rwidthCom');
                w.attr({min:0,max:100}).val( selff.anchorTR.x());
            
                var w =$('#rwidth2Com');
                w.attr({min:0,max:100}).val( selff.anchorTR.x());
           
                var w =$('#rwidth3Com');
                w.attr({min:0,max:100}).val( selff.anchorBR.x());
    
                var w =$('#rwidth4Com');
                w.attr({min:0,max:100}).val( selff.anchorBR.x());
            })
            context.closePath();
            context.fillStrokeShape(this);
        }
    });
    g.add(this.room);
    var self=this;
    $(document).ready(function()
    {
        var w =$('#rwidthCom');
        w.attr({min:0,max:100}).val(self.room.anchorTR.x());
        w.on('input change',self,function(){
            self.room.anchorTR.remove();
            var width=parseInt($(this).val().toString());
            self.room.anchorTR = self.makeAnchor(width, self.room.anchorTR.y(), g,"blue");
            self.layer.draw();
        });
        var w =$('#rwidth2Com');
        w.attr({min:0,max:100}).val(self.room.anchorTR.x());
        w.on('input change',self,function(){
            self.room.anchorTR.remove();
            var width=parseInt($(this).val().toString());
            self.room.anchorTR = self.makeAnchor(width, self.room.anchorTR.y(), g,"blue");
            self.layer.draw();
        });
   
        var w =$('#rwidth3Com');
        w.attr({min:0,max:100}).val(self.room.anchorBR.x());
        w.on('input change',self,function(){
            self.room.anchorBR.remove();
            var width=parseInt($(this).val().toString());
            g.add(self.room);
            self.room.anchorBR = self.makeAnchor(width, self.room.anchorBR.y(), g,"red");
            self.layer.draw();
        });
        var w =$('#rwidth4Com');
        w.attr({min:0,max:100}).val(self.room.anchorBR.x());
        w.on('input change',self,function(){
            self.room.anchorBR.remove();
            var width=parseInt($(this).val().toString());
            g.add(self.room);
            self.room.anchorBR = self.makeAnchor(width, self.room.anchorBR.y(), g,"red");
            self.layer.draw();
        });
    })
    this.room.anchorTR = this.makeAnchor(c.width, 0, g,"blue");
    this.room.anchorBR = this.makeAnchor(c.width, c.height, g,"red");

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
    if (selectedCase =="Simple")
    {
        let divv1 = document.getElementById('sliderComplex')
        divv1.style.display = "none";
        let divv2 = document.getElementById('sliderSimple')
        divv2.style.display = "block";
        let div3 = document.getElementById('lengthComplex')
        div3.style.display = "none";
        let div4 = document.getElementById('lengthSimple')
        div4.style.display = "block";
    }
    else
    {
        let divv1 = document.getElementById('sliderComplex')
        divv1.style.display = "block";
        let divv2 = document.getElementById('sliderSimple')
        divv2.style.display = "none";
        let div3 = document.getElementById('lengthComplex')
        div3.style.display = "block";
        let div4 = document.getElementById('lengthSimple')
        div4.style.display = "none";

        var stage = new Kinetic.Stage({
            container: 'roomAnchors',
            width: this.rectWidth_intitial+2,
            height: this.rectLength_intitial 
        });
        this.layer = new Kinetic.Layer();
        stage.add(this.layer);
        var room1 = this.makeRoom(0, 0, 180, 180,this.backgroundColor);
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
widthVerifyComplex(event)
{
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

lengthChangeComplex(event) {
    const inputValue = event.target.value;
   this.inputLengthComplex=parseInt( inputValue);
    if (inputValue> this.maxLength)
    {
        alert("Length must be less than "+this.maxLength )
    }
    
    var c =  <HTMLCanvasElement>document.getElementById("complexCanvas");
    var ctx = c.getContext("2d");
          
     this.ratio = this.inputLengthComplex/this.inputLength;
     this.ratioMax= this.maxLength/this.inputLength;
    
     ctx.clearRect(0,0,c.width,c.height);
     ctx.fillStyle=this.rectColor;
     ctx.fillRect(0,0,c.width,c.height);

     ctx.fillStyle=this.backgroundColor;
     var path=new Path2D();
     path.moveTo(this.room.anchorTR.x(),0);
     path.lineTo(this.room.anchorTR.x(),this.room.anchorTR.y());
     path.lineTo(this.room.anchorBR.x(),this.room.anchorBR.y());
     path.lineTo(this.room.anchorBR.x(),this.rectLength_intitial);
     path.lineTo(this.rectWidth_intitial,this.rectLength_intitial);
     path.lineTo( this.rectWidth_intitial,0);

     ctx.strokeStyle = this.backgroundColor;
     ctx.stroke();
     ctx.fill(path);

     

    if (this.inputLengthComplex>this.maxLength)
    {
        ctx.fillStyle = this.rectColor;
        console.log(this.rectColor);
        ctx.font = "12px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(Math.ceil((this.room.anchorTR.y()/2)*this.ratioMax).toString(),3, 24);
             
        ctx.font = "12px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(Math.ceil((((this.room.anchorBR.y()-this.room.anchorTR.y())/2))*this.ratioMax).toString(),3, 106);
             
        ctx.font = "12px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(Math.ceil((((c.height-this.room.anchorBR.y())/2))*this.ratioMax).toString(),3, c.height-6);
    }
    else{
        ctx.font = "12px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(Math.ceil((this.room.anchorTR.y()/2)*this.ratio).toString(),3, 24);
       
        ctx.font = "12px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(Math.ceil((((this.room.anchorBR.y()-this.room.anchorTR.y())/2))*this.ratio).toString(),3, 106);
             
        ctx.font = "12px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(Math.ceil((((c.height-this.room.anchorBR.y())/2))*this.ratio).toString(),3, c.height-6);  
    }
}
flip() {
    this.isDisabled = !this.isDisabled;
  }
}
