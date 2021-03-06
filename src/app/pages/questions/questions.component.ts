import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { QuestionService, Question } from '../../services/question.service';
import { AddQuestionDialogComponent, dataDialog } from '../../modals/add-question-dialog/add-question-dialog.component';

const ECART:number[] = [2,6,13,30,90];

@Component({
    selector: 'app-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent {

    displayedColumns: string[] = ['question', 'matiere', 'date', 'button'];

    columnsToDisplay = ['Question', 'Matière', 'Date de création', '' ];

    @ViewChild(MatSort, { static: false }) sort: MatSort;

    questions: MatTableDataSource<Question>;
    showQuestion: number;
    showReponse: boolean;
    intervalle: Date[];
    dataDialog: dataDialog;
    filterValue: string;
    classeValue: string;

    constructor(private questionService: QuestionService, private route: ActivatedRoute, public dialog: MatDialog) { 
        this.showQuestion = -1;
        this.showReponse = false;
        this.intervalle = [];
        this.filterValue = "today";
    }

    ngOnInit() {
    	this.classeValue = this.route.snapshot.params.classe;
        this.getQuestions(()=>{
            this.applySort('matiere');
        });        
    }

    getQuestions(callback?: Function): void {
        this.questionService.getQuestions()
        .subscribe((questions) => {

            this.questions = new MatTableDataSource(questions.records);

            let filterClasse = (classe)=>{
            	return this.classeValue === classe;
            };

            this.questions.filterPredicate = (data: Question, filter: string) => {
                switch(filter) {
                    case "all": return filterClasse(data.classe); break;
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

                        return reponse && filterClasse(data.classe);
                        break;
                    default: return true;
                }

                //return data.matiere === filter;
            }

            this.applyFilter();
            if (callback) callback();
        });
    }

    applyFilter(filterValue?: string) {
        if(filterValue) this.filterValue = filterValue;
        this.questions.filter = this.filterValue;
    }

    applySort(id: string, start?: 'asc' | 'desc') {
        this.sort.sort({ 'id': id, 'start': start || 'asc', 'disableClear': true});
        this.questions.sort = this.sort;
    }

    questionChecked(question: Question) {
        question.repetition++;
        this.update(question);
    }

    closeQuestion() {
        this.showQuestion = -1; 
        this.showReponse = false;
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
                    repetition: 0,
                    classe: this.classeValue
                };
                this.questionService
                .addQuestion(newQuestion)
                .subscribe((question) => {
                    this.getQuestions(()=>{
                        this.applySort('matiere');
                        this.applySort('matiere');
                    });
                });
            }
        });
    }

    delete(id: number): void {
        this.questionService
            .deleteQuestion(id)
            .subscribe((res: any) => {
                console.log(res.message);
                this.getQuestions(()=>{
                    this.applySort('matiere');
                    this.applySort('matiere');
                });
            });
    }

    update(question: Question): void {
        this.questionService
            .updateQuestion(question)
            .subscribe((res: any) => {
                console.log(res.message);
                this.getQuestions(()=>{
                    this.applySort('matiere');
                    this.applySort('matiere');
                });
            });
    }

}
