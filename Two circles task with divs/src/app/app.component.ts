import { Component , OnInit } from '@angular/core';
/* globals dat*/

function hello() {
  alert('Hello!!!');
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
   title = 'dicomViewer';

  // standard global variables
   controls;
   renderer;
   scene;
   camera;
   threeD;
   lut;
    ctrlDown = false;
    drag = {
  start: {
    x: null,
    y: null,
  },
};

// probe
 camUtils = {
  invertRows: false,
  invertColumns: false,
  rotate: false,
  orientation: 'default',
  convention: 'radio',
};
  constructor() { }


  ngOnInit(): void {

    //this.loadscene();
  }
loadscene()
{

}



}

