import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface dataDialog {
	classeValue: string;
}

@Component({
  	selector: 'app-add-classe-dialog',
  	templateUrl: './add-classe-dialog.component.html',
  	styleUrls: ['./add-classe-dialog.component.scss']
})
export class AddClasseDialogComponent {

  	constructor(
  		public dialogRef: MatDialogRef<AddClasseDialogComponent>,
    	@Inject(MAT_DIALOG_DATA) public data: dataDialog
    ) {
    }

  	ngOnInit() {
  	}

  	onNoClick(): void {
    	this.dialogRef.close();
  	}

}
