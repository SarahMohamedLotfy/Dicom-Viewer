import { Component , OnInit ,ViewChild} from '@angular/core';
/* globals dat*/
import * as AMI from 'src/ami.min.js';
import * as THREE from "src/three.min.js";
import * as dat from 'src/dat.gui.min.js';
import { ImageCroppedEvent } from 'ngx-image-cropper';

// standard global variables
let controls;
let renderer;
let scene;
let camera;
let threeD;
let  image = new Image();
let screenshot;
let loader;
let seriesContainer;
@Component({
  selector: 'app-tagrba',
  templateUrl: './tagrba.component.html',
  styleUrls: ['./tagrba.component.css']
})
export class TagrbaComponent implements OnInit  {

  dicomBase64:string;

  constructor(){}

  ngOnInit(): void {
  //this.loadDicom();
}

 
}

