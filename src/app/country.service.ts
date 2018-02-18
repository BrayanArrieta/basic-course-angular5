import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Country} from './country';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/catch';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class CountryService {
  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>('http://localhost:8000/api/countries').pipe(
      // tap( // Log the result or error
      //   data => console.log(data),
      //   error => console.error(error)
      // ),
      // catchError(this.handleError('getCountries', []))
    ).catch( this.handleError('getCountries', []));
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
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);;
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
