import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

export interface dataDialog {
	matiere: string,
	question: string,
	reponse: string
}

@Component({
  	selector: 'app-add-question-dialog',
  	templateUrl: './add-question-dialog.component.html',
  	styleUrls: ['./add-question-dialog.component.scss']
})
export class AddQuestionDialogComponent {

    public files: NgxFileDropEntry[] = [];
    public src: any = "";

    constructor(
  		public dialogRef: MatDialogRef<AddQuestionDialogComponent>,
    	@Inject(MAT_DIALOG_DATA) public data: dataDialog
    ) {   
    }

  	ngOnInit() {
  	}

  	onNoClick(): void {
    	this.dialogRef.close();
  	}

    public dropped(files: NgxFileDropEntry[]) {
        this.files = files;
        for (const droppedFile of files) {
     
          // Is it a file?
          if (droppedFile.fileEntry.isFile) {
            const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
            fileEntry.file((file: File) => {

                    var reader = new FileReader();
    
                    reader.onloadend = (e) => {
                      this.src = reader.result;
                    }
                    
                    reader.readAsDataURL(file);

              // Here you can access the real file
              console.log(droppedFile.relativePath, file);
     
              /**
              // You could upload it like this:
              const formData = new FormData()
              formData.append('logo', file, relativePath)
     
              // Headers
              const headers = new HttpHeaders({
                'security-token': 'mytoken'
              })
     
              this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
              .subscribe(data => {
                // Sanitized logo returned from backend
              })
              **/
     
            });
          } else {
            // It was a directory (empty directories are added, otherwise only files)
            const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
            console.log(droppedFile.relativePath, fileEntry);
          }
        }
      }
     
      public fileOver(event){
        console.log(event);
      }
     
      public fileLeave(event){
        console.log(event);
      }

}