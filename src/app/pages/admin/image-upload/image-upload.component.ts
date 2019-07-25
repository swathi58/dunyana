import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {
  @Input() display: boolean;
  @Output() displayChange = new EventEmitter();
  
  imageChangedEvent: any = '';
  croppedImage: any = '';
  finalImage: any = '';
  message = 'Hola Mundo!';
  uploader:any;
  constructor() { }

  ngOnInit() {
    
  }

  uploadfile()
  {
    this.uploader.click();
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  saveCropImage() {
    this.finalImage = this.croppedImage;
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
