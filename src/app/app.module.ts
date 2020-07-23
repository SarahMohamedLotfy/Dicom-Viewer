import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import {LoadDicomComponent} from './load-dicom/load-dicom.component';
import { TagrbaComponent } from './tagrba/tagrba.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxCaptureModule } from 'ngx-capture';

const appRoutes: Routes = [
  { path: 'load', component: LoadDicomComponent },
  { path: 'tagrba', component: TagrbaComponent },

];
@NgModule({
  declarations: [
    AppComponent ,
    LoadDicomComponent,
    TagrbaComponent ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ImageCropperModule,
    NgxCaptureModule
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
