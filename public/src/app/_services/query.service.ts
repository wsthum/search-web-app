import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { catchError, map} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import {query} from '../_models/query';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  constructor(private http: HttpClient) { 
  }

  queryData(data: query) {
    return this.http.post(`${environment.apiUrl}query/type/${data.type}`, data)
       .pipe(map(queryData => {
           return queryData;
        }), catchError(this.handleError)
       );
   }

   private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      if ( error.status === 500 ) {
          return throwError('500');
      }
    }
    // return an observable with a user-facing error message
    return throwError('An issue occurred while calling query API!');
  }
}
