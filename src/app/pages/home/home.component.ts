import { Component, ViewChild } from '@angular/core';
import { MatSort, MatSortable, MatTableDataSource, MatDialog } from '@angular/material';
import { QuestionService, Question } from '../../services/question.service';
import { AddQuestionDialogComponent, dataDialog } from '../../modals/add-question-dialog/add-question-dialog.component';

/*declare var MathJax:any;*/

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

    questions: MatTableDataSource<Question>;
    currentQuestion: Question;
    showQuestion: boolean;
    intervalle: Date[];
    dataDialog: dataDialog;
    filterValue: string;

    constructor(private questionService: QuestionService, public dialog: MatDialog) { 
        this.showQuestion = false;
        this.intervalle = [];
        this.filterValue = "today";
    }

    ngOnInit() {
        this.getQuestions();
    }

    getQuestions(): void {
        this.questionService.getQuestions()
        .subscribe((questions) => {

            this.questions = new MatTableDataSource(questions.records);

            this.questions.filterPredicate = (data: Question, filter: string) => {
                //this.parseMath();
                switch(filter) {
                    case "all": return true; break;
                    case "today": 
                        let today = new Date(Date.now());
                        let todayRepetition = 0;
                        let reponse = false;

                        this.intervalle = [];

                        ECART.forEach((element, index)=>{
                            let intervalDate = new Date(data.date);
                            intervalDate.setDate(intervalDate.getDate() + element);
                            this.intervalle.push(intervalDate);
                            if (today >= intervalDate) {
                                todayRepetition = index;
                            }
                        })

                        if(+data.repetition < todayRepetition) data.repetition = todayRepetition;

                        if(+data.repetition === this.intervalle.length-1) {
                            reponse = (today >= this.intervalle[+data.repetition]);
                        } else 
                        if(+data.repetition < this.intervalle.length-1) {
                            reponse = (this.intervalle[+data.repetition] <= today) && (today < this.intervalle[+data.repetition + 1])
                        }

                        return reponse;
                        break;
                    default: return true;
                }

                //return data.matiere === filter;
            }

            this.questions.filter = this.filterValue;
            this.sort.sort(({ id: 'matiere', start: 'asc'}) as MatSortable);
            this.questions.sort = this.sort;

        });
    }

    show(question: Question): void {
        this.currentQuestion = question;
        this.showQuestion = true;
        //this.parseMath();
       
    }

    applyFilter(filterValue: string) {
        this.filterValue = filterValue;
        this.questions.filter = filterValue;
    }

    questionChecked() {
        let index = this.questions.filteredData.indexOf(this.currentQuestion);
        this.showQuestion = false;
        this.questions.filteredData[index].repetition++;
        this.update(this.questions.filteredData[index]);
        this.questions.filter = this.filterValue;
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
                    this.getQuestions();
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

    update(question: Question): void {
        this.questionService
            .updateQuestion(question)
            .subscribe((res: any) => {
                console.log(res.message);
                this.getQuestions();
            });
    }

    parseMath() {
        /*if((question.question.search(/[$][$]/) >= 0) || (question.reponse.search(/[$][$]/) >= 0)) {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }*/
    }

}
