import { Component, OnInit } from '@angular/core';
import { QuestionService, Question } from '../../services/question.service';
import { AddClasseDialogComponent, dataDialog } from '../../modals/add-classe-dialog/add-classe-dialog.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    groups: string[];
    dataDialog: dataDialog;

    constructor(private questionService: QuestionService, public router: Router, public dialog: MatDialog) { 
    }

    ngOnInit() {
        this.questionService.getGroups()
        .subscribe((data) => {
            this.groups = data.records.classes;
        });
    }

    addGroup() {
        this.openDialog();
    }

    openDialog(): void {
        this.dataDialog = {
            classeValue: "",
        };
        const dialogRef = this.dialog.open(AddClasseDialogComponent, {
            width: '700px',
            data: this.dataDialog
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.dataDialog = result;
                this.router.navigate(['/questions',this.dataDialog.classeValue]);
            }
        });   
    }
}