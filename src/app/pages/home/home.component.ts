import { Component, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { QuestionService, Question } from '../../services/question.service';
import { AddQuestionDialogComponent, dataDialog } from '../../modals/add-question-dialog/add-question-dialog.component';

const ECART:number[] = [2,6,13,30,90];

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

    displayedColumns: string[] = ['question', 'matiere', 'date', 'button'];

    columnsToDisplay = ['Question', 'Matière', 'Date de création', '' ];

    @ViewChild(MatSort, { static: false }) sort: MatSort;

    allQuestions: MatTableDataSource<Question>;
    questions: MatTableDataSource<Question>;
    currentQuestion: Question;
    showQuestion: boolean;
    intervalle: Date[];
    dataDialog: dataDialog;

    constructor(private questionService: QuestionService, public dialog: MatDialog) { 
        this.showQuestion = false;
        this.intervalle = [];
    }

    ngOnInit() {
        this.getQuestions();
        //this.dataSource.sort = this.sort;
    }

    getQuestions(): void {
        this.questionService.getQuestions()
        .subscribe((questions) => {

            this.allQuestions = new MatTableDataSource(questions.records);
            this.questions = new MatTableDataSource(questions.records);
            this.questions.filterPredicate = (data: Question, filter: string) => {

                let today = new Date(Date.now());
                let todayRepetition = 0;
                let reponse = false;

                this.intervalle = [];

                ECART.forEach((element, index)=>{
                    let intervalDate = new Date();
                    let date = new Date(data.date) ;
                    intervalDate.setDate(date.getDate() + element);
                    this.intervalle.push(intervalDate);
                    if (today >= intervalDate) {
                        todayRepetition = index;
                    }
                })

                if(data.repetition < todayRepetition) data.repetition = todayRepetition;

                if(data.repetition === this.intervalle.length-1) {
                    reponse = (today >= this.intervalle[data.repetition]);
                } else 
                if(data.repetition < this.intervalle.length-1) {
                    reponse = (this.intervalle[data.repetition] <= today) && (today < this.intervalle[+data.repetition + 1])
                }

                return reponse;

                //return data.matiere === filter;
            }

            this.questions.filter = "Histoire";
        });
    }

    show(question: Question): void {
        this.currentQuestion = question;
        this.showQuestion = true;
    }


    /* configure filter */


    /*applyFilter(filterValue: string) {
        this.questions.filter = filterValue;
    }*/

    questionChecked() {
        this.showQuestion = false;
        this.questions.filteredData[this.questions.filteredData.indexOf(this.currentQuestion)].repetition++;
        this.questions.filter = "Histoire";
    }

    addQuestion() {
        this.openDialog();
    }

    openDialog(): void {

        this.dataDialog = {
            matiere: "",
            question: "",
            reponse: ""
        };

        const dialogRef = this.dialog.open(AddQuestionDialogComponent, {
            width: '700px',
            data: this.dataDialog
        });

        dialogRef.afterClosed().subscribe(result => {
            this.dataDialog = result;
            if(this.dataDialog && this.dataDialog.matiere && this.dataDialog.question && this.dataDialog.reponse) {
                let today = new Date(Date.now());
                let newQuestion: Question = {
                    matiere: this.dataDialog.matiere,
                    question: this.dataDialog.question,
                    reponse: this.dataDialog.reponse,
                    date: today.getFullYear()+"-"+("0"+(today.getMonth()+1)).slice(-2)+"-"+today.getDate(),
                    repetition: 0
                };
                this.questionService
                .addQuestion(newQuestion)
                .subscribe((question) => {
                    console.dir(question);
                });
            }
        });
        
    }

    delete(id: number): void {
        this.questionService
            .deleteQuestion(id)
            .subscribe((res: any) => {
                console.log(res.message);
                this.getQuestions();
            });
    }

}
