import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Country} from './country';
import 'rxjs/add/operator/map';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, tap, retry} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class CountryService {
  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>('http://localhost:8000/api/countries').pipe(
      retry(1), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
    // .catch( this.handleError('getCountries', []));
    // tap( // Log the result or error
    //   data => console.log(data),
    //   error => console.error(error)
    // ),
  }
  addCountry (country: Country): Observable<Country> {
    return this.httpClient.post<Country>('http://localhost:8000/api/countries', country, httpOptions).pipe();
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //
  //     // TODO: send the error to remote logging infrastructure
  //     // console.error(error); // log to console instead
  //     // TODO: better job of transforming error for user consumption
  //     // this.log(`${operation} failed: ${error.message}`);;
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

  /**
   * Handle for HttpClient
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  }
}
