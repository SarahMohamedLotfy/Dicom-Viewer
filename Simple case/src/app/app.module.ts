import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {LoadDicomComponent} from './load-dicom/load-dicom.component';
import { TagrbaComponent } from './tagrba/tagrba.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxCaptureModule } from 'ngx-capture';
import { CylinderComponent } from './cylinder/cylinder.component';
import { Ng5SliderModule } from 'ng5-slider';
import { Ng2ImgMaxModule } from 'ng2-img-max';

const appRoutes: Routes = [
  { path: 'load', component: LoadDicomComponent },
  { path: 'tagrba', component: TagrbaComponent },
  { path: 'cylinder', component: CylinderComponent },

];
@NgModule({
  declarations: [
    AppComponent ,
    LoadDicomComponent,
    TagrbaComponent,
    CylinderComponent ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ImageCropperModule,
    NgxCaptureModule,
    Ng5SliderModule
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
