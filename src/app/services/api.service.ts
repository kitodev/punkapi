import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Beer, ErrorModel} from '../beer';
import {catchError, map, retry} from 'rxjs/operators';
import { MessageService } from './message.service';
import { environment } from 'src/environments/environment';
import { Auth } from '../auth';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly punkApiUrl = environment.punkApiUrl;
  private readonly authApi = environment.authApi;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getBeers(): Observable<Beer[]> {
    return this.http.get<Beer[]>(this.punkApiUrl);
  }

  getAuth() {
    return this.http.get<Auth[]>(this.authApi);
  }

  getBeerByName(name: string): Observable<HttpResponse<Beer[]>> {
    return this.http.get<Beer[]>(this.punkApiUrl + '?beer_name=' + name, {observe: 'response'});
  }

  getBeerById(id: number): Observable<Beer> {
    return this.http.get<Beer>(`${this.punkApiUrl}/${id}`)
    .pipe(
      map(x => x[0]),
      catchError(this.handleError<Beer>('getBeerById'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: ErrorModel): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`PunkbeerapiService: ${message}`);
  }
}
