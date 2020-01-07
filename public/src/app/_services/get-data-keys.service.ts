import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FileKeyService {
	constructor(private http: HttpClient) {
	}

	getFileKeys() {
		return this.http.get(`${environment.apiUrl}keys`)
			.pipe(map(fileKeys => {
				return fileKeys;
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
			if (error.status === 500) {
				return throwError('500');
			}
		}
		// return an observable with a user-facing error message
		return throwError('An issue occurred while calling query API!');
	}
}