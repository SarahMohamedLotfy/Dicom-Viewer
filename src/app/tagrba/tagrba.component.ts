import { Component , OnInit ,ViewChild} from '@angular/core';
/* globals dat*/
import * as AMI from 'src/ami.min.js';
import * as THREE from "src/three.min.js";
import * as dat from 'src/dat.gui.min.js';
import CamerasOrthographic from 'ami.js/src/cameras/cameras.orthographic';
import ControlsOrthographic from 'ami.js/src/controls/controls.trackballortho';
import CoreUtils from 'ami.js/src/core/core.utils';
import HelpersStack from 'ami.js/src/helpers/helpers.stack';
import LoadersVolume from 'ami.js/src/loaders/loaders.volume';
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
  this.loadDicom();
}

 init() {
  function animate() {
    // render
    controls.update();
    renderer.render(scene, camera);
    // request new frame
    requestAnimationFrame(function() {
      animate();
    });
  }
  // renderer
  threeD = document.getElementById('r3d');
  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(threeD.clientWidth, threeD.clientHeight);
  renderer.setClearColor(0x212121, 1);
  threeD.appendChild(renderer.domElement);
  // scene
  scene = new THREE.Scene();
  // camera
  camera = new CamerasOrthographic(
    threeD.clientWidth / -2,
    threeD.clientWidth / 2,
    threeD.clientHeight / 2,
    threeD.clientHeight / -2,
    0.1,
    10000
  );
  // controls
  controls = new ControlsOrthographic(camera, threeD);
  controls.staticMoving = true;
  controls.noRotate = true;
  camera.controls = controls;
  animate();
}

loadDicom()
{
   // notify puppeteer to take screenshot
   const puppetDiv = document.createElement('div');
   puppetDiv.setAttribute('id', 'puppeteer');
   document.body.appendChild(puppetDiv);
 
   // hookup load button
   document.getElementById('buttoninput').onclick = function() {
   document.getElementById('filesinput').click();
   };

   // init threeJS...
   this.init();


   loader = new LoadersVolume(threeD);
    seriesContainer = [];
   console.log("gggggggggg");
   /**
    * Parse incoming files
    */
  

   // hook up file input listener
    var self= this; 
   document.getElementById('filesinput').addEventListener('change', function(evt) {self.readMultipleFiles(evt,self)} , false);
}

 /**
      * Load sequence
      */
      loadSequence(index, files) {
      return (
        Promise.resolve()
          // load the file
          .then(function() {
            return new Promise(function(resolve, reject) {
              let myReader = new FileReader();
              // should handle errors too...
              myReader.addEventListener('load', function(e) {
                resolve(e.target.result);
              });
              myReader.readAsArrayBuffer(files[index]);
            });
          })
          .then(function(buffer) {
            return loader.parse({ url: files[index].name, buffer });
          })
          .then(function(series) {
            seriesContainer.push(series);
          })
          .catch(function(error) {
            window.console.log('oops... something went wrong...');
            window.console.log(error);
          })
      );
    }

     readMultipleFiles(evt,self) {
      // hide the upload button
      if (evt.target.files.length) {
        document.getElementById('home-container').style.display = 'none';
      }

      const loadSequenceContainer = [];
      const data = [];
      const dataGroups = [];
      // convert object into array
      for (let i = 0; i < evt.target.files.length; i++) {
        let dataUrl = CoreUtils.parseUrl(evt.target.files[i].name);
        if (
          dataUrl.extension.toUpperCase() === 'MHD' ||
          dataUrl.extension.toUpperCase() === 'RAW' ||
          dataUrl.extension.toUpperCase() === 'ZRAW'
        ) {
          dataGroups.push({
            file: evt.target.files[i],
            extension: dataUrl.extension.toUpperCase(),
          });
        } else {
          data.push(evt.target.files[i]);
        }
      }
    
      // load the rest of the files
      for (let i = 0; i < data.length; i++) {
        loadSequenceContainer.push(self.loadSequence(i, data));
      }
      // run the load sequence
      // load sequence for all files
      Promise.all(loadSequenceContainer)
        .then(function() {
          self.handleSeries(seriesContainer);
        })
        .catch(function(error) {
          window.console.log('oops... something went wrong...');
          window.console.log(error);
        });
    }
     /**
    * Visulaize incoming data
    */
    handleSeries(seriesContainer) {
    // cleanup the loader and its progress bar
    loader.free();
    loader = null;
    // prepare for slice visualization
    // first stack of first series
    let stack = seriesContainer[0].mergeSeries(seriesContainer)[0].stack[0];
    let stackHelper = new HelpersStack(stack);
    stackHelper.bbox.visible = false;
    stackHelper.borderColor = '#2196F3';
    stackHelper.border.visible = false;
    scene.add(stackHelper);
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
      halfDimensions: new THREE.Vector3(lpsDims.x + 40, lpsDims.y + 40, lpsDims.z + 40),
    };
    // init and zoom
    let canvas = {
      width: threeD.clientWidth,
      height: threeD.clientHeight,
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
   // document.body.appendChild(image);
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

