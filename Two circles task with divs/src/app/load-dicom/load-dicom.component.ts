import { Component, OnInit, ViewChild, Input, ElementRef,AfterViewInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
/* globals dat*/
import * as AMI from 'src/ami.min.js';
import * as THREE from "src/three.min.js";
import * as dat from 'src/dat.gui.min.js';

let container;
let renderer;
let scene;
let camera;
let controls;
let screenshot;
let  image = new Image();

@Component({
  selector: 'app-load-dicom',
  templateUrl: './load-dicom.component.html' ,
  styleUrls: ['./load-dicom.component.css']
})
export class LoadDicomComponent implements OnInit {

  dicomBase64:string;

  constructor(){}

  ngOnInit(): void {
  this.loadDicom();
}
loadDicom()
{
// Setup renderer
 container = document.getElementById('container');
 renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(container.offsetWidth, container.offsetHeight);
renderer.setClearColor(0x353535, 1);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

 scene = new THREE.Scene();

 camera = new AMI.OrthographicCamera(
  container.clientWidth / -2,
  container.clientWidth / 2,
  container.clientHeight / 2,
  container.clientHeight / -2,
  0.1,
  10000
);

// Setup controls
 controls = new AMI.TrackballOrthoControl(camera, container);
controls.staticMoving = true;
controls.noRotate = true;
camera.controls = controls;

const file = 'https://cdn.rawgit.com/FNNDSC/data/master/nifti/adi_brain/adi_brain.nii.gz';
const loader = new AMI.VolumeLoader(container);
loader
  .load(file)
  .then(() => {
    const series = loader.data[0].mergeSeries(loader.data);
    const stack = series[0].stack[0];
    loader.free();


    
    const stackHelper = new AMI.StackHelper(stack);
    stackHelper.bbox.visible = false;
    stackHelper.border.color = '#2196F3';
    scene.add(stackHelper);

    gui(stackHelper);

    // center camera and interactor to center of bouding box
    // for nicer experience
    // set camera
    let worldbb = stack.worldBoundingBox();
    let lpsDims = new THREE.Vector3(
      (worldbb[1] - worldbb[0]) / 2,
      (worldbb[3] - worldbb[2]) / 2,
      (worldbb[5] - worldbb[4]) / 2
    );
    // box: {halfDimensions, center}
    let box = {
      center: stack.worldCenter().clone(),
      halfDimensions: new THREE.Vector3(lpsDims.x + 10, lpsDims.y + 50, lpsDims.z + 10),
    };
    // init and zoom
    let canvas = {
      width: container.clientWidth,
      height: container.clientHeight,
    };
    camera.directions = [stack.xCosine, stack.yCosine, stack.zCosine];
    camera.box = box;
    camera.canvas = canvas;
    camera.update();
    camera.fitBox(2);

     //Cropping
     controls.update();
     renderer.render(scene, camera);
     screenshot = renderer.domElement.toDataURL();
     image.src = screenshot;
      this.dicomBase64 = screenshot;
  })
  .catch(error => {
    window.console.log('oops... something went wrong...');
    window.console.log(error);
  });
  const animate = () => {
    controls.update();
    renderer.render(scene, camera);
   requestAnimationFrame(function() {
      animate();
    });

  };
  
  animate();

const gui = stackHelper => {
  const gui = new dat.GUI({
    autoPlace: false,
  });
 
};
}



base64String: any;
imageChangedEvent: any = '';
croppedImage: any = '';

fileChangeEvent(event: any): void {

  this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
  this.croppedImage = event.base64;
}
imageLoaded() {
  // show cropper
}
cropperReady() {
  // cropper ready
}
loadImageFailed() {
  // show message
}



}