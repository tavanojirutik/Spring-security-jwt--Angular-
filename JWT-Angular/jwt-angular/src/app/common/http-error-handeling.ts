// error-handling.service.ts

import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlingService {

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side error: network error, Angular error, etc.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      switch (error.status) {
        case 401:
          errorMessage = 'Unauthorized: Please login.';
          break;
        case 403:
          errorMessage = 'Forbidden: You do not have permission to access this resource.';
          break;
        case 404:
          errorMessage = 'Not Found: The requested resource was not found.';
          break;
        case 500:
          errorMessage = 'Internal Server Error: Something went wrong on the server.';
          break;
        case 409:
          errorMessage = error.error; // Custom handling for specific status code
          break;
        default:
          errorMessage = `${error.error.message}`; // General error message from backend
          break;
      }
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
