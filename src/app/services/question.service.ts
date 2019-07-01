import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError, of } from 'rxjs';

const questionURL:string = "http://profdupuy.free.fr/reactivation/api/question/";

// const QUESTIONS: Question[] = [
// 	{
// 		date: new Date("2019-06-05"),
// 		matiere: "Histoire",
// 		question: "Date de Marignan ?",
// 		reponse: "1515",
// 		repetition: 0,
// 		/*repetitionsTotales: 5,
// 		periodeApprentissage: 90*/
// 	},
// 	{
// 		date: new Date("2019-06-01"),
// 		matiere: "Histoire",
// 		question: "Couronnement de Charlemagne ?",
// 		reponse: "800",
// 		repetition: 1,
// 		/*repetitionsTotales: 5,
// 		periodeApprentissage: 90*/

// 	},
// 	{
// 		date: new Date("2019-06-04"),
// 		matiere: "SVT",
// 		question: "Citez deux moyens de contraception.",
// 		reponse: "La sodomie et la pipe",
// 		repetition: 0,
// 		/*repetitionsTotales: 5,
// 		periodeApprentissage: 90*/
// 	},
// 	{
// 		date: new Date(Date.now()),
// 		matiere: "Maths",
// 		question: `Quelle est la dérivée de cosinus ? 
// 			$$
// 			\\sqrt{4}
// 			$$
// 		`,
// 		reponse: "-sin",
// 		repetition: 0,
// 		/*repetitionsTotales: 5,
// 		periodeApprentissage: 90*/

// 	}
// ]

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type':  'application/json',
		//'Accept': 'application/json',
		//'Access-Control-Allow-Origin': '*'
		//'Authorization': 'my-auth-token'
		//'Access-Control-Request-Headers': 'origin, x-requested-with'
	})
};

export interface Question {
	date: string;
	question: string;
	reponse: string;
	matiere: string;
	repetition: number;
	/*repetitionsTotales: number;
	periodeApprentissage: number;*/
}

@Injectable({
	providedIn: 'root'
})
export class QuestionService {

	tempsLatence: number; //pourcentage d'une periode de repetition

	constructor(private http: HttpClient) {
		this.tempsLatence = 0.05;
	}

	// POST
	addQuestion (question: Question): Observable<any> {
		let body = JSON.stringify(question);
		return this.http.post<any>(questionURL + "create.php", body, httpOptions)
		.pipe(
			//
			catchError(this.handleError)
		);
	}

	// DELETE
	deleteQuestion (id: number): Observable<{}> {
		return this.http.delete(questionURL + "delete.php" + "?id=" + id, httpOptions)
		.pipe(
			catchError(this.handleError)
		);
	}

	// PUT
	/*updateHero (hero: Hero): Observable<Hero> {
		return this.http.put<Hero>(this.heroesUrl, hero, httpOptions)
		.pipe(
			catchError(this.handleError)
			);
	}*/

	// GET
	/*getSchedule() {
		return this.http.get<scheduleInterface>(this.scheduleUrl)
		.pipe(
			retry(3), // retry a failed request up to 3 times
			catchError(this.handleError) // then handle the error
			);
	}*/

	/*getConfig() {
		return this.http.get<Config>(environment.configAPIUrl)
		.pipe(
			retry(3), // retry a failed request up to 3 times
			catchError(this.handleError) // then handle the error
			);
	}*/

	getQuestions(): Observable<any> {
	    //return of(QUESTIONS);
	    return this.http.get<any>(questionURL + "read.php", httpOptions)
		.pipe(
			retry(3), // retry a failed request up to 3 times
			catchError(this.handleError) // then handle the error
		);
	}

	//courbe de l'oublie
	// R = e^(-t/F)
	// R -> Retention memorielle
	// F -> Force de la mémoire

	private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occurred. Handle it accordingly.
			console.error('An error occurred:', error.error.message);
		} else {
			// The backend returned an unsuccessful response code.
			// The response body may contain clues as to what went wrong,
			console.error(
				`Backend returned code ${error.status}, ` +
				`body was: ${error.error.error.message}`
				);
		}
		// return an observable with a user-facing error message
		return throwError('Une erreur est survenue. Veuillez réessayer plus tard.');
	};

}
