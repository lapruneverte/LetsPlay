import { Component, Input, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-zoom',
  templateUrl: './zoom.component.html',
  styleUrls: ['./zoom.component.scss']
})
export class ZoomComponent {
  zoomImageSrc: string;

  constructor(public dialogRef: MatDialogRef<ZoomComponent>, 
    @Inject(MAT_DIALOG_DATA) public data,
    private router: Router) { 
    this.zoomImageSrc = data.zoomImageSrc;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
