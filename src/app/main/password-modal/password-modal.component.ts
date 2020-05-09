import { Component, Input, Inject} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

export class PasswordModalData {
  name: string;
  password: string;
  destination: string;
  destinationId: string;
  callback?: () => void;
}

@Component({
    selector: 'app-password-modal',
    templateUrl: './password-modal.component.html',
    styleUrls: ['./password-modal.component.scss']
  })
export class PasswordModalComponent {

  passwordModalData: PasswordModalData;
  error: string;
  disabled: boolean = false;

  constructor(public dialogRef: MatDialogRef<PasswordModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data,
    private router: Router) { 
    this.passwordModalData = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  verifyPassword(f: NgForm){
    if (!this.disabled) {
      this.error = null;
      if (f.valid) {
        this.disabled = true;
        if (f.value.inputPassword === this.passwordModalData.password) {
          this.dialogRef.close();
          if (this.passwordModalData.callback)  {
            this.passwordModalData.callback();
          }
          this.router.navigate([this.passwordModalData.destination, this.passwordModalData.destinationId]);
        } else {
          this.disabled = false;
          this.error = "Incorrect password";
        }
      }
    }
  }
  

}
