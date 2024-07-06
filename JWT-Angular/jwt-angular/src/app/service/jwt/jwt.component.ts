import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Register } from 'src/app/modal/modal.component';
import { LoginResponse } from 'src/app/modal/modal.LoginResponse';

const BASE_URL = "http://localhost:8080/";
//const BASE_URLL = "http://localhost:8080/login";

@Injectable({
  providedIn: 'root'
})
export class JwtRegisterService {
  constructor(private http: HttpClient) { }

  register(lstData: any): Observable<any> {
    return this.http.post<any>(`${BASE_URL}signup/sighupuser`, lstData, { responseType: 'text' as 'json' })
      .pipe(
        catchError((error: any) => {
          console.error('Error occurred:', error);
          return throwError(error);
        })
      );
  }

  login(lstData: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${BASE_URL}login/logindetail`, lstData)
      .pipe(
        catchError((error: any) => {
          console.error('Error occurred:', error);
          return throwError(error);
        })
      );
  }

  hello(): Observable<any> {
    return this.http.get(`${BASE_URL}api/hello`, {
      headers: this.createAuthorizationHeader()
    }).pipe(
      catchError((error: any) => {
        console.error('Error occurred:', error);
        return throwError(error);
      })
    );
  }

  // Modified to return HttpHeaders
  private createAuthorizationHeader(): HttpHeaders {
    const jwtToken = localStorage.getItem('jwt');
    let headers = new HttpHeaders();

    if (jwtToken) {
      console.log('JWT Token Found in Local Storage:', jwtToken);
      headers = headers.set('Authorization', `Bearer ${jwtToken}`);
    } else {
      console.log('JWT Token Not Found In Local Storage!');
    }
    return headers;
  }

}
